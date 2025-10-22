import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { setToken, isAuthenticated } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/local`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (data.jwt) {
                localStorage.setItem("jwt", data.jwt);
                navigate("/admin/dashboard");
            } else {
                setError("Identifiants incorrects.");
            }
        } catch (err) {
            console.error(err);
            setError("Une erreur est survenue.");
        }
    };

    return (
        <div className="admin-login-page">
            <Header showBackButton={true} pageTitle="Connexion à un compte administrateur"></Header>
            <main>
                <section className="login-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="username">Identifiant</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Votre identifiant"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Votre mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

                        <button className="login-button" type="submit">Se connecter</button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    )
}