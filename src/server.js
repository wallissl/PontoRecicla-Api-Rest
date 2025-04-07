const express = require('express'); // Importa o express
const cors = require('cors'); // Para trabalhar com chamadas https de outros ips
const routes = require('./routes/routes'); // Importa as rotas
const connection = require('./database/connection');// Importa a conexão com o banco de dados

const PORT_API = process.env.PORT_API // Possível graças ao dotenv, que possibilita essa funcionalidade.

class Server {
    constructor (server=express()){
        this.middlewares(server) // Aplica os middlewares
        this.database() // Inicia o banco de dados
        server.use(routes)  /// Liga as rotas - Registra no express
        this.initializeServer(server) // Inicia o servidor

    } // O express é uma função, então posso passar o express como parâmetro para o meu servidor.

    async middlewares(app){
        console.log("Executando os middlewares...")
        app.use(cors()) // Para trabalhar com chamadas https de outros ips 
        app.use(express.json()) // Para trabalhar com json
        console.log("Middlewares inicializados!")
    } // São funções que ficam entre a requisição e a resposta.

    async database(){
        try {
            await connection.authenticate()
            console.log("Conexão com o banco de dados estabelecida com sucesso")
        } catch (error) {
            console.log("Erro ao conectar com o banco de dados!")
            console.log(error)
            
        } // Aqui eu estou chamando a função authenticate do sequelize, que vai tentar conectar com o banco de dados. Se der erro, ele vai cair no catch e imprimir o erro no console.
    }

    async initializeServer(app){
        app.listen(PORT_API, () => {
            console.log(`Servidor conectado na porta ${PORT_API}`)
        })
    } // O express é uma função, então posso passar o express como parâmetro para o meu servidor.
}

module.exports = {Server} // Exporta a classe Server para ser utilizada em outros arquivos. Assim, posso importar o servidor em outros arquivos e utilizá-lo.