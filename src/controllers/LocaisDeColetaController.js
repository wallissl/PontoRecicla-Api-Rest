const LocaisDeColeta = require('../models/LocaisDeColeta');

const LocaisDeUsuarios = require('../models/LocaisDeUsuarios');

const axios = require('axios'); // Importa o axios para fazer requisições HTTP


class LocaisDeColetaController{

    async criarLocalDeColeta(req, res) {

        try {

            const dados = req.body;
           
            const LocalDeColeta = await LocaisDeColeta.create({
                ...dados,
            });
            
            await LocaisDeUsuarios.create({
                usuario_id: req.usuarioId, // ID do usuário logado
                local_id: LocalDeColeta.id, // ID do local de coleta criado
            });

             res.status(201).json({ nome: LocalDeColeta.nome_do_local, id: LocalDeColeta.id });
        } catch (error) {
            console.error('Erro ao criar local de coleta:', error);
             res.status(500).json({ error: 'Erro ao criar local de coleta' });
        }
    }

    async listarLocaisDeColeta(req, res) {
        try {
            const locais = await LocaisDeUsuarios.findAll({
                
                where: {
                    usuario_id: req.usuarioId // ID do usuário logado
                },
                include: [
                    {
                        model: LocaisDeColeta,
                        as: 'local', // Nome do alias para o relacionamento
                        attributes: ['id', 'nome_do_local', 'descricao'],
                    },
                ],
                });

            const resposta = locais.map( item => 
                item.local);
            
            res.status(200).json(resposta);
        } catch (error) {
            console.error('Erro ao listar locais de coleta:', error);
            res.status(500).json({ error: 'Erro ao listar locais de coleta' });
        }
    }

    async detalharLocalDeColeta(req, res){
        
        try {
            const { local_id } = req.params; // ID do local de coleta a ser detalhado

            const relacao = await LocaisDeUsuarios.findOne({
                where: {
                    usuario_id: req.usuarioId, // ID do usuário logado
                    local_id: local_id, // ID do local de coleta
                },
                include: [
                    {
                        model: LocaisDeColeta,
                        as: 'local', // Nome do alias para o relacionamento
                        attributes: ['id', 'nome_do_local', 'descricao'],
                    },
                ],
            });

            if (!relacao) {
                return res.status(404).json({ error: 'Local de coleta não encontrado' });
            }

            res.status(200).json(relacao.local); // Retorna os detalhes do local de coleta

        }catch (error) {
            console.error('Erro ao detalhar local de coleta:', error);
            res.status(500).json({ error: 'Erro ao detalhar local de coleta' });
        }
    }

    async deletarLocalDeColeta(req, res){

        try {
            const {local_id} = req.params; // ID do local de coleta a ser deletado

            const relacao = await LocaisDeUsuarios.findOne({
                where:{
                    usuario_id: req.usuarioId, 
                    local_id: local_id,
                },
                include: [
                    {
                        model: LocaisDeColeta,
                        as: 'local',
                        attributes: ['id'],
                    },
                ],
            });

            if(!relacao) {
                return res.status(404).json({ error: 'Não existe um local de coleta com esse ID para ser deletado' });
            }

            await relacao.destroy(); // Deleta a relação entre o usuário e o local de coleta

            await LocaisDeColeta.destroy({ where: { id: local_id } }); // Deleta o local de coleta
            
            res.status(204).json({ message: 'Local de coleta deletado com sucesso' });
            
        } catch (error) {
            console.error('Erro ao deletar local de coleta:', error);
            res.status(500).json({ error: 'Erro ao deletar local de coleta' });
            
        }
    }

    async atualizarLocalDeColeta(req, res){

        try {
            const {local_id} = req.params; // ID do local de coleta a ser atualizado
            const dados = req.body; // Dados para atualização

            const relacao = await LocaisDeUsuarios.findOne({
                where:{
                    usuario_id: req.usuarioId, 
                    local_id: local_id,
                },
                include: [
                    {
                        model: LocaisDeColeta,
                        as: 'local',
                        attributes: ['id'],
                    },
                ],
            });

            if(!relacao) {
                return res.status(404).json({ error: 'Não existe um local de coleta com esse ID para ser atualizado' });
            }

            await LocaisDeColeta.update(dados, { where: { id: local_id } }); // Atualiza o local de coleta
            
            res.status(200).json({ message: 'Local de coleta atualizado com sucesso' });
            
        } catch (error) {
            console.error('Erro ao atualizar local de coleta:', error);
            res.status(500).json({ error: 'Erro ao atualizar local de coleta' });
            
        }
    }

    async linkDoMaps(req, res) {
        const { local_id } = req.params;

        try {
            // Verifica se o local pertence ao usuário logado
            const relacao = await LocaisDeUsuarios.findOne({
                where: {
                    usuario_id: req.usuarioId,
                    local_id: local_id
                },
                include: [
                    {
                        model: LocaisDeColeta,
                        as: 'local',
                        attributes: ['cep']
                    }
                ]
            });

            if (!relacao) {
                return res.status(404).json({ error: 'Local não encontrado ou não pertence ao usuário.' });
            }

            const cep = relacao.local.cep;

            // Consulta a API do Nominatim
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    format: 'json',
                    country: 'Brazil',
                    postalcode: cep,
                    limit: 1
                },
                headers: {
                    'User-Agent': 'seuemail@exemplo.com' // Use seu e-mail ou nome da aplicação
                }
            });

            if (!response.data || response.data.length === 0) {
                return res.status(404).json({ error: 'Localização não encontrada com o CEP informado.' });
            }

            const { lat, lon } = response.data[0];

            const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;

            return res.status(200).json({ link: googleMapsLink });

        } catch (error) {
            console.error('Erro ao gerar link do Google Maps:', error.message);
            return res.status(500).json({ error: 'Erro ao gerar link do Google Maps' });
        }
    } // Teste 01

}

module.exports = new LocaisDeColetaController();