const {DataTypes} = require('sequelize');

const connection = require('../database/connection');

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
       
    }
);

module.exports = LocaisDeColeta; 