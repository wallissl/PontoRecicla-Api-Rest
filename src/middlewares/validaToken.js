const { verify } = require('jsonwebtoken'); // Importa o método verify do jsonwebtoken. O verify é usado para verificar se o token é válido. O método recebe o token e a chave secreta como parâmetros. Se o token for válido, o método retorna os dados do usuário. Se o token não for válido, o método lança um erro.

function validaToken(req, res, next) { // Cria a função validaToken. A função recebe os parâmetros req, res e next. O req é o objeto da requisição, o res é o objeto da resposta e o next é uma função que chama o próximo middleware na pilha de middlewares. O next é usado para passar o controle para o próximo middleware na pilha de middlewares. Se não houver mais middlewares na pilha, o next chama a função final que envia a resposta ao cliente.
    try{
        const token = req.headers.authorization

        if(!token){
            return res.status(401).json({message: 'Token não anexado'})
        } // Resposta caso o token não seja enviado. O status 401 indica que o usuário não está autorizado a acessar o recurso.

        const jwt = token.split(" ") // Divide o token em um array usando o caractere espaço como separador. O operador split divide a string em um array. O primeiro elemento do array é a palavra Bearer e o segundo elemento é o token.

        const resultado = verify(jwt[1], process.env.JWT_SECRET) // Verifica se o token é válido. O verify é usado para verificar se o token é válido. O método recebe o token e a chave secreta como parâmetros. Se o token for válido, o método retorna os dados do usuário. Se o token não for válido, o método lança um erro.

        console.log(resultado) // Imprime os dados do usuário no console. O resultado é um objeto com os dados do usuário. O objeto contém o id do usuário, o nome do usuário e o email do usuário.
        req.usuarioId = resultado.id // Adiciona o id do usuário ao objeto req. O id do usuário é adicionado ao objeto req para que possa ser usado em outros middlewares ou na função final que envia a resposta ao cliente. O id do usuário é usado para identificar o usuário no banco de dados.

        next()
        console.log(token) 
    }catch(error){
        if(error.message === 'jwt expired'){
            return res.status(401).json({message: 'Token expirado'})
        } // Resposta caso o token tenha expirado. O status 401 indica que o usuário não está autorizado a acessar o recurso.
        else {
            res.status(500).json({message: 'A requisição falhou'})
        }
    }
}

module.exports = validaToken; // Exporta a função validaToken. A função é exportada para ser usada em outros arquivos, como o router. A função é usada como um middleware para validar o token antes de acessar os recursos protegidos da aplicação.