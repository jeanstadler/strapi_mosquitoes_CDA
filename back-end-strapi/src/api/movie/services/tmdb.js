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
        // Récupération de la route pour trouver les réalisateurs
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits`, {
            params: {api_key: TMDB_API_KEY}
        }); 

        // Puis on stock les 10 premiers acteurs (avec .slice) dans une constante 'actors'
        const actors = response.data.cast.slice(0, 10).map(act =>({name: act.name}));

        return actors;
    }catch(e){
        console.error('Erreur dans la récupération du réalisateur (getDirector) : ', e.message);
        const actors = [];
        return actors;
    }
}