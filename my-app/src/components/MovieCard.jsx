import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie, isHovered, onMouseEnter, onMouseLeave }) {
  const navigate = useNavigate();

  // Fonction pour raccourcir la description
  const truncateDescription = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`card ${isHovered ? 'hovered' : ''}`}
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
  );
}
