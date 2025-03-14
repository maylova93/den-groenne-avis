import { useGet } from "../../hooks/useGet"; // 🔹 Custom hook til at hente data fra API
import { NavLink } from "react-router-dom"; // 🔹 NavLink bruges til navigation mellem kategorier
import styles from "./KategoriListe.module.scss"; // 🔹 Importerer styling til komponenten

export const KategoriListe = () => {
    // 🔹 Henter kategori-data fra API'et ved hjælp af useGet()
    const { data, error, isLoading } = useGet("http://localhost:4242/categories");

    console.log("Kategoridata:", data); // 🔹 Debugging: Logger data i konsollen for fejlfinding

    // 🔹 Viser en loader, hvis data stadig hentes
    if (isLoading) return <div className={styles.loader}></div>;

    // 🔹 Hvis der er en fejl ved hentning, vis en besked til brugeren
    if (error) return <p>Kunne ikke hente kategorier. Prøv igen senere.</p>;

    // 🔹 Hvis der ikke findes nogle kategorier, vis en besked
    if (!data?.data?.length) return <p>Ingen kategorier fundet.</p>;

    return (
        <section className={styles.kategoriListe}>
            {/* 🔹 Overskrift til kategorisektionen */}
            <header className={styles.header}>
                <h2 aria-label="Populære Kategorier">Populære Kategorier</h2>
            </header>

            {/* 🔹 Grid-layout til at vise kategorier */}
            <div className={styles.grid}>
                {data.data.slice(0, 6).map(({ id, slug, category_image, name }) => (
                    <NavLink to={`/category/${slug}`} key={id} className={styles.kategori}>
                        {/* 🔹 Viser kategoriens billede. Hvis der ikke er et billede, vises et fallback-billede */}
                        <img src={category_image || "/fallback-image.jpg"} alt={name} />
                        <div className={styles.overlay}>{name}</div> {/* 🔹 Viser kategoriens navn */}
                    </NavLink>
                ))}
            </div>
        </section>
    );
};
