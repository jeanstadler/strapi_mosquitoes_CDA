import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AdminLogin() {
    return (
    <div className="admin_login_page">
        <Header showBackButton={true} pageTitle="Connexion à un compte administrateur"></Header>
        <main className="admin-login-page">
            <section className="login-container">
                <form className="login-form">
                    <h1>Connexion Administrateur</h1>

                    <label htmlFor="username">Identifiant</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Votre identifiant"
                        required
                    />

                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Votre mot de passe"
                        required
                    />

                    <button type="submit">Se connecter</button>
                </form>
            </section>
        </main>
        <Footer />
    </div>
    )
}