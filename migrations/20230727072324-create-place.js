'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Places', {
      placeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING(50),
      },
      address: {
        type: Sequelize.STRING(50),
      },
      seatClassList: {
        type: Sequelize.STRING(50),
      },
      seatNumberList: {
        type: Sequelize.STRING(50),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Places');
  }
};