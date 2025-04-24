const { Op } = require('sequelize');
const Usuario = require('../models/Usuario'); // Importa o modelo de usuários. O modelo é importado para ser usado no controller. O modelo é usado para fazer operações no banco de dados, como criar, ler, atualizar e deletar registros.

const {compareSync} = require('bcryptjs'); // Importa o compareSync do bcrypt, que é uma biblioteca para criptografar senhas. O compareSync é usado para comparar a senha digitada pelo usuário com a senha armazenada no banco de dados. O compareSync recebe a senha digitada pelo usuário e a senha armazenada no banco de dados e retorna true se as senhas forem iguais ou false se forem diferentes.

const {sign} = require('jsonwebtoken'); // Importa o sign do jsonwebtoken, que é uma biblioteca para gerar tokens JWT. O sign é usado para gerar um token JWT com os dados do usuário. O token é usado para autenticar o usuário na aplicação. O token é gerado com os dados do usuário e uma chave secreta. A chave secreta é usada para assinar o token e garantir que o token não possa ser alterado por terceiros.

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expressão regular para validar o email. O regex é usado para validar o email. O regex é uma expressão regular que valida o formato do email.


class UsuarioController{

    async criarConta(req, res){

        try {
            const dados = req.body; // Pega os dados do corpo da requisição. Os dados são enviados pelo cliente no corpo da requisição. O body-parser é usado para fazer o parse do corpo da requisição e transformar em um objeto javascript.

            // validação de dados

            if(!dados.nome || !dados.email || !dados.senha){ // Verifica se os dados estão preenchidos. O operador de negação é usado para verificar se os dados estão preenchidos. Se algum dos dados não estiver preenchido, a condição será verdadeira.
                return res.status(400).json({message: 'Preencha todos os campos!'}); // Retorna uma resposta de erro com o status 400 e uma mensagem de erro. O status 400 indica que a requisição é inválida. A mensagem é enviada no formato json.
            }

            if(!regexEmail.test(dados.email)){ // Verifica se o email é válido. O método test do regex é usado para verificar se o email é válido. Se o email não for válido, a condição será verdadeira.
                return res.status(400).json({message: 'Formato de Email inválido!'});
            }

            if(dados.cpf.length !== 11){
                return res.status(400).json({message: 'CPF inválido, O CPF deve conter 11 dígitos!'}); // Retorna uma resposta de erro com o status 400 e uma mensagem de erro. O status 400 indica que a requisição é inválida. A mensagem é enviada no formato json.
            }

            // Validação - CPF e email duplicados
            const emailOuCpfDuplicado = await Usuario.findOne({ // Verifica se o usuário já existe no banco de dados. O findOne é um método do sequelize que busca um registro no banco de dados. O método recebe um objeto com os dados do usuário.
                where: {
                    [Op.or]: [
                        {email: dados.email},// Verifica se o email já existe no banco de dados. O where é usado para filtrar os registros do banco de dados. O método retorna o primeiro registro encontrado ou null se não encontrar nenhum registro.
                        {cpf: dados.cpf} // Verifica se o cpf já existe no banco de dados. O where é usado para filtrar os registros do banco de dados. O método retorna o primeiro registro encontrado ou null se não encontrar nenhum registro.
                    ]  // O operador or é usado para fazer uma busca com o operador or. O operador or é usado para buscar registros que atendem a pelo menos uma das condições. O operador or é usado para fazer uma busca com o operador or. O operador or é usado para buscar registros que atendem a pelo menos uma das condições.
                }
                    
            });

            if(emailOuCpfDuplicado){ // Se o email ou CPF já existe no banco de dados, a condição será verdadeira.
                return res.status(400).json({message: 'Email ou CPF já cadastrado!'}); // Retorna uma resposta de erro com o status 400 e uma mensagem de erro. O status 400 indica que a requisição é inválida. A mensagem é enviada no formato json.
            }

            const separadorDeData = dados.data_nascimento.includes('/') ? '/' : '-'; // Separa a data de nascimento em um array. O split divide a string em um array usando o caractere / como separador. O operador de desestruturação é usado para pegar os valores do array e atribuir a variáveis.
            
            const [dia, mes, ano] = dados.data_nascimento.split(separadorDeData); // Desestrutura os dados da data de nascimento. O split divide a string em um array usando o caractere / como separador. O operador de desestruturação é usado para pegar os valores do array e atribuir a variáveis.

            dados.data_nascimento = `${ano}-${mes}-${dia}`; // Formata a data de nascimento para o formato YYYY-MM-DD. O formato da data é alterado para o formato YYYY-MM-DD, que é o formato aceito pelo banco de dados. O operador de template string é usado para criar uma string com os valores das variáveis.

            const usuario = await Usuario.create({ // Cria um novo usuário no banco de dados. O create é um método do sequelize que cria um novo registro no banco de dados. O método recebe um objeto com os dados do usuário.

                ...dados, // Espalha os dados recebidos no corpo da requisição. O operador spread é usado para espalhar os dados do objeto em um novo objeto. Isso é útil para evitar repetir o nome dos campos do objeto.
            });


            res.status(201).json({
                message: 'Usuário criado com sucesso!',
                nome: usuario.nome,
                email: usuario.email,
                
              
            }); // Retorna uma resposta de sucesso com o status 201 e uma mensagem de sucesso. O status 201 indica que o recurso foi criado com sucesso. A mensagem é enviada no formato json.

        }catch (error) {
            console.log(error)
            res.status(500).json({message: 'Erro ao criar usuário!'}); // Retorna uma resposta de erro com o status 500 e uma mensagem de erro. O status 500 indica que ocorreu um erro interno no servidor. A mensagem é enviada no formato json.
        }
    }

    async login(req, res){

        const dados = req.body; 

        if(!dados.email || !dados.senha){
            return res.status(404).json({message: 'Email e senha são obrigatórios!'}); // Retorna uma resposta de erro com o status 400 e uma mensagem de erro. O status 400 indica que a requisição é inválida. A mensagem é enviada no formato json.
        }

        const usuario = await Usuario.findOne({
            where: {
                email: dados.email,
            }
        });

        if(!usuario){
            return res.status(404).json({message: 'Conta não encontrada!'});
        }

        const senhaCorreta = compareSync(
            dados.senha, // Senha digitada pelo usuário
            usuario.senha // Senha armazenada no banco de dados
        )

        if(!senhaCorreta){
            return res.status(404).json({message: 'Senha incorreta!'}); 
        }

        const token = sign({
            id: usuario.id, // ID do usuário
            email: usuario.email, // Email do usuário
        },
            process.env.SECRET_JWT,
            {
                expiresIn: '1d', // Tempo de expiração do token. O token expira em 1 dia. O tempo de expiração é definido em segundos ou em uma string com a unidade de tempo (s, m, h, d).
            }
        );

        res.status(200).json({
            token, // Token gerado para o usuário. O token é enviado na resposta para o cliente. O cliente deve armazenar o token e enviá-lo em todas as requisições que precisam de autenticação.
            nome: usuario.nome, // Nome do usuário. O nome do usuário é enviado na resposta para o cliente. O cliente pode usar o nome do usuário para exibir na interface.
            message: 'Login realizado com sucesso!'
        }); // Retorna uma resposta de sucesso com o status 200 e uma mensagem de sucesso. O status 200 indica que a requisição foi bem sucedida. A mensagem é enviada no formato json.

    } // Método para fazer login. O método é responsável por fazer o login do usuário. O método recebe os dados do usuário e verifica se o usuário existe no banco de dados. Se o usuário existir, o método retorna os dados do usuário. Se o usuário não existir, o método retorna uma mensagem de erro.
}

module.exports = new UsuarioController(); // Exporta uma nova instância do controller de usuários. O controller é exportado para ser usado em outros arquivos, como o router. A instância é criada para que o controller possa ser usado como um singleton, ou seja, uma única instância do controller é criada e usada em toda a aplicação.