import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { getAllMovies, getMoviesPaginated } from './services/movieService';
import { getAllActors, getActorsPaginated } from './services/actorService';
import MovieDetail from './pages/MovieDetail';
import ActorDetail from './pages/ActorDetail';
import LegalNotices from './pages/LegalNotices';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieCard from './components/MovieCard';
import ActorCard from './components/ActorCard';

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

  // Constante pour la taille de page
  const PAGE_SIZE = 10;

  // États pour la pagination des films
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [totalMoviePages, setTotalMoviePages] = useState(1);

  // États pour la pagination des acteurs
  const [currentActorPage, setCurrentActorPage] = useState(1);
  const [totalActorPages, setTotalActorPages] = useState(1);

  // Récupération des films depuis l'API avec pagination
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getMoviesPaginated(currentMoviePage, PAGE_SIZE, searchQuery);
      setMovies(response.data);
      // Récupération du nombre total de pages depuis les métadonnées
      setTotalMoviePages(response.meta.pagination.pageCount);
    };
    fetchMovies();
  }, [currentMoviePage, searchQuery]); // ← Se réexécute si la page OU la recherche change

  // Récupération des acteurs depuis l'API avec pagination
  useEffect(() => {
    const fetchActors = async () => {
      const response = await getActorsPaginated(currentActorPage, PAGE_SIZE, searchQuery);
      setActors(response.data);
      // Récupération du nombre total de pages depuis les métadonnées
      setTotalActorPages(response.meta.pagination.pageCount);
    };
    fetchActors();
  }, [currentActorPage, searchQuery]); // Re-exécute quand la page ou la recherche change

  // Réinitialise la page à 1 quand la recherche change
  useEffect(() => {
    setCurrentMoviePage(1);
    setCurrentActorPage(1);
  }, [searchQuery]);  // ← "dès que searchQuery change, exécute ce code"

  // Réinitialise la page à 1 et la recherche quand on change d'onglet
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentMoviePage(1);
    setCurrentActorPage(1);
  };


  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="main-content">
        <div className="tabs">
          <button
            onClick={() => handleTabChange('movies')}
            className={`tab-button ${activeTab === 'movies' ? 'active' : ''}`}
          >
            🎬 Films
          </button>
          <button
            onClick={() => handleTabChange('actors')}
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
              value={searchQuery} // ← L'état qui stocke ce que tu tapes
              onChange={(e) => setSearchQuery(e.target.value)} // ← Quand tu tapes, ça change 
              onFocus={(e) => e.target.classList.add('focused')}
              onBlur={(e) => e.target.classList.remove('focused')}
            />
          </div>
        </div>
        {/* si on est sur l'onglet movies */}
        {activeTab === 'movies' && (
          <>
            <div className="cards-container">
              {/* on boucle sur chaque film */}
              {movies.map(movie => (
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
            {/* Contrôles de pagination pour les films */}
            <div className="pagination">
              <button
                onClick={() => setCurrentMoviePage(currentMoviePage - 1)}
                disabled={currentMoviePage === 1}
                className="pagination-button"
              >
                ← Précédent
              </button>
              <span className="pagination-info">
                Page {currentMoviePage} sur {totalMoviePages}
              </span>
              <button
                onClick={() => setCurrentMoviePage(currentMoviePage + 1)}
                disabled={currentMoviePage === totalMoviePages}
                className="pagination-button"
              >
                Suivant →
              </button>
            </div>
          </>
        )}
        {/* si on est sur l'onglet actors */}
        {activeTab === 'actors' && (
          <>
            <div className="cards-container">
              {/* on boucle sur chaque acteur */}
              {actors.map(actor => (
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
            {/* Contrôles de pagination pour les acteurs */}
            <div className="pagination">
              <button
                onClick={() => setCurrentActorPage(currentActorPage - 1)}
                disabled={currentActorPage === 1}
                className="pagination-button"
              >
                ← Précédent
              </button>
              <span className="pagination-info">
                Page {currentActorPage} sur {totalActorPages}
              </span>
              <button
                onClick={() => setCurrentActorPage(currentActorPage + 1)}
                disabled={currentActorPage === totalActorPages}
                className="pagination-button"
              >
                Suivant →
              </button>
            </div>
          </>
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
      <Route path="/legal" element={<LegalNotices />} />
    </Routes>
  );
}
