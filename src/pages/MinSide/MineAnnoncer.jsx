import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext"; // Henter brugerens login-informationer
import { useNavigate } from "react-router-dom"; // Bruges til at navigere brugeren
import styles from "./MineAnnoncer.module.scss"; // Import af styling

export const MineAnnoncer = () => {
    const { userData } = useContext(UserContext); // Henter brugerdata fra context
    const navigate = useNavigate(); // Hook til navigation
    const [annoncer, setAnnoncer] = useState([]); // State til at gemme annoncer
    const [error, setError] = useState(null); // State til at gemme fejlbeskeder

    // useEffect henter brugerens annoncer, når komponenten indlæses
    useEffect(() => {
        // Tjekker om brugeren er logget ind
        if (!userData || !userData.access_token) {
            setError("Du skal være logget ind for at se dine annoncer.");
            return;
        }

        const fetchAnnoncer = async () => {
            try {
                // Henter annoncer for den specifikke bruger via API
                const response = await fetch(`http://localhost:4242/products?user_id=${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${userData.access_token}`, // Sender brugerens token for adgang
                    },
                });

                if (!response.ok) throw new Error("Kunne ikke hente annoncer.");
                
                const data = await response.json();
                setAnnoncer(data.data); // Opdaterer state med annoncerne
            } catch (err) {
                setError(err.message); // Opdaterer fejlbesked, hvis noget går galt
            }
        };

        fetchAnnoncer();
    }, [userData]); // useEffect afhænger af `userData`, så den kun kører ved ændringer i brugerdata

    // Funktion til at slette en annonce
    const handleDeleteAnnonce = async (annonceID) => {
        if (!window.confirm("Er du sikker på, at du vil slette denne annonce?")) return;

        try {
            // API-kald til at slette annoncen
            const response = await fetch(`http://localhost:4242/products/${annonceID}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${userData.access_token}`, // Sender brugerens token for at slette
                },
            });

            if (!response.ok) throw new Error("Kunne ikke slette annoncen.");

            // Opdaterer listen ved at fjerne den slettede annonce
            setAnnoncer(annoncer.filter((annonce) => annonce.id !== annonceID));
        } catch (err) {
            alert("Fejl ved sletning af annonce: " + err.message); // Viser fejlbesked til brugeren
        }
    };

    return (
        <section className={styles.mineAnnoncer}>
            <h2>Mine Annoncer</h2>
            
            {/* Viser fejlbesked, hvis der opstår fejl */}
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.annonceListe}>
                {/* Tjekker om der er nogen annoncer */}
                {annoncer.length > 0 ? (
                    annoncer.map((annonce) => (
                        <div key={annonce.id} className={styles.annonceCard}>
                            <div className={styles.annonceHeader}>
                                <h3>{annonce.name}</h3>
                                <span className={styles.pris}>Pris: {annonce.price} kr</span>
                            </div>
                            <div className={styles.annonceContent}>
                                <p>{annonce.description}</p>
                                <img src={annonce.image || annonce.imageUrl} alt={annonce.name} />
                            </div>

                            {/* Hvis annoncen har kommentarer, vis dem */}
                            {annonce.comments && annonce.comments.length > 0 && (
                                <div className={styles.commentsSection}>
                                    <h4>Kommentarer:</h4>
                                    <ul>
                                        {annonce.comments.map((comment) => (
                                            <li key={comment.id}>
                                                {comment.text}
                                                <button 
                                                    className={styles.deleteComment}
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                >
                                                    Fjern kommentar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className={styles.annonceActions}>
                                {/* Knappen navigerer til annonce-detaljer */}
                                <button onClick={() => navigate(`/annoncer/${annonce.id}`)}>Gå til annonce</button>
                                
                                {/* Knappen sletter annoncen */}
                                <button className={styles.deleteButton} onClick={() => handleDeleteAnnonce(annonce.id)}>
                                    Fjern annonce
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Ingen annoncer oprettet endnu.</p> // Besked hvis brugeren ikke har nogen annoncer
                )}
            </div>
        </section>
    );
};
