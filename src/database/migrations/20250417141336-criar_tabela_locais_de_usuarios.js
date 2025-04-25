'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'locais_de_usuarios',
      {
        id:{
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false
        },
          usuario_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'usuarios',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
          },
          local_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'locais_de_coleta',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
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
    );
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('locais_de_usuarios');
  }
};
