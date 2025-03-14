import styles from "./HeroSection.module.scss";
import bannerImage from "../../assets/images/avis.png"; 

export const HeroSection = () => {
    return (
        <section className={styles.heroSection}>
            <div className={styles.header}>
            </div>
            <div className={styles.bannerContainer}>
                <img src={bannerImage} alt="Den Grønne Avis" className={styles.bannerImage} />
                <div className={styles.overlay}>
                    <h2>Den Grønne Avis</h2>
                    <p>
                        Vi går forrest i kampen om klimaet ved at give 2 kr. til
                        klima venlige formål, hver gang du handler brugt på Den Grønne Avis.
                    </p>
                </div>
            </div>
        </section>
    );
};
