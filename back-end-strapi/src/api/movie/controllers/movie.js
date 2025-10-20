'use strict';

/**
 * movie controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::movie.movie', ({ strapi }) => ({

  // Endpoint custom servant à synchroniser les films depuis TMDb
  async syncFrenchMovies(ctx) {
    try {
      // Utilisation du service qui insère les films en base de données et stockage du comptage du nombre de film ajouté
      const count = await strapi
        .service('api::movie.movie')
        .syncFrenchMovies();

      ctx.send({ message: `Synchronisation réussie : ${count} films importés.` });
    } catch (error) {
      console.error('Erreur de synchronisation à l\'API de TMDb :', error);
      ctx.internalServerError('Erreur pendant la synchronisation à l\'API de TMDb');
    }
  },
}));
