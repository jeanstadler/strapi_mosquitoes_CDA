import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './LegalNotices.css';

export default function LegalNotices() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="legal-content">
        <div className="legal-container">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Retour
          </button>

          {/* Mentions Légales */}
          <section className="legal-section">
            <h1>Mentions Légales</h1>

            <div className="legal-subsection">
              <h2>1. Identification du Site</h2>
              <p>
                <strong>Nom du site :</strong> CinéInfo<br />
                <strong>Type de site :</strong> Plateforme d'information cinématographique<br />
                <strong>Éditeur :</strong> CinéInfo - Équipe de Développement<br />
              </p>
            </div>

            <div className="legal-subsection">
              <h2>2. Informations sur les Sources de Données</h2>
              <p>
                Ce site utilise les données fournies par :
              </p>
              <ul>
                <li><strong>TMDB (The Movie Database) :</strong> Base de données publique des films et acteurs via API officielle</li>
                <li><strong>Strapi CMS :</strong> Système de gestion de contenu pour l'administration des données</li>
              </ul>
              <p>
                Les données relatives aux films et acteurs proviennent de sources externes et sont utilisées à titre informatif uniquement.
                CinéInfo n'est pas responsable de l'exactitude complète des informations fournies par ces tiers.
              </p>
            </div>

            <div className="legal-subsection">
              <h2>3. Propriété Intellectuelle</h2>
              <p>
                Tous les éléments du site CinéInfo (textes, logos, design, images) sont protégés par les droits d'auteur et les
                droits de propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation, totale ou partielle,
                est interdite sans autorisation préalable écrite.
              </p>
              <p>
                Les données de films et acteurs (photos, titres, descriptions) proviennent de TMDB et restent sous leur responsabilité
                et leurs droits d'auteur respectifs.
              </p>
            </div>

            <div className="legal-subsection">
              <h2>4. Limitation de Responsabilité</h2>
              <p>
                CinéInfo met le site à disposition « en l'état » sans garantie d'aucune sorte. L'éditeur ne peut être tenu responsable de :
              </p>
              <ul>
                <li>Les erreurs ou omissions dans les données affichées</li>
                <li>Les interruptions de service ou dysfonctionnements techniques</li>
                <li>Les dommages causés par l'utilisation du site ou de ses contenus</li>
                <li>Les données provenant de tiers (TMDB, etc.)</li>
              </ul>
            </div>

            <div className="legal-subsection">
              <h2>5. Droit Applicable</h2>
              <p>
                Le site est soumis à la loi française. Tout litige sera de la compétence exclusive des tribunaux français.
              </p>
            </div>
          </section>

          {/* Conditions Générales d'Utilisation */}
          <section className="legal-section">
            <h1>Conditions Générales d'Utilisation</h1>

            <div className="legal-subsection">
              <h2>1. Accès et Utilisation du Site</h2>
              <p>
                L'accès au site CinéInfo est gratuit et réservé à un usage personnel. Vous acceptez d'utiliser le site
                conformément aux lois et réglementations applicables.
              </p>
              <p>
                Vous vous engagez à :
              </p>
              <ul>
                <li>Ne pas utiliser le site à des fins commerciales sans autorisation</li>
                <li>Ne pas tenter de contourner les systèmes de sécurité</li>
                <li>Ne pas scraper ou extraire massivement les données</li>
                <li>Respecter les droits d'auteur et les droits de propriété intellectuelle</li>
              </ul>
            </div>

            <div className="legal-subsection">
              <h2>2. Création de Compte Utilisateur</h2>
              <p>
                Lors de votre inscription sur le site, vous devez fournir :
              </p>
              <ul>
                <li>Une adresse email valide</li>
                <li>Un mot de passe sécurisé</li>
              </ul>
              <p>
                <strong>Responsabilités de l'utilisateur :</strong>
              </p>
              <ul>
                <li>Vous êtes responsable de la confidentialité de votre mot de passe</li>
                <li>Vous êtes responsable de toutes les activités effectuées avec votre compte</li>
                <li>Vous vous engagez à maintenir vos identifiants confidentiels</li>
                <li>Vous acceptez de notifier immédiatement l'équipe en cas d'utilisation non autorisée de votre compte</li>
              </ul>
            </div>

            <div className="legal-subsection">
              <h2>3. Collecte et Traitement des Données Personnelles</h2>
              <p>
                <strong>Données collectées lors de l'inscription :</strong>
              </p>
              <ul>
                <li>Adresse email</li>
                <li>Mot de passe (chiffré et non stocké en clair)</li>
                <li>Date d'inscription</li>
                <li>Historique de consultation (optionnel)</li>
              </ul>
              <p>
                <strong>Utilisation des données :</strong>
              </p>
              <ul>
                <li>Authentification et gestion du compte utilisateur</li>
                <li>Amélioration des services proposés</li>
                <li>Communications importantes concernant le service</li>
              </ul>
              <p>
                <strong>Sécurité des données :</strong>
              </p>
              <ul>
                <li>Les mots de passe sont chiffrés et hashés</li>
                <li>Les données personnelles ne sont pas partagées avec des tiers</li>
                <li>Le site utilise une connexion sécurisée (HTTPS recommandé en production)</li>
              </ul>
              <p>
                Pour plus d'informations, veuillez consulter notre Politique de Confidentialité.
              </p>
            </div>

            <div className="legal-subsection">
              <h2>4. Cookies et Suivi</h2>
              <p>
                Le site peut utiliser des cookies pour :
              </p>
              <ul>
                <li>Maintenir votre session connectée</li>
                <li>Mémoriser vos préférences</li>
                <li>Améliorer l'expérience utilisateur</li>
              </ul>
              <p>
                Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
                Cependant, cela peut affecter le fonctionnement du site.
              </p>
            </div>

            <div className="legal-subsection">
              <h2>5. Disclaimer - Contenu Externe</h2>
              <p>
                CinéInfo affiche des informations en provenance de TMDB (The Movie Database).
                Ces informations sont fournies « en l'état » et CinéInfo ne garantit pas leur exactitude ou leur complétude.
              </p>
              <p>
                CinéInfo n'est pas responsable de :
              </p>
              <ul>
                <li>Les inexactitudes dans les données de films ou acteurs</li>
                <li>Les changements dans les données externes</li>
                <li>L'indisponibilité temporaire des données externes</li>
              </ul>
            </div>

            <div className="legal-subsection">
              <h2>6. Modification et Suspension du Service</h2>
              <p>
                CinéInfo se réserve le droit de :
              </p>
              <ul>
                <li>Modifier ou améliorer le site à tout moment</li>
                <li>Suspendre ou arrêter le service avec ou sans préavis</li>
                <li>Modifier les présentes conditions à tout moment</li>
              </ul>
              <p>
                Les utilisateurs seront notifiés des changements importants via email si possible.
              </p>
            </div>

            <div className="legal-subsection">
              <h2>7. Comportement Prohibé</h2>
              <p>
                Vous vous engagez à ne pas :
              </p>
              <ul>
                <li>Publier du contenu offensant, diffamatoire ou illégal</li>
                <li>Tenter de pirater ou endommager le site</li>
                <li>Utiliser le site pour du spam ou du phishing</li>
                <li>Violer les droits d'autrui</li>
                <li>Utiliser des bots ou scripts automatisés (sauf si autorisé)</li>
              </ul>
              <p>
                En cas de violation, CinéInfo peut suspendre votre compte sans préavis.
              </p>
            </div>

            <div className="legal-subsection">
              <h2>8. Liens Externes</h2>
              <p>
                Le site peut contenir des liens vers des sites externes. CinéInfo n'est pas responsable du contenu,
                de la disponibilité ou des pratiques de ces sites tiers.
              </p>
            </div>

            <div className="legal-subsection">
              <h2>9. Contact et Signalement</h2>
              <p>
                Pour toute question, réclamation ou signalement d'abus, veuillez nous contacter à :
              </p>
              <ul>
                <li>Email : contact@cineinfo.local</li>
                <li>Formulaire de contact : Disponible sur le site</li>
              </ul>
            </div>

            <div className="legal-subsection">
              <h2>10. Acceptation des Conditions</h2>
              <p>
                En utilisant ce site, vous acceptez pleinement les présentes conditions générales d'utilisation.
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.
              </p>
              <p className="highlight">
                <strong>Dernière mise à jour :</strong> 21 octobre 2025
              </p>
            </div>
          </section>

          {/* Politique de Confidentialité - Section Supplémentaire */}
          <section className="legal-section">
            <h1>Politique de Confidentialité</h1>

            <div className="legal-subsection">
              <h2>1. Responsable du Traitement</h2>
              <p>
                <strong>CinéInfo</strong><br />
                Contact : contact@cineinfo.local
              </p>
            </div>

            <div className="legal-subsection">
              <h2>2. Base Légale du Traitement</h2>
              <p>
                Le traitement de vos données personnelles est basé sur votre consentement explicite lors de l'inscription
                et est nécessaire pour fournir les services du site.
              </p>
            </div>

            <div className="legal-subsection">
              <h2>3. Durée de Conservation</h2>
              <p>
                Vos données personnelles sont conservées aussi longtemps que nécessaire pour fournir le service.
                Vous pouvez demander la suppression de votre compte et de vos données à tout moment.
              </p>
            </div>

            <div className="legal-subsection">
              <h2>4. Vos Droits</h2>
              <p>
                Conformément aux lois de protection des données (RGPD), vous avez le droit de :
              </p>
              <ul>
                <li>Accéder à vos données personnelles</li>
                <li>Corriger vos données</li>
                <li>Demander la suppression de vos données</li>
                <li>Exporter vos données</li>
                <li>Retirer votre consentement</li>
              </ul>
              <p>
                Pour exercer ces droits, veuillez nous contacter à : contact@cineinfo.local
              </p>
            </div>

            <div className="legal-subsection">
              <h2>5. Sécurité</h2>
              <p>
                Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données contre
                l'accès non autorisé, la perte ou la destruction.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
