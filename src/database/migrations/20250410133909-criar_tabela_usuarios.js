'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable(
      'usuarios',
      {
        id:{
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false
        }
        ,
        nome:{
          type: Sequelize.STRING,
          allowNull: false
        },
        sexo:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        cpf:{
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        endereco:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        email:{
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        senha:{
          type: Sequelize.STRING,
          allowNull: false
        },
        data_nascimento:{
          type: Sequelize.DATEONLY, // Pega só a data, sem horário.
          allowNull: false
        },
        created_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
    // O método dropTable apaga a tabela do banco de dados.
  }
};
