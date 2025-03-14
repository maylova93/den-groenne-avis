import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import { GreenLine } from "../../components/GreenLine/GreenLine";
import { UserContext } from "../../context/UserContext"; 
import styles from "./AnnoncePage.module.scss";

export const AnnoncePage = () => {
    const { userData, setUserData } = useContext(UserContext); // Henter brugerdata fra context
    const navigate = useNavigate();

    // Tjekker, om brugerdata er gemt i sessionStorage og opdaterer konteksten
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (!userData || !userData.access_token) {
                setUserData(parsedUser);
            }
        }
    }, [userData, setUserData]);

    // Henter kategorier fra backend
    const { data: categoriesData, error: categoryError, isLoading: categoryLoading } = useGet("http://localhost:4242/categories");

    // State til formularfelter
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        imageUrl: "",
        price: "",
    });

    // State til håndtering af fejl, succes og loading
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false); 

    // Opdaterer formularens state, når brugeren skriver i inputfelterne
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Håndterer formularindsendelse og sender data til backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);
    
        // Tjekker om brugeren er logget ind
        if (!userData || !userData.access_token) {
            setError("Fejl: Du skal være logget ind for at oprette en annonce.");
            setLoading(false);
            return;
        }
    
        // Validerer billed-URL længde
        if (formData.imageUrl.length > 255) {
            setError("Fejl: Billed-URL er for lang (maks 255 tegn).");
            setLoading(false);
            return;
        }
    
        // Opretter et objekt med annonce-data
        const payload = {
            name: formData.title,
            description: formData.description,
            image: formData.imageUrl,
            price: Number(formData.price),
            category_id: Number(formData.category),
            user_id: userData.id, // Sikrer at annoncen tilhører den loggede bruger
        };
    
        try {
            // Sender data til backend
            const response = await fetch("http://localhost:4242/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userData.access_token}`,
                },
                body: JSON.stringify(payload),
            });
    
            // Håndterer fejl fra serveren
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Kunne ikke oprette annonce.");
            }
    
            const data = await response.json();

            // Viser succesbesked og nulstiller formular
            setSuccess("Annonce oprettet med succes!");
            setFormData({ title: "", category: "", description: "", imageUrl: "", price: "" });

            // Navigerer brugeren til "Min Side" med den nye annonce
            navigate("/min-side", { state: { newAnnonce: data } });
    
        } catch (err) {
            setError("Fejl ved oprettelse af annonce: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.annoncePage}>
            <GreenLine />
            <h1>Opret ny annonce</h1>
            <p className={styles.subtext}>
                Her kan du oprette en ny annonce.<br />
                Du har mulighed for at slette dine annoncer igen under "Min konto".
            </p>

            {/* Viser fejl- eller succesbesked */}
            {error && <p className={styles.message} style={{ color: "red" }}>{error}</p>}
            {success && <p className={styles.message} style={{ color: "green" }}>{success}</p>}

            {/* Formular til oprettelse af annonce */}
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Titel</label>
                <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="Titel på dit produkt..." 
                    required 
                />

                <label>Kategori</label>
                <div className={styles.selectContainer}>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Vælg kategori</option>
                        {categoryLoading ? (
                            <option>Indlæser...</option>
                        ) : categoryError ? (
                            <option>Kunne ikke hente kategorier</option>
                        ) : (
                            categoriesData?.data.map(({ id, name }) => (
                                <option key={id} value={id}>{name}</option>
                            ))
                        )}
                    </select>
                </div>

                <label>Annonce tekst</label>
                <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Beskrivelse af produktet..." 
                    required 
                />

                <label>URL til billede</label>
                <input 
                    type="text" 
                    name="imageUrl" 
                    value={formData.imageUrl} 
                    onChange={handleChange} 
                    placeholder="Indsæt billede URL her..." 
                    required 
                />

                <label>Pris</label>
                <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    placeholder="Pris..." 
                    required 
                />

                <div className={styles.buttonContainer}>
                    <button type="submit" disabled={loading}>
                        {loading ? "Opretter..." : "Opret"
                    }</button>
                </div>
            </form>
        </section>
    );
};
