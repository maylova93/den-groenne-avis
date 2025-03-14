import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                
                {/* Nyhedsbrev */}
                <section className={styles.newsletter}>
                    <h2>Nyhedsbrev</h2>
                    <p>
                        Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev
                        og få de seneste klimaopdateringer direkte i din indbakke.
                    </p>
                    <form className={styles.newsletterForm}>
                        <input type="email" placeholder="Indtast din e-mail" required />
                        <button type="submit">Tilmeld</button>
                    </form>
                </section>

                {/* Kontaktoplysninger */}
                <section className={styles.contact}>
                    <h2>Kontakt</h2>
                    <address>
                        Redningen 32 <br />
                        2210 Vinterby Øster <br />
                        <a href="tel:+4588229422">+45 88229422</a> <br />
                        <a href="mailto:dga@info.dk">dga@info.dk</a>
                    </address>
                </section>

                {/* FN's verdensmål */}
                <section className={styles.sdg}>
                    <h2>FN´s Verdensmål</h2>
                    <p>
                        Vi støtter på organisatorisk plan op om FN´s verdensmål
                        og har derfor besluttet at en del af overskuddet går
                        direkte til verdensmål nr. 13; Klimahandling.
                    </p>
                    <a href="https://www.verdensmaalene.dk/" target="_blank" rel="noopener noreferrer" className={styles.sdgLink}>
                        Læs mere om verdensmålene her
                    </a>
                </section>

            </div>
        </footer>
    );
};
