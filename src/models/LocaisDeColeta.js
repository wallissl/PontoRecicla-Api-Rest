const {DataTypes} = require('sequelize');

const connection = require('../database/connection');

/* const LocaisDeUsuarios = require('./LocaisDeUsuarios'); // Importa o modelo de locais de usuários. O modelo é importado para ser usado no relacionamento entre os modelos. O modelo é usado para fazer operações no banco de dados, como criar, ler, atualizar e deletar registros. */

const LocaisDeColeta = connection.define('locais_de_coleta',
    {
        nome_do_local:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cep:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        bairro:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        rua:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        numero:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        coordenadas:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        materiais_aceitos:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        underscored: true,
       
    },
   
);
module.exports = LocaisDeColeta; 