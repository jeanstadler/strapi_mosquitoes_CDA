module.exports = {
  
  importFrenchMoviesJob: {
    task: async ({ strapi }) => {
        try{
            const movieService = strapi.service('api::movie.movie');
      
            const movies = await movieService.syncFrenchMovies();
            console.log(`Import automatique réussi !`);
            
        }catch(e){
            console.error("Erreur pendant la synchronisation automatique avec l'API TMDb :", e);      
        }
    },
    options: {
      rule: "*/2 * * * *",
      tz: "Europe/Paris"
    },
  },
};