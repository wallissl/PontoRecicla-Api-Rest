const {Router} = require('express');
const usuarioRoutes = require('./usuarios.routes') // Importa as rotas de usuários



const routes = new Router()

routes.use('/usuarios', usuarioRoutes) // Registra as rotas de usuários na rota /usuarios. Isso significa que todas as rotas de usuários serão acessíveis a partir da rota /usuarios. Por exemplo, a rota de criar um novo usuário será acessível a partir da rota /usuarios/.

module.exports = routes