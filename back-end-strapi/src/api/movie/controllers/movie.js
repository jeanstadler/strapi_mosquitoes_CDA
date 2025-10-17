'use strict';

/**
 * movie controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::movie.movie', ({ strapi }) => ({

  // Endpoint custom servant à synchroniser les films depuis TMDb
  async syncFrenchMovies(ctx) {
    // try {
    //   const count = await strapi
    //     .service('api::movie.movie')
    //     .syncFrenchMoviesFrom2000();

    //   ctx.send({ message: `Synchronisation réussie : ${count} films importés.` });
    // } catch (error) {
    //   console.error('Erreur de synchronisation :', error);
    //   ctx.internalServerError('Erreur pendant la synchronisation');
    // }
    ctx.send({ message: 'Test ok' });
  },
}));
