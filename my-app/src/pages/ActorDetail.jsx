import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActorById } from '../services/actorService';

export default function ActorDetail() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        setLoading(true);
        const response = await getActorById(documentId);
        setActor(response.data);
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement de l'acteur");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchActor();
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
            <p className="info-text">Chargement de l'acteur...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !actor) {
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
            <p className="info-text">{error || "Acteur non trouvé"}</p>
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
            <h2 className="page-title">Détail de l'acteur</h2>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="detail-card">
          <div className="detail-image-container">
            <div className="detail-image">
              {actor.photo ? (
                <img src={actor.photo} alt={actor.prenom_nom} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.75rem' }} />
              ) : (
                '👤'
              )}
            </div>
            <h1 className="detail-title">{actor.prenom_nom}</h1>
          </div>

          <div className="detail-info">
            <div className="info-section">
              <h3 className="info-label">📅 Date de naissance</h3>
              <p className="info-text">{actor.date_de_naissance || "Non renseignée"}</p>
            </div>

            <div className="info-section">
              <h3 className="info-label">🎬 Films</h3>
              {actor.movies && actor.movies.length > 0 ? (
                <div className="related-movies">
                  {actor.movies.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => navigate(`/movie/${movie.documentId}`)}
                      className="related-movie-link"
                    >
                      {movie.titre}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="info-text">Aucun film renseigné</p>
              )}
            </div>

            <div className="info-section">
              <h3 className="info-label">🆔 ID TMDB</h3>
              <p className="info-text">{actor.tmdb_id || "Non renseigné"}</p>
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
