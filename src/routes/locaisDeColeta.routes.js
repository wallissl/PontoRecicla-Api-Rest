
const { Router } = require('express');

const LocaisDeColetaController = require('../controllers/LocaisDeColetaController');
console.log(LocaisDeColetaController)


const locaisDeColetaRoutes = new Router()

locaisDeColetaRoutes.post('/', LocaisDeColetaController.criarLocalDeColeta); // Rota para criar um novo local de coleta. O método post é usado para criar um novo registro no banco de dados. O método recebe a rota e o controller que será responsável por criar o local de coleta.

module.exports = locaisDeColetaRoutes;