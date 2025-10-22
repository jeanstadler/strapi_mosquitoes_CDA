import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { isAuthenticated } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/admin/login");
        }
    }, [navigate]);

    const handleImport = async () => {
        setLoading(true);
        setMessage("L'importation des films et acteurs est en cours...");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/movies/sync-french`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Échec de la mise à jour de la base de données.");
            }

            const data = await response.json();
            setMessage(`✅ Mise à jour terminée : ${data.message || "Base de données actualisée avec succès."}`);
        } catch (error) {
            console.error(error);
            setMessage("❌ Une erreur est survenue lors de l'importation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-dashboard">
            <Header showBackButton={true} pageTitle="Dashboard administrateur"></Header>
            <main className="admin-content">
                <h1 className="detail-title">Actualisation de la base de données</h1>

                <p className="admin-description">
                    Cette action permet de mettre à jour la base de données à partir de l’API TMDB.
                    <br />
                    Les nouveaux films et acteurs seront importés automatiquement.
                </p>

                <button
                    onClick={handleImport}
                    disabled={loading}
                    className="admin-import-button"
                >
                    {loading ? "Import en cours..." : "Lancer l'import TMDB"}
                </button>

                {loading && <Loader />}

                {message && (
                    <p
                        className={`admin-message ${message.startsWith("✅")
                            ? "success"
                            : message.startsWith("❌")
                                ? "error"
                                : "info"
                            }`}
                    >
                        {message}
                    </p>
                )}
            </main>
            <Footer />
        </div>
    )
}