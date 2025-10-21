module.exports = {
  
  importFrenchMoviesJob: {
    task: async ({ strapi }) => {
        try{
            const movieService = strapi.service('api::movie.movie');
      
            const movies = await movieService.fetchFrenchMovies();
      
            if(movies.length > 0){
              await movieService.synchFrenchMovies(movies);
              console.log(`Import automatique terminé : ${movies.length} films ont étés traités`);
              
            }else{
              console.log("Aucun film n'a été importé automatiquement car déjà à jour !");
              
            }
        }catch(e){
            console.error("Erreur pendant la synchronisation automatique avec l'API TMDb :", e);      
        }
    },
    options: {
      rule: "0 0 3 * * *",
      tz: "Europe/Paris"
    },
  },
};