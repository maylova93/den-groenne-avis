import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // 🔹 Bruger NavLink til at navigere til produktsiden
import styles from "./ProductList.module.scss";

export const ProductList = () => {
    // 🔹 useState hook: Opretter state til produkter og fejlbesked
    const [products, setProducts] = useState([]); // Gemmer listen af produkter
    const [error, setError] = useState(null); // Gemmer en fejlbesked, hvis noget går galt

    // 🔹 useEffect hook: Kaldes, når komponenten indlæses
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // 🔹 Fetch API: Henter produktdata fra backend
                const response = await fetch("http://localhost:4242/products");
                const data = await response.json(); // Konverterer respons til JSON-format
                
                // 🔹 Tjekker om API-kaldet var succesfuldt, og at `data.data` er en liste
                if (data.message === "Success" && Array.isArray(data.data)) {
                    // 🔹 Tilfældig sortering af produkter, så de vises i en ny rækkefølge hver gang
                    const shuffled = data.data.sort(() => 0.5 - Math.random());
                    setProducts(shuffled.slice(0, 6)); // Gemmer kun de første 6 produkter i state
                }
            } catch (error) {
                // 🔹 Hvis noget går galt, gemmes en fejlbesked i state
                setError("Fejl ved hentning af produkter. Prøv igen senere.");
            }
        };

        fetchProducts(); // Kalder funktionen for at hente produkterne
    }, []); // Tom array [] betyder, at useEffect kun kører én gang, når komponenten indlæses

    return (
        <section className={styles.productList}>
            <div className={styles.header}>
                <h2>Udvalgte Produkter</h2>
            </div>

            {/* 🔹 Hvis der opstår en fejl, vises en fejlbesked på skærmen */}
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.grid}>
                {/* 🔹 Gennemgår produktlisten og opretter et link til hver produktside */}
                {products.map((product) => (
                    <NavLink 
                        to={`/product/${product.slug}`} // 🔹 Dynamisk link til produktets detaljer
                        key={product.id} // 🔹 Hvert element skal have en unik "key" for React
                        className={styles.product}
                    >
                        <div className={styles.imageContainer}>
                            <img src={product.image} alt={product.name} />
                            <div className={styles.overlay}>
                                <span>{product.name}</span> {/* 🔹 Viser produktets navn */}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </section>
    );
};
