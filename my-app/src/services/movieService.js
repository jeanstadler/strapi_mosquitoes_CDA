// Récupère tous les films
export const getAllMovies = async () => {
  const response = await fetch('http://localhost:1337/api/movies');
  const data = await response.json();
  return data;
};

// Récupère les films avec pagination
export const getMoviesPaginated = async (page = 1, pageSize = 10, searchQuery = '') => {
  // Construction de l'URL de base avec les paramètres de pagination et tri
  let url = `http://localhost:1337/api/movies?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=titre:asc`;

  // Ajout du filtre de recherche si une requête existe
  if (searchQuery) {
    url += `&filters[titre][$containsi]=${encodeURIComponent(searchQuery)}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Récupère un film par son ID avec ses acteurs
export const getMovieById = async (documentId) => {
  const response = await fetch(`http://localhost:1337/api/movies/${documentId}?populate=actors`);
  const data = await response.json();
  return data;
};
