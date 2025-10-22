'use strict';

/**
 * movie router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::movie.movie');

module.exports = () => {
  // Récupère le router standard (CRUD)
  const router = createCoreRouter('api::movie.movie');

  // Ajoute une route POST custom pour synchroniser les films TMDb
  router.routes.push({
    method: 'POST',
    path: '/movies/sync-french',           // ton endpoint
    // handler: 'movie.syncFrenchMovies',     // méthode du controller
    handler: 'api::movie.movie.syncFrenchMovies',     // méthode du controller
    config: {
      // auth: false,                          // ou true pour restreindre aux admins
      // auth: {
      //   scope: ['authenticated'], // l'utilisateur doit être connecté connecté
      // },
      policies: ['global::is-admin-front'], // utilisation d'une policie custom
    },
  });

  return router;
};

// module.exports = {
//   routes: [
//     {
//       method: 'POST',
//       path: '/movies/sync-french',
//       handler: 'movie.syncFrenchMovies',
//       config: {
//         auth: false,
//       },
//     },
//   ],
// };

