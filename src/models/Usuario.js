const {DataTypes} = require('sequelize'); // Importa o DataTypes do sequelize, que é um objeto que contém os tipos de dados do sequelize. O DataTypes é usado para definir os tipos de dados dos campos do modelo.

const connection = require('../database/connection'); // Importa a conexão com o banco de dados. O arquivo connection.js é responsável por criar a conexão com o banco de dados usando o sequelize.

const Usuario = connection.define('usuarios', { // Cria o modelo de usuários. O define cria uma tabela no banco de dados com o nome passado como primeiro parâmetro e os campos passados como segundo parâmetro.
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    sexo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    endereco:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_nascimento:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
})

module.exports = Usuario; // Exporta o modelo de usuários. O modelo é exportado para ser usado em outros arquivos, como o controller e o router. O modelo é usado para fazer operações no banco de dados, como criar, ler, atualizar e deletar registros.