const LocaisDeColeta = require('../models/LocaisDeColeta');

class LocaisDeColetaController{

    async criarLocalDeColeta(req, res) {

        try {

            const dados = req.body;
            console.log(req.body);
           
            const LocalDeColeta = await LocaisDeColeta.create({
                ...dados,
            });
           

             res.status(201).json({ nome: LocalDeColeta.nome_do_local});
        } catch (error) {
            console.error('Erro ao criar local de coleta:', error);
             res.status(500).json({ error: 'Erro ao criar local de coleta' });
        }
    }
}

module.exports = new LocaisDeColetaController();