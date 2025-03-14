import { useContext } from "react";
import { UserContext } from "../../context/UserContext"; // Henter brugerens data fra global context
import { useNavigate } from "react-router-dom"; // Bruges til at navigere mellem sider
import { postLogin } from "../../hooks/postLogin"; // Funktion til at håndtere login
import { Donation } from '../../components/Donation/Donation'; // Komponent der viser donationer
import { GreenLine } from "../../components/GreenLine/GreenLine"; // Visuel linje til layout
import styles from "./LoginPage.module.scss";

import emailIcon from "../../assets/images/email.png";
import passwordIcon from "../../assets/images/password.png";

export const LoginPage = () => {
    const { setUserData } = useContext(UserContext); // Henter funktionen til at opdatere brugerdata
    const navigate = useNavigate(); // Funktion til navigation

    // Håndterer login, sender data til backend og navigerer brugeren videre ved succes
    const handleLogin = async (e) => {
        postLogin(e, (data) => {
            setUserData(data); // Gemmer brugerdata i global context
            navigate("/min-side"); // Navigerer til Min Side efter login
        }, navigate);
    };

    return (
        <main className={styles.pageWrapper}>
            {/* Tilføjer en grøn linje for at matche designet */}
            <div className={styles.greenLineWrapper}>
                <GreenLine />
            </div>

            {/* Sektion til login-formular */}
            <section className={styles.loginContainer} aria-labelledby="login-heading">
                <h2 id="login-heading">Velkommen tilbage</h2>

                {/* Formular til login */}
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <fieldset>
                        {/* Inputfelt til e-mail */}
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <div className={styles.inputWrapper}>
                                <img src={emailIcon} alt="Email ikon" className={styles.inputIcon} />
                                <input id="email" name="email" type="email" placeholder="Din email..." required />
                            </div>
                        </div>

                        {/* Inputfelt til password */}
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.inputWrapper}>
                                <img src={passwordIcon} alt="Password ikon" className={styles.inputIcon} />
                                <input id="password" name="password" type="password" placeholder="Dit password..." required />
                            </div>
                        </div>

                        {/* Link til registreringssiden, hvis brugeren ikke har en konto */}
                        <p className={styles.signupText}>
                            Har du ikke allerede en konto?
                            <button type="button" className={styles.signupButton} onClick={() => navigate("/signup")}>klik her</button> for at gå til sign up.
                        </p>

                        {/* Login-knap */}
                        <div className={styles.buttonWrapper}>
                            <button type="submit" className={styles.loginButton}>Login</button>
                        </div>
                    </fieldset>
                </form>
            </section>

            {/* Viser donationer efter login-sektionen */}
            <section className={styles.donationContainer}>
                <Donation />
            </section>
        </main>
    );
};
