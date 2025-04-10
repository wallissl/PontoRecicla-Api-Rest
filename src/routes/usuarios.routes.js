const {Router} = require('express'); // Importa o Router do express
const UsuarioController = require('../controllers/UsuarioController'); // Importa o controller de usuários. O controller é responsável por lidar com as requisições e respostas da aplicação. O controller é usado para separar a lógica de negócio da aplicação das rotas.

const usuarioRoutes = new Router() // Cria uma nova instância do Router



// usuarioRoutes.get('/', ) // Rota para listar todos os usuários
// usuarioRoutes.get('/:id', ) // Rota para listar um usuário específico

usuarioRoutes.post('/', UsuarioController.criarConta) // Rota para criar um novo usuário
// usuarioRoutes.put('/:id', ) // Rota para atualizar um usuário específico

// usuarioRoutes.delete('/:id', ) // Rota para deletar um usuário específico


module.exports = usuarioRoutes // Exporta as rotas de usuários. As rotas são exportadas para serem usadas no arquivo de rotas principal, onde todas as rotas da aplicação são registradas.
