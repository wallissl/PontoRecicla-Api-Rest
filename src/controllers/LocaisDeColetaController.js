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
}

module.exports = new LocaisDeColetaController();