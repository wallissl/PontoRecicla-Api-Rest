const {Router} = require('express'); // Importa o Router do express
const UsuarioController = require('../controllers/UsuarioController'); // Importa o controller de usuários. O controller é responsável por lidar com as requisições e respostas da aplicação. O controller é usado para separar a lógica de negócio da aplicação das rotas.

const  validaToken = require('../middlewares/validaToken'); 

const usuarioRoutes = new Router() // Cria uma nova instância do Router

// usuarioRoutes.get('/', ) // Rota para listar todos os usuários
// usuarioRoutes.get('/:id', ) // Rota para listar um usuário específico

usuarioRoutes.post('/cadastrar', UsuarioController.criarConta

    /*
        #swagger.tags = ['Usuários'],
        #swagger.description = 'Endpoint para criar um novo usuário',
        #swagger.parameters['Cadastro de usuario'] = {
            in: 'body',
            description: 'Dados do usuário a ser criado',
            required: true,
            schema: {
                "nome": "Kami Cat da Silva",
                "sexo": "Feminino",
                "cpf": "12385552905",
                "endereco": "R. Alfredo, 123",
                "email": "kami@email.com",
                "senha": "minhasenha123",
                "data_nascimento": "01-02-2021"
            }
        }
    */
   
) // Rota para criar um novo usuário
// usuarioRoutes.put('/:id', ) // Rota para atualizar um usuário específico

// usuarioRoutes.delete('/:id', ) // Rota para deletar um usuário específico.

usuarioRoutes.post('/login', UsuarioController.login

    /*
    #swagger.tags = ['Usuários'],
    #swagger.description = 'Endpoint para fazer login',
    #swagger.parameters['Login de usuario'] = {
        in: 'body',
        description: 'Insira os dados para realizar o login de usuário',
        required: true,
        schema: {
            email: "kami@email.com",
            senha: "minhasenha123",
        }   
    }
    */

) // Rota para fazer login. O login é feito através de um POST para a rota /login. O controller de usuários é responsável por lidar com a lógica de login.

usuarioRoutes.put('/atualizar/:id', validaToken, UsuarioController.atualizarUsuario

    /*
    #swagger.tags = ['Usuários'],
    #swagger.description = 'Endpoint para atualizar dados do usuário',
    #swagger.parameters['Atualizar dados'] = {
        in: 'body',
        description: 'Insira apenas os dados que deseja atualizar',
        required: true,
        schema: {
            nome: "",
            sexo: "",
            cpf: "",
            endereco: "",
            email: "",
            senha: "",
            data_nascimento: "",
        }   
    }
    */
)

usuarioRoutes.delete('/deletar/:id', validaToken, UsuarioController.deletarUsuario

    /*
    #swagger.tags = ['Usuários'],
    #swagger.description = 'Endpoint para deletar o usuário (Para deletar o usuário, é necessário excluir os locais de coleta associados a ele primeiro)'
    
    */

)

module.exports = usuarioRoutes // Exporta as rotas de usuários. As rotas são exportadas para serem usadas no arquivo de rotas principal, onde todas as rotas da aplicação são registradas.
