import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router hook til navigation
import { GreenLine } from "../../components/GreenLine/GreenLine"; // Genbrugelig visuel komponent
import styles from "./SignUpPage.module.scss"; // Import af SCSS-styling

export const SignUpPage = () => {
    const navigate = useNavigate(); // Bruges til at navigere brugeren efter registrering

    // State til at gemme brugerens input
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        zipcode: "",
    });

    const [error, setError] = useState(""); // Gemmer eventuelle fejlbeskeder
    const [isLoading, setIsLoading] = useState(false); // Håndterer loading state ved oprettelse
    const [termsAccepted, setTermsAccepted] = useState(false); // Tjekker om brugeren har accepteret vilkår

    // Funktion der opdaterer state, når brugeren indtaster data i felterne
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Automatisk login efter brugeroprettelse
    const loginAfterSignup = async () => {
        try {
            const loginResponse = await fetch("http://localhost:4242/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email: formData.email, password: formData.password }).toString(),
            });

            if (!loginResponse.ok) throw new Error("Login fejlede efter oprettelse");

            const userData = await loginResponse.json();
            sessionStorage.setItem("token", userData.token); // Gemmer JWT-token i sessionStorage

            console.log("✅ Bruger logget ind:", userData);
            navigate("/minside"); // Navigerer til Min Side
        } catch (err) {
            console.error("❌ Fejl ved login efter signup:", err.message);
            navigate("/login"); // Hvis login fejler, send brugeren til login-siden
        }
    };

    // Funktion der håndterer oprettelse af ny bruger
    const handleSignup = async (e) => {
        e.preventDefault();

        // Brugeren skal acceptere betingelserne for at fortsætte
        if (!termsAccepted) {
            setError("Du skal acceptere betingelserne for at oprette en konto.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:4242/users", {
                method: "POST",
                body: new URLSearchParams(formData).toString(),
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            if (!response.ok) throw new Error("Kunne ikke oprette bruger");

            console.log("✅ Signup response:", formData);

            // Når brugeren er oprettet, logges de automatisk ind
            loginAfterSignup();
        } catch (err) {
            setError(err.message);
            console.log("❌ Server returnerede fejl:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.pageWrapper}>
            {/* Tilføjer en grøn linje for at matche designet */}
            <GreenLine />

            {/* Formular til oprettelse af konto */}
            <section className={styles.signupContainer} aria-labelledby="signup-heading">
                <h2 id="signup-heading">Opret en konto</h2>

                <form onSubmit={handleSignup} className={styles.signupForm}>
                    <fieldset>
                        {/* Inputfelter til brugeroplysninger */}
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" placeholder="Din email..." required onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" placeholder="Dit password..." required onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="firstname">Fornavn</label>
                            <input id="firstname" name="firstname" type="text" placeholder="Dit fornavn..." required onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="lastname">Efternavn</label>
                            <input id="lastname" name="lastname" type="text" placeholder="Dit efternavn..." required onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="address">Adresse</label>
                            <input id="address" name="address" type="text" placeholder="Din adresse..." required onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="city">By</label>
                            <input id="city" name="city" type="text" placeholder="Din by..." required onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="zipcode">Postnummer</label>
                            <input id="zipcode" name="zipcode" type="text" placeholder="Dit postnummer..." required onChange={handleChange} />
                        </div>

                        {/* Link til login, hvis brugeren allerede har en konto */}
                        <p className={styles.loginRedirect}>
                            Har du allerede en konto hos os? Klik
                            <button type="button" className={styles.loginLink} onClick={() => navigate("/login")}>
                                her
                            </button>
                            for at vende tilbage til login.
                        </p>

                        {/* Tjekboks til accept af betingelser */}
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="terms" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} required />
                            <label htmlFor="terms">
                                Jeg har læst og forstået <a href="/terms">de gældende betingelser</a> for oprettelse af kundekonto og brug af denne side.
                            </label>
                        </div>

                        {/* Fejlbesked hvis noget går galt */}
                        {error && <p className={styles.error}>{error}</p>}

                        {/* Knap til at indsende formularen */}
                        <div className={styles.buttonWrapper}>
                            <button type="submit" className={styles.signupButton} disabled={isLoading}>
                                {isLoading ? "Opretter konto..." : "Opret"}
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </main>
    );
};
