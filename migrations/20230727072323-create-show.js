'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shows', {
      showId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING(50),
      },
      startDate: {
        type: Sequelize.STRING(50),
      },
      startHour: {
        type: Sequelize.STRING(50),
      },
      timeTaken: {
        type: Sequelize.STRING(10),
      },
      grade: {
        type: Sequelize.STRING(10),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shows');
  },
};
