const { getUsuarioLogado } = require('../controllers/authMocks'); // Só Teste

const LocaisDeColeta = require('../models/LocaisDeColeta');

const LocaisDeUsuarios = require('../models/LocaisDeUsuarios');

const Usuario = require('../models/Usuario');



class LocaisDeColetaController{

    async criarLocalDeColeta(req, res) {

        try {

            const dados = req.body;
            console.log(req.body);
            const usuarioLogadoId = getUsuarioLogado(); // Pega o id do usuário logado. O id do usuário logado é pego do mock de autenticação. O id do usuário logado é usado para criar o local de coleta.
           
            const LocalDeColeta = await LocaisDeColeta.create({
                ...dados,
            });

            await LocaisDeUsuarios.create({
                usuario_id: usuarioLogadoId,
                local_id: LocalDeColeta.id,
            });

            
           

             res.status(201).json({ nome: LocalDeColeta.nome_do_local});
        } catch (error) {
            console.error('Erro ao criar local de coleta:', error);
             res.status(500).json({ error: 'Erro ao criar local de coleta' });
        }

       
    }
}

module.exports = new LocaisDeColetaController();