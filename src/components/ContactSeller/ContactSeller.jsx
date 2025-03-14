import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext"; // 🔹 Importerer UserContext for at få adgang til brugerdata
import { usePost } from "../../hooks/usePost"; // 🔹 Custom hook til at sende API-anmodninger
import styles from "./ContactSeller.module.scss"; // 🔹 Importerer stilfil

// 🔹 Komponent til at kontakte en sælger
export const ContactSeller = ({ productId, sellerId }) => {
    // 🔹 Henter brugerdata fra Context for at tjekke, om brugeren er logget ind
    const { userData } = useContext(UserContext);

    // 🔹 State til at gemme kommentarer, ny kommentar-input og eventuelle fejl
    const [comments, setComments] = useState([]); 
    const [newComment, setNewComment] = useState(""); 
    const [error, setError] = useState("");

    // 🔹 Bruger custom hook `usePost` til at sende data til API'et
    const { postData, isLoading, error: postError } = usePost(`http://localhost:4242/comment/${productId}`);

    // 🔹 Funktion til at hente kommentarer fra API'et
    const fetchComments = async () => {
        if (!productId) return; // 🔹 Undgår at køre, hvis der ikke er et produkt
        try {
            const response = await fetch(`http://localhost:4242/comment/${productId}`);
            const result = await response.json();
            setComments(result.data || []); // 🔹 Opdaterer kommentar-listen med de hentede data
        } catch (err) {
            setError("Fejl ved hentning af kommentarer: " + err.message); // 🔹 Viser fejlmeddelelse ved problemer med API
        }
    };

    // 🔹 useEffect henter kommentarer, når komponenten indlæses eller når `productId` ændres
    useEffect(() => {
        fetchComments();
    }, [productId]);

    // 🔹 Funktion til at sende en ny kommentar
    const handleSubmit = async (e) => {
        e.preventDefault(); // 🔹 Forhindrer siden i at reloade

        // 🔹 Tjekker om brugeren er logget ind
        if (!userData) {
            setError("Du skal være logget ind for at skrive en kommentar.");
            return;
        }

        // 🔹 Sikrer at feltet ikke er tomt
        if (!newComment.trim()) {
            setError("Kommentar kan ikke være tom!");
            return;
        }

        // 🔹 Data der sendes til API'et
        const body = {
            comment: newComment,
            product_id: productId,
            user_id: userData.id,
            name: userData.firstName
        };

        const response = await postData(body); // 🔹 Sender data til API'et

        if (response.ok) {
            setNewComment(""); // 🔹 Rydder inputfeltet efter en vellykket besked
            setComments((prevComments) => [...prevComments, response.data]); // 🔹 Opdaterer UI med den nye kommentar
            fetchComments(); // 🔹 Henter opdaterede kommentarer fra API'et
        } else {
            setError(response.error); // 🔹 Viser fejlmeddelelse ved fejl
        }
    };

    // 🔹 Funktion til at slette en kommentar
    const handleDelete = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:4242/comment/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${userData.token}`, // 🔹 Tilføjer brugerens token for autorisation
                },
            });

            if (response.ok) {
                // 🔹 Fjerner kommentaren fra UI efter sletning
                setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
            } else {
                console.error("Kunne ikke slette kommentaren."); // 🔹 Logger fejl, hvis sletning mislykkes
            }
        } catch (err) {
            console.error("Fejl ved sletning af kommentar:", err); // 🔹 Viser fejlmeddelelse i konsollen
        }
    };

    return (
        <section className={styles.contactSeller}>
            <div className={styles.formWrapper}>
                <h2>Kontakt sælger</h2>
                
                {/* 🔹 Viser kommentarfelt, hvis brugeren er logget ind */}
                {userData ? (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <textarea
                            placeholder="Skriv en besked til sælger..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Sender..." : "Send"}
                        </button>
                    </form>
                ) : (
                    <p> Du skal være logget ind for at kommentere.</p>
                )}
                
                {/* 🔹 Viser eventuelle fejlmeddelelser */}
                {error && <p className={styles.error}>{error}</p>}
                {postError && <p className={styles.error}>⚠️ {postError}</p>}
            </div>

            {/* 🔹 Viser kommentarer */}
            <div className={styles.messages}>
                {comments.length === 0 ? (
                    <p>Ingen kommentarer endnu.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className={`${styles.message} ${comment.user_id === sellerId ? styles.seller : styles.buyer}`}>
                            <p><strong>{comment.name || "Ukendt"}</strong> - {new Date(comment.createdAt).toLocaleString()}</p>
                            <p>{comment.comment}</p>

                            {/* 🔹 Viser sletteknap, hvis kommentaren er fra den aktuelle bruger */}
                            {userData && userData.id === comment.user_id && (
                                <button className={styles.deleteBtn} onClick={() => handleDelete(comment.id)}>
                                    Slet kommentar
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};
