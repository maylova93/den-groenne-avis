import { NavLink, useNavigate } from 'react-router-dom'; // 🔹 Bruger NavLink til navigation og useNavigate til at skifte side
import { useContext } from 'react'; // 🔹 Bruger useContext til at få adgang til brugerens login-status
import { useGet } from "../../hooks/useGet"; // 🔹 Custom hook til at hente data fra API
import { UserContext } from "../../context/UserContext"; // 🔹 Kontekst for brugerdata
import style from './Nav.module.scss'; // 🔹 Importerer styling

// 🔹 Importerer billeder til ikoner
import infoIcon from '../../assets/images/info-squared.png';
import accountIcon from '../../assets/images/test-account.png';
import messageIcon from '../../assets/images/urgent-message.png';

export const Nav = () => {
    // 🔹 Henter brugerdata og logout-funktion fra UserContext
    const { userData, logout } = useContext(UserContext);

    // 🔹 Henter kategorier fra API'et
    const { data: categoriesData, error, isLoading } = useGet("http://localhost:4242/categories");

    // 🔹 useNavigate bruges til at skifte side
    const navigate = useNavigate();

    // 🔹 Håndterer ændring af kategori og navigerer til den valgte kategori
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === "all") {
            navigate(`/category/all`); // 🔹 Hvis "Alle produkter" vælges, går vi til siden med alle produkter
        } else if (selectedCategory) {
            navigate(`/category/${selectedCategory}`); // 🔹 Navigerer til den valgte kategori
        }
    };

    // 🔹 Funktion til at logge ud og derefter navigere til forsiden
    const handleLogout = () => {
        logout();  
        navigate("/"); // 🔹 Efter logout sendes brugeren tilbage til forsiden
    };

    return (
        <header className={style.header}>
            <nav className={style.nav}>
                {/* 🔹 Logo med link til forsiden */}
                <NavLink to="/" className={style.logo}>
                    <h1 className={style.logoText}>
                        <span className={style.greenText}>Den Grønne</span>
                        <span className={style.whiteBox}>Avis</span>
                    </h1>
                </NavLink>

                <div className={style.navActions}>
                    {/* 🔹 Dropdown til at vælge kategori */}
                    <select className={style.categorySelect} onChange={handleCategoryChange}>
                        <option value="">Vælg kategori</option>
                        <option value="all">Alle produkter</option>

                        {/* 🔹 Viser "Indlæser" hvis data hentes, eller en fejl hvis noget gik galt */}
                        {isLoading ? (
                            <option>Indlæser...</option>
                        ) : error ? (
                            <option>Kunne ikke hente kategorier</option>
                        ) : (
                            // 🔹 Mapper alle kategorier fra API'et til dropdown-listen
                            categoriesData?.data.map(({ slug, name }) => (
                                <option key={slug} value={slug}>{name}</option>
                            ))
                        )}
                    </select>

                    {/* 🔹 Link til at oprette en annonce */}
                    <NavLink to="/annonce" className={style.createAd}>
                        Opret annonce
                    </NavLink>

                    <div className={style.icons}>
                        {/* 🔹 Ikoner for beskeder og info */}
                        <img src={messageIcon} alt="Beskeder" />
                        <img src={infoIcon} alt="Info" />

                        {/* 🔹 Hvis brugeren er logget ind, vises brugerikon og logout-knap */}
                        {userData ? (
                            <>
                                <NavLink to="/min-side">
                                    <img src={accountIcon} alt="Bruger" />
                                </NavLink>
                                <button onClick={handleLogout} className={style.logoutButton}>
                                    Log ud
                                </button>
                            </>
                        ) : (
                            // 🔹 Hvis brugeren ikke er logget ind, vises login-ikonet
                            <NavLink to="/login">
                                <img src={accountIcon} alt="Bruger" />
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};
