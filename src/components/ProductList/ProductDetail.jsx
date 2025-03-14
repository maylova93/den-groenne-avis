import { useParams, NavLink } from "react-router-dom"; // 🔹 Henter parametre fra URL'en og navigationslink
import { useGet } from "../../hooks/useGet"; // 🔹 Custom hook til at hente data fra API
import styles from "./ProductDetail.module.scss";
import { ContactSeller } from "../ContactSeller/ContactSeller"; // 🔹 Importerer komponent til kontakt med sælger

export const ProductDetail = () => {
    // 🔹 Henter "slug" fra URL'en, som bruges til at finde det rigtige produkt
    const { slug } = useParams();

    // 🔹 Henter produktdata fra API'et med det unikke slug
    const { data: productData, error, isLoading } = useGet(`http://localhost:4242/products/${slug}`);

    // 🔹 Henter liste over kategorier til sidemenuen
    const { data: categoriesData } = useGet("http://localhost:4242/categories");

    // 🔹 Viser en loading-tekst, mens data hentes
    if (isLoading) return <p>Indlæser produkt...</p>;

    // 🔹 Hvis der opstår en fejl, eller produktet ikke findes, vises en fejlbesked
    if (error || !productData?.data) return <p>Kunne ikke hente produktet.</p>;

    // 🔹 Gemmer produktdata i en variabel for nemmere adgang
    const product = productData.data;

    // 🔹 Gemmer kategorier i en liste. Hvis API'et ikke returnerer noget, bliver det en tom liste
    const categories = categoriesData?.data || [];

    return (
        <section className={styles.productDetail}>
            <div className={styles.container}>
                {/* 🔹 Sidebar med produktkategorier */}
                <aside className={styles.categoryList}>
                    <h2>Alle kategorier</h2>
                    <ul>
                        {/* 🔹 Mapper alle kategorier fra API'et og opretter links til hver kategori */}
                        {categories.map(({ id, slug, name }) => (
                            <li key={id}>
                                <NavLink
                                    to={`/category/${slug}`}
                                    className={({ isActive }) => isActive ? styles.activeCategory : ""}
                                >
                                    {name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* 🔹 Hovedindhold - viser produktinformation */}
                <article className={styles.productInfo}>
                    {/* 🔹 Viser produktets billede */}
                    <div className={styles.imageWrapper}>
                        <img src={product.image} alt={product.name} className={styles.productImage} />
                    </div>

                    {/* 🔹 Viser produktets navn, beskrivelse og pris */}
                    <h1 className={styles.productTitle}>{product.name}</h1>
                    <p className={styles.productDescription}>{product.description}</p>
                    <p className={styles.productPrice}>Pris: {product.price} kr</p>

                    {/* 🔹 Kontaktformular til at skrive til sælgeren */}
                    <ContactSeller productId={product.id} />
                </article>
            </div>
        </section>
    );
};
