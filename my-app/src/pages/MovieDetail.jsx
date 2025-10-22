import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/movieService';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MovieDetail() {
  // on récupère l'id du film depuis les paramètres de la route grace au react router dom
  const { documentId } = useParams();
  // on récupère la fonction navigate pour naviguer entre les pages
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // on récupère le film depuis l'api grace au documentId
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

  // si on est en chargement on affiche un message de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header showBackButton={true} showAdminLogin={true} pageTitle="Chargement..." />
        <main className="main-content">
          <div className="detail-card">
            <p className="info-text">Chargement du film...</p>
          </div>
        </main>
      </div>
    );
  }

  // si on a une erreur ou si le film n'est pas trouvé on affiche un message d'erreur
  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black">
        <Header showBackButton={true} showAdminLogin={true} pageTitle="Erreur" />
        <main className="main-content">
          <div className="detail-card">
            <p className="info-text">{error || "Film non trouvé"}</p>
          </div>
        </main>
      </div>
    );
  }

  // si tout est ok on affiche le detail du film
  return (
    <div className="min-h-screen bg-black">
      <Header showBackButton={true} showAdminLogin={true} pageTitle="Détail du film" />

      <main className="main-content">
        <div className="detail-card">
          <div className="detail-image-container">
            <div className="detail-image">
              {/* si le film a une affiche on l'affiche sinon on affiche un emoji */}
              {movie.affiche ? (
                <img
                  src={movie.affiche}
                  alt={movie.titre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.75rem' }}
                />
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
              {/* si le film a des acteurs on les affiche sinon on affiche message "non renseigné" */}
              {movie.actors && movie.actors.length > 0 ? (
                <div className="actors-links">
                  {movie.actors.map((actor) => (
                    <button
                      key={actor.id}
                      onClick={() => navigate(`/actor/${actor.documentId}`)}
                      className="actor-link"
                    >
                      {actor.prenom_nom}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="info-text">Non renseigné</p>
              )}
            </div>

            <div className="info-section">
              <h3 className="info-label">📅 Date de sortie</h3>
              <p className="info-text">{movie.date_de_sortie || "Non renseignée"}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
