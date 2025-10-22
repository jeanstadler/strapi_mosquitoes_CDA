import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { getAllMovies } from './services/movieService';
import { getAllActors } from './services/actorService';
import MovieDetail from './pages/MovieDetail';
import ActorDetail from './pages/ActorDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieCard from './components/MovieCard';
import ActorCard from './components/ActorCard';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';

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


  return (
    <div className="min-h-screen bg-black">
      <Header showAdminLogin="true" />

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
        {/* si on est sur l'onglet movies */}
        {activeTab === 'movies' && (
          <div className="cards-container">
            {/* on boucle sur chaque film */}
            {filteredMovies.map(movie => (
              // pour chaque film on affiche la carte
              <MovieCard
                key={movie.id}
                movie={movie}
                isHovered={hoveredCard === movie.id}
                onMouseEnter={() => setHoveredCard(movie.id)}
                onMouseLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        )}
        {/* si on est sur l'onglet actors */}
        {activeTab === 'actors' && (
          <div className="cards-container">
            {/* on boucle sur chaque acteur */}
            {filteredActors.map(actor => (
              // pour chaque acteur on affiche la carte
              <ActorCard
                key={actor.id}
                actor={actor}
                isHovered={hoveredCard === actor.id}
                onMouseEnter={() => setHoveredCard(actor.id)}
                onMouseLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:documentId" element={<MovieDetail />} />
      <Route path="/actor/:documentId" element={<ActorDetail />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
