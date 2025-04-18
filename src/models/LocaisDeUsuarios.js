const { DataTypes} = require('sequelize');
const connection = require('../database/connection');

const LocaisDeUsuarios = connection.define('locais_de_usuarios', {

    usuario_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    local_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'locais_de_coleta',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },    
    },
    {
        underscored: true 
    }
);

module.exports = LocaisDeUsuarios; // Exporta o modelo de locais de usuários. O modelo é exportado para ser usado em outros arquivos, como o controller e o router. O modelo é usado para fazer operações no banco de dados, como criar, ler, atualizar e deletar registros.