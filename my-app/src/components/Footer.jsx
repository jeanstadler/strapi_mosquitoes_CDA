import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 CinéInfo - Votre source d'information cinématographique</p>
        <div className="footer-links">
          <Link to="/legal">Mentions légales & Conditions générales</Link>
        </div>
      </div>
    </footer>
  );
}
