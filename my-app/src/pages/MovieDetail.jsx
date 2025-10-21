import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/movieService';

export default function MovieDetail() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await getMovieById(documentId);
        setMovie(response.data);
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement du film");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [documentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <header className="header">
          <div className="header-content">
            <div className="header-top">
              <button onClick={() => navigate('/')} className="back-button">
                ←
              </button>
              <h2 className="page-title">Chargement...</h2>
            </div>
          </div>
        </header>
        <main className="main-content">
          <div className="detail-card">
            <p className="info-text">Chargement du film...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black">
        <header className="header">
          <div className="header-content">
            <div className="header-top">
              <button onClick={() => navigate('/')} className="back-button">
                ←
              </button>
              <h2 className="page-title">Erreur</h2>
            </div>
          </div>
        </header>
        <main className="main-content">
          <div className="detail-card">
            <p className="info-text">{error || "Film non trouvé"}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="header">
        <div className="header-content">
          <div className="header-top">
            <button onClick={() => navigate('/')} className="back-button">
              ←
            </button>
            <h2 className="page-title">Détail du film</h2>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="detail-card">
          <div className="detail-image-container">
            <div className="detail-image">
              {movie.affiche ? (
                <img src={movie.affiche} alt={movie.titre} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.75rem' }} />
              ) : (
                '🎬'
              )}
            </div>
            <h1 className="detail-title">{movie.titre}</h1>
          </div>

          <div className="detail-info">
            <div className="info-section">
              <h3 className="info-label">📝 Description</h3>
              <p className="info-text">{movie.description || "Aucune description disponible"}</p>
            </div>

            <div className="info-section">
              <h3 className="info-label">🎬 Réalisateur(s)</h3>
              <p className="info-text">
                {movie.realisateur && movie.realisateur.length > 0
                  ? movie.realisateur.map(r => r.name).join(', ')
                  : "Non renseigné"}
              </p>
            </div>

            <div className="info-section">
              <h3 className="info-label">🎭 Acteurs</h3>
              <p className="info-text">
                {movie.actors && movie.actors.length > 0
                  ? movie.actors.map(a => a.prenom_nom).join(', ')
                  : "Non renseigné"}
              </p>
            </div>

            <div className="info-section">
              <h3 className="info-label">📅 Date de sortie</h3>
              <p className="info-text">{movie.date_de_sortie || "Non renseignée"}</p>
            </div>

            <div className="info-section">
              <h3 className="info-label">🆔 ID TMDB</h3>
              <p className="info-text">{movie.tmdb_id || "Non renseigné"}</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 CinéInfo - Votre source d'information cinématographique</p>
      </footer>
    </div>
  );
}
