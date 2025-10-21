import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActorById } from '../services/actorService';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ActorDetail() {
  // on récupère l'id de l'acteur depuis les paramètres de la route grace au react router dom
  const { documentId } = useParams();
  // on récupère la fonction navigate pour naviguer entre les pages
  const navigate = useNavigate();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // on récupère l'acteur depuis l'api grace au documentId
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

  // si on est en chargement on affiche un message de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header showBackButton={true} pageTitle="Chargement..." />
        <main className="main-content">
          <div className="detail-card">
            <p className="info-text">Chargement de l'acteur...</p>
          </div>
        </main>
      </div>
    );
  }

  // si on a une erreur ou si l'acteur n'est pas trouvé on affiche un message d'erreur
  if (error || !actor) {
    return (
      <div className="min-h-screen bg-black">
        <Header showBackButton={true} pageTitle="Erreur" />
        <main className="main-content">
          <div className="detail-card">
            <p className="info-text">{error || "Acteur non trouvé"}</p>
          </div>
        </main>
      </div>
    );
  }

  // si tout est ok on affiche le detail de l'acteur
  return (
    <div className="min-h-screen bg-black">
      <Header showBackButton={true} pageTitle="Détail de l'acteur" />

      <main className="main-content">
        <div className="detail-card">
          <div className="detail-image-container">
            <div className="detail-image">
              {/* si l'acteur a une photo on l'affiche sinon on affiche un emoji */}
              {actor.photo ? (
                <img
                  src={actor.photo}
                  alt={actor.prenom_nom}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.75rem' }}
                />
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
              {/* si l'acteur a des films on les affiche sinon on affiche message "aucun film renseigné" */}
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
