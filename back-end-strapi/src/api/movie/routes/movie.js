'use strict';

/**
 * movie router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::movie.movie');

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

