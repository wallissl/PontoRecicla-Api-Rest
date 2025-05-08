
const { Router } = require('express');

const LocaisDeColetaController = require('../controllers/LocaisDeColetaController');
console.log(LocaisDeColetaController)


const locaisDeColetaRoutes = new Router()

locaisDeColetaRoutes.post('/cadastrar', LocaisDeColetaController.criarLocalDeColeta); // Rota para criar um novo local de coleta. O método post é usado para criar um novo registro no banco de dados. O método recebe a rota e o controller que será responsável por criar o local de coleta.

locaisDeColetaRoutes.get('/listar', LocaisDeColetaController.listarLocaisDeColeta); // Rota para listar todos os locais de coleta. O método get é usado para listar todos os registros do banco de dados. O método recebe a rota e o controller que será responsável por listar os locais de coleta.

locaisDeColetaRoutes.get('/local/:local_id', LocaisDeColetaController.detalharLocalDeColeta); // Rota para listar os detalhes de um local de coleta. O método get é usado para listar os detalhes de um registro do banco de dados. O método recebe a rota e o controller que será responsável por listar os detalhes do local de coleta.

locaisDeColetaRoutes.delete('/local/:local_id', LocaisDeColetaController.deletarLocalDeColeta); // Rota para deletar um local de coleta. O método delete é usado para deletar um registro do banco de dados. O método recebe a rota e o controller que será responsável por deletar o local de coleta.

locaisDeColetaRoutes.put('/atualizar/:local_id', LocaisDeColetaController.atualizarLocalDeColeta); // Rota para atualizar um local de coleta. O método put é usado para atualizar um registro do banco de dados. O método recebe a rota e o controller que será responsável por atualizar o local de coleta.

locaisDeColetaRoutes.get('/local/:local_id/maps', LocaisDeColetaController.linkDoMaps); // Rota para detalhar um local de coleta. O método get é usado para listar os detalhes de um registro do banco de dados. O método recebe a rota e o controller que será responsável por listar os detalhes do local de coleta.

module.exports = locaisDeColetaRoutes;