import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { getAllMovies } from './services/movieService';
import { getAllActors } from './services/actorService';
import MovieDetail from './pages/MovieDetail';
import ActorDetail from './pages/ActorDetail';

function HomePage() {
  const navigate = useNavigate();
  //onglet actif : movies ou actors
  const [activeTab, setActiveTab] = useState('movies');
  //carte survolée (pour l'effet de survol)
  const [hoveredCard, setHoveredCard] = useState(null);
  //mot-clé de recherche
  const [searchQuery, setSearchQuery] = useState('');

  // États pour stocker les données de l'API
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);

  // Récupération des films depuis l'API
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getAllMovies();
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

  // Récupération des acteurs depuis l'API
  useEffect(() => {
    const fetchActors = async () => {
      const response = await getAllActors();
      setActors(response.data);
    };
    fetchActors();
  }, []);


  // Filtrage des films
  const filteredMovies = movies.filter(movie =>
    movie.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtrage des acteurs
  const filteredActors = actors.filter(actor =>
    actor.prenom_nom.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Fonction pour raccourcir la description
  const truncateDescription = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              🎬
            </div>
            <h1 className="app-title">CinéInfo</h1>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="tabs">
          <button
            onClick={() => setActiveTab('movies')}
            className={`tab-button ${activeTab === 'movies' ? 'active' : ''}`}
          >
            🎬 Films
          </button>
          <button
            onClick={() => setActiveTab('actors')}
            className={`tab-button ${activeTab === 'actors' ? 'active' : ''}`}
          >
            👤 Acteurs
          </button>
        </div>

        <div className="search-container">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={activeTab === 'movies' ? 'Rechercher un film...' : 'Rechercher un acteur...'}
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={(e) => e.target.classList.add('focused')}
              onBlur={(e) => e.target.classList.remove('focused')}
            />
          </div>
        </div>

        {activeTab === 'movies' && (
          <div className="cards-container">
            {filteredMovies.map(movie => (
              <div
                key={movie.id}
                onMouseEnter={() => setHoveredCard(movie.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`card ${hoveredCard === movie.id ? 'hovered' : ''}`}
              >
                <div className="card-content">
                  <div className="card-image">
                    {movie.affiche ? (
                      <img src={movie.affiche} alt={movie.titre} />
                    ) : (
                      '🎬'
                    )}
                  </div>
                  <div className="card-text">
                    <div className="card-header">
                      <h3 className="card-title">{movie.titre}</h3>
                    </div>
                    <p className="card-description">{truncateDescription(movie.description)}</p>
                    <div className="card-meta">
                      <p><strong>Réalisateur:</strong> {movie.realisateur.map(r => r.name).join(', ')}</p>
                      <p><strong>Date de sortie:</strong> {movie.date_de_sortie}</p>
                    </div>
                  </div>
                  <button
                    className="card-button"
                    onClick={() => navigate(`/movie/${movie.documentId}`)}
                  >
                    Voir +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'actors' && (
          <div className="cards-container">
            {filteredActors.map(actor => (
              <div
                key={actor.id}
                onMouseEnter={() => setHoveredCard(actor.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`actor-card ${hoveredCard === actor.id ? 'hovered' : ''}`}
              >
                <div className="actor-card-content">
                  <div className="actor-card-image">
                    {actor.photo ? (
                      <img src={actor.photo} alt={actor.prenom_nom} />
                    ) : (
                      '👤'
                    )}
                  </div>
                  <div className="actor-card-info">
                    <h3 className="actor-card-name">{actor.prenom_nom}</h3>
                  </div>
                  <button
                    className="card-button"
                    onClick={() => navigate(`/actor/${actor.documentId}`)}
                  >
                    Voir +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2025 CinéInfo - Votre source d'information cinématographique</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:documentId" element={<MovieDetail />} />
      <Route path="/actor/:documentId" element={<ActorDetail />} />
    </Routes>
  );
}
