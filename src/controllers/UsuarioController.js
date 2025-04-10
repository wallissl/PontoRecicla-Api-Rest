const Usuario = require('../models/Usuario'); // Importa o modelo de usuários. O modelo é importado para ser usado no controller. O modelo é usado para fazer operações no banco de dados, como criar, ler, atualizar e deletar registros.

class UsuarioController{

    async criarConta(req, res){

        try {
            const dados = req.body; // Pega os dados do corpo da requisição. Os dados são enviados pelo cliente no corpo da requisição. O body-parser é usado para fazer o parse do corpo da requisição e transformar em um objeto javascript.

            const usuario = await Usuario.create({ // Cria um novo usuário no banco de dados. O create é um método do sequelize que cria um novo registro no banco de dados. O método recebe um objeto com os dados do usuário.

                ...dados, // Espalha os dados recebidos no corpo da requisição. O operador spread é usado para espalhar os dados do objeto em um novo objeto. Isso é útil para evitar repetir o nome dos campos do objeto.
            });


            res.status(201).json({
                nome: usuario.nome,
                email: usuario.email,
              
            }); // Retorna uma resposta de sucesso com o status 201 e uma mensagem de sucesso. O status 201 indica que o recurso foi criado com sucesso. A mensagem é enviada no formato json.

        }catch (error) {
            console.log(error)
            res.status(500).json({message: 'Erro ao criar usuário!'}); // Retorna uma resposta de erro com o status 500 e uma mensagem de erro. O status 500 indica que ocorreu um erro interno no servidor. A mensagem é enviada no formato json.
        }
    }
}

module.exports = new UsuarioController(); // Exporta uma nova instância do controller de usuários. O controller é exportado para ser usado em outros arquivos, como o router. A instância é criada para que o controller possa ser usado como um singleton, ou seja, uma única instância do controller é criada e usada em toda a aplicação.