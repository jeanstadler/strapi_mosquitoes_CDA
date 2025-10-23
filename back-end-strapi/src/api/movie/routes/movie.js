'use strict';

/**
 * movie router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = () => {
  // Récupère le router standard (CRUD)
  const router = createCoreRouter('api::movie.movie');

  // Ajoute une route POST custom pour synchroniser les films TMDb
  router.routes.push({
    method: 'POST',
    path: '/movies/sync-french', // Route qui sera utilisée
    handler: 'api::movie.movie.syncFrenchMovies', // Méthode du controller appelé
    config: {
      policies: ['global::is-admin-front'], // Utilisation d'une policie custom
    },
  });

  return router;
};