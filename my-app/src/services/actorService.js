// Récupère tous les acteurs
export const getAllActors = async () => {
  const response = await fetch('http://localhost:1337/api/actors');
  const data = await response.json();
  return data;
};

// Récupère les acteurs avec pagination
export const getActorsPaginated = async (page = 1, pageSize = 10, searchQuery = '') => {
  // Construction de l'URL de base avec les paramètres de pagination et tri
  let url = `http://localhost:1337/api/actors?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=prenom_nom:asc`;

  // Ajout du filtre de recherche si une requête existe
  if (searchQuery) {
    url += `&filters[prenom_nom][$containsi]=${encodeURIComponent(searchQuery)}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Récupère un acteur par son ID avec ses films
export const getActorById = async (documentId) => {
  const response = await fetch(`http://localhost:1337/api/actors/${documentId}?populate=movies`);
  const data = await response.json();
  return data;
};
