const axios = require('axios'); // Lien avec axios

const TMDB_API_KEY = process.env.TMDB_API_KEY; //On stock la clé API dans cette 'const'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'; //Base url de l'API de TMDb
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; //Base url de l'image

async function getDirector(movieId) { //Fonction pour récupérer les réalisateurs
    try{
        // Récupération de la route pour trouver les réalisateurs
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits`, {
            params: {api_key: TMDB_API_KEY}
        }); 

        // Puis on stock les réalisateurs dans une constante 'directors'
        const directors = response.data.crew.filter(c => c.job === 'Director').map(dir =>({name: dir.name}));

        return directors;
    }catch(e){
        console.error('Erreur dans la récupération du réalisateur (getDirector) : ', e.message);
        const directors = [];
        return directors;
    }
}

async function getActor(movieId) { //Fonction pour récupérer les acteurs
    try{
        // Récupération de la route pour trouver les acteurs
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits`, {
            params: {api_key: TMDB_API_KEY}
        }); 

        // Puis on stock les 10 premiers acteurs (avec .slice) dans une constante 'actors'
        const actors = response.data.cast.slice(0, 10).map(act =>act.id);

        return actors;
    }catch(e){
        console.error('Erreur dans la récupération du réalisateur (getDirector) : ', e.message);
        const actors = [];
        return actors;
    }
}

module.exports = { //rendu de la requête exporté, servant à récupérer les éléments demandés de TMDb

    async fetchFrenchMovies() {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
        params: { // Paramètres des films qu'on va importer
          api_key: TMDB_API_KEY,
          language: 'fr-FR',
          region: 'FR', 
          sort_by: 'popularity.desc',
          'primary_release_date.gte': '2025-10-07', // Filtre la date de sortie plus grande que...
          'primary_release_date.lte': '2025-10-21', // Filtre la date de sortie plus petite que...
          with_original_language: 'fr', //film français
          'with_runtime.gte': 80, // Durée du film en minutes
          page: 1,
        },
      });

      const movies = response.data.results;

      // On prépare un tableau avec les différents éléments importants que l'on souhaite récupérer du film
      const moviesFormatted = await Promise.all(
        movies.map(async movie => {
          const directors = await getDirector(movie.id);
          const actorsId = await getActor(movie.id)

          return {
            tmdb_id: movie.id,
            titre: movie.title,
            description: movie.overview,
            date_de_sortie: movie.release_date,
            realisateur: directors, 
            affiche: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null,
            actors: actorsId,           
          };
        })
      );

      return moviesFormatted;
    } catch (e) {
      console.error('Erreur requête fetch TMDb :', e.message);
      return [];
    }
  }
}