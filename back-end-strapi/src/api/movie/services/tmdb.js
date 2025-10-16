const axios = require('axios'); // Lien avec axios

const TMDB_API_KEY = process.env.TMDB_API_KEY; //On stock la clé API dans cette 'const'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'; //Base url de l'API de TMDb