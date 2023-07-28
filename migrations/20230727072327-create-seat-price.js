'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SeatPrices', {
      seatPriceId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      showId: {
        type: Sequelize.UUID,
      },
      placeId: {
        type: Sequelize.UUID,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: 'available',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SeatPrices');
  },
};
