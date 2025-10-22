import { Link, useNavigate } from 'react-router-dom';
import { BsFillPersonFill } from "react-icons/bs";
import { clearToken, isAuthenticated } from "../services/auth";

export default function Header({ showBackButton = false, showAdminLogin = false, pageTitle = null }) {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate('/');
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left-section">
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

        {showAdminLogin && !isAuthenticated() && (
          <Link to="/admin/login" className="admin-login-section">
            <BsFillPersonFill color="inherit" className="admin-login" />
            <span className="admin-login">Se connecter</span>
          </Link>
        )}

        {showAdminLogin && isAuthenticated() && (
          <div>
            <Link to="/admin/dashboard" className="admin-login">Tableau de bord</Link>
            <button onClick={handleLogout} className="admin-login" style={{ marginLeft: "0.5rem", cursor: "pointer", background: "none", border: "none", color: "#06b6d4" }}>
              Déconnexion
            </button>
          </div>
        )}


      </div>
    </header>
  );
}
