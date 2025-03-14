import styles from "./Donation.module.scss";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";

export const Donation = () => {
    return (
        <section className={styles.donationSection}>
            <div className={styles.header}></div> {/* Kun grøn linje, ingen tekst */}
            <div className={styles.donationGrid}>
                <article className={styles.donationCard} style={{ backgroundImage: `url(${image2})` }}>
                    <div className={styles.overlay}>
                        <div className={styles.textContainer}>
                            <h3>Donationer til Dato</h3>
                            <p>Sammen med dig har vi siden starten indsamlet:</p>
                        </div>
                        <div className={styles.amountContainer}>
                            <strong className={styles.amount}>452.231,50 kr</strong>
                        </div>
                        <div className={styles.thanksContainer}>
                            <p className={styles.thanks}>Tak fordi du handler brugt med omtanke for klimaet.</p>
                        </div>
                    </div>
                </article>
                <article className={styles.donationCard} style={{ backgroundImage: `url(${image3})` }}>
                    <div className={styles.overlay}>
                        <div className={styles.textContainer}>
                            <h3>Donationer i år</h3>
                            <p>Sammen med dig har vi i år indsamlet:</p>
                        </div>
                        <div className={styles.amountContainer}>
                            <strong className={styles.amount}>112.452,75 kr</strong>
                        </div>
                        <div className={styles.thanksContainer}>
                            <p className={styles.thanks}>Tak fordi du handler brugt, med omtanke for jorden.</p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};
