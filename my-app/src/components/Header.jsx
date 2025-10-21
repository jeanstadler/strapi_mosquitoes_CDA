import { useNavigate } from 'react-router-dom';

export default function Header({ showBackButton = false, pageTitle = null }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            🎬
          </div>
          <h1 className="app-title">CinéInfo</h1>
        </div>

        {showBackButton && (
          <div className="header-top">
            <button onClick={() => navigate('/')} className="back-button">
              ←
            </button>
            {pageTitle && <h2 className="page-title">{pageTitle}</h2>}
          </div>
        )}
      </div>
    </header>
  );
}
