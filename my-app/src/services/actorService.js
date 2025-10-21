// Récupère tous les acteurs
export const getAllActors = async () => {
  const response = await fetch('http://localhost:1337/api/actors');
  const data = await response.json();
  return data;
};

// Récupère un acteur par son ID avec ses films
export const getActorById = async (documentId) => {
  const response = await fetch(`http://localhost:1337/api/actors/${documentId}?populate=movies`);
  const data = await response.json();
  return data;
};
