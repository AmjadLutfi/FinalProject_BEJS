'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Movies', [
      {
        title: 'Inception',
        synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
        trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
        imgUrl: 'https://example.com/inception.jpg',
        rating: 8.8,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Dark Knight',
        synopsis: 'When the menace known as the Joker emerges, Batman must confront chaos.',
        trailerUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
        imgUrl: 'https://example.com/dark-knight.jpg',
        rating: 9.0,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Interstellar',
        synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
        imgUrl: 'https://example.com/interstellar.jpg',
        rating: 8.6,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
