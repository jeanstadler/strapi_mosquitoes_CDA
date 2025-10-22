// Récupère tous les films
export const getAllMovies = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/movies`);
  const data = await response.json();
  return data;
};

// Récupère un film par son ID avec ses acteurs
export const getMovieById = async (documentId) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/movies/${documentId}?populate=actors`);
  const data = await response.json();
  return data;
};
