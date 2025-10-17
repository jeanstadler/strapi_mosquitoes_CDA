'use strict';

/**
 * movie service
 */

const { createCoreService } = require('@strapi/strapi').factories;

const axios = require('axios');
const tmdbService = require('./tmdb');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_PERSON_URL = `${TMDB_BASE_URL}/person`;

module.exports = createCoreService('api::movie.movie', ({ strapi }) => ({

  async syncFrenchMovies() {
    const movies = await tmdbService.fetchFrenchMovies();

    for (const movie of movies) {

      

      const actorsToConnect = [];

      for (const actorId of movie.actor) {
        // On vérifie si l'acteur existe déjà dans la base de données
        let actor = await strapi.db.query('api::actor.actor').findOne({
          where: { tmdb_id: actorId },
        });

        if (!actor) {
          // On récupère les informations de l'acteur 
          const actorResponse = await axios.get(`${TMDB_PERSON_URL}/${actorId}`, {
            params: { api_key: TMDB_API_KEY, language: 'fr-FR' },
          });

          const actorFound = actorResponse.data;

          actor = await strapi.db.query('api::actor.actor').create({
            data: {
              tmdb_id: actorFound.id,
              prenom_nom: actorFound.name,
              date_de_naissance: actorFound.birthday,
              photo: actorFound.profile_path ? `https://image.tmdb.org/t/p/w500${actorFound.profile_path}` : null,
            },
          });
        }

        if (actor && actor.id) {
          actorsToConnect.push(actor.id);
        }

      }

      // On vérifie si le film existe déjà dans la base de données
      const existingMovie = await strapi.db.query('api::movie.movie').findOne({
        where: { tmdb_id: movie.tmdb_id },
      });

      if (!movie.titre || !movie.tmdb_id) {
        console.warn('Film ignoré car incomplet :', movie);
        continue; // passe au suivant
      }

      if (!existingMovie) {
        // const actorsToConnectClean = actorsToConnect.filter(a => a !== undefined);

        await strapi.db.query('api::movie.movie').create({
          data: {
            tmdb_id: movie.tmdb_id,
            titre: movie.titre,
            description: movie.description,
            date_de_sortie: movie.date_de_sortie,
            realisateur: movie.realisateur,
            affiche: movie.affiche,
            actor: actorsToConnect.map(id => ({ id })),
          },
        });
      }
    }

    return movies.length;
  },
}));
