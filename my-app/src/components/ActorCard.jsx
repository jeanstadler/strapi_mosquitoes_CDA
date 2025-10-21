import { useNavigate } from 'react-router-dom';

export default function ActorCard({ actor, isHovered, onMouseEnter, onMouseLeave }) {
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`actor-card ${isHovered ? 'hovered' : ''}`}
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
  );
}
