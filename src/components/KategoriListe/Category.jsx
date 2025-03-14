import { useParams, NavLink } from "react-router-dom";
import { useState } from "react";
import { useGet } from "../../hooks/useGet"; // Custom hook til API-kald
import styles from "./Category.module.scss";

export const Category = () => {
    // Henter kategori fra URL (f.eks. "/category/all" eller "/category/elektronik")
    const { categorySlug } = useParams();

    // Tjekker om brugeren har valgt "Alle produkter"
    const isAllProducts = categorySlug === "all";

    // Henter produkter baseret på kategori eller alle produkter
    const { data: productsData, error, isLoading } = useGet(
        isAllProducts 
            ? "http://localhost:4242/products" // API-kald for alle produkter
            : `http://localhost:4242/products/category/${categorySlug}` // API-kald for en bestemt kategori
    );

    // Henter alle kategorier fra API'et
    const { data: categoriesData } = useGet("http://localhost:4242/categories");

    // **Pagination setup**
    const [page, setPage] = useState(1); // Sætter start-side til 1
    const productsPerPage = 9; // Viser 9 produkter pr. side

    // Viser en loading-besked, hvis API'et er langsomt
    if (isLoading) return <p>Indlæser produkter...</p>;

    // Viser en fejlbesked, hvis der er problemer med API-kaldet
    if (error || !productsData?.data) return <p>Kunne ikke hente produkter.</p>;

    // Henter produkter fra API'et
    const products = productsData.data;
    
    // Henter kategorier eller viser en tom liste, hvis der ikke er nogen
    const categories = categoriesData?.data || [];

    // Beregner det **totale antal sider**
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Håndtering af side-skift
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <section className={styles.category}>
            <div className={styles.container}>

                {/* Sidebar med kategorier */}
                <aside className={styles.categoryList}>
                    <h2>Alle kategorier</h2>
                    <ul>
                        {/* "Alle produkter" kategori */}
                        <li>
                            <NavLink to="/category/all" 
                                className={({ isActive }) => isActive ? styles.activeCategory : ""}>
                                Alle produkter
                            </NavLink>
                        </li>

                        {/* Dynamisk visning af kategorier fra API */}
                        {categories.map(({ id, slug, name }) => (
                            <li key={id}>
                                <NavLink to={`/category/${slug}`} 
                                    className={({ isActive }) => isActive ? styles.activeCategory : ""}>
                                    {name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Produktvisning */}
                <div className={styles.productGrid}>
                    <div className={styles.grid}>
                        {products
                            .slice((page - 1) * productsPerPage, page * productsPerPage) // Viser kun produkter på den aktuelle side
                            .map(({ id, slug, image, name, description, price }) => (
                                <NavLink to={`/product/${slug}`} key={id} className={styles.product}>
                                    <div className={styles.borderWrapper}>
                                        <div className={styles.imageContainer}>
                                            <img src={image} alt={name} />
                                            <div className={styles.overlay}>
                                                <span>Pris: {price} kr</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3>{name}</h3>
                                    <p className={styles.description}>{description}</p>
                                </NavLink>
                        ))}
                    </div>

                    {/* **Pagination (Side-navigation)** */}
                    <div className={styles.pagination}>
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                            Forrige side
                        </button>
                        <span>Side {page} af {totalPages}</span>
                        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                            Næste side
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
