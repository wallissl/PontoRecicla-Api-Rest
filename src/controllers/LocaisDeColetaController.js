const LocaisDeColeta = require('../models/LocaisDeColeta');

const LocaisDeUsuarios = require('../models/LocaisDeUsuarios');


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
            
            response.status(204).json({ message: 'Local de coleta deletado com sucesso' });
            
        } catch (error) {
            console.error('Erro ao deletar local de coleta:', error);
            res.status(500).json({ error: 'Erro ao deletar local de coleta' });
            
        }
    }
}

module.exports = new LocaisDeColetaController();