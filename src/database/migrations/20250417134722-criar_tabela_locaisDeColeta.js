'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable(
      'locaisDeColeta',
      {
        id:{
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false
        },
          nomeDoLocal:{
            type: Sequelize.STRING,
            allowNull: false
          },
          descricao:{
            type: Sequelize.STRING,
            allowNull: false
          },
          estado:{
            type: Sequelize.STRING,
            allowNull: false
          },
          cidade:{
            type: Sequelize.STRING,
            allowNull: false
          },
          cep:{
            type: Sequelize.STRING,
            allowNull: false
          },
          bairro:{
            type: Sequelize.STRING,
            allowNull: false
          },
          rua:{
            type: Sequelize.STRING,
            allowNull: false
          },
          numero:{
            type: Sequelize.STRING,
            allowNull: false
          },
          coordenadas:{
            type: Sequelize.STRING,
            allowNull: false
          },
          materiaisAceitos:{
            type: Sequelize.STRING,
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
        }
    )

  },

  async down (queryInterface, Sequelize) {   

    await queryInterface.dropTable('locaisDeColeta');

  }
};
