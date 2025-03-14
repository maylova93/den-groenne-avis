import { useState } from "react"; // Importerer useState til håndtering af faneskift
import { GreenLine } from "../../components/GreenLine/GreenLine"; // Importerer en grøn linje som design-element
import { MineAnnoncer } from "../../pages/MinSide/MineAnnoncer"; // Importerer komponenten der viser brugerens annoncer
import styles from "./MinSide.module.scss"; // Importerer styling

export const MinSide = () => {
    const [activeTab, setActiveTab] = useState("profile"); // State til at styre aktiv fane ("profile" eller "ads")

    return (
        <div className={styles.minSideContainer}>
            <GreenLine className={styles.greenLineContainer} /> {/* Dekorativ linje */}

            {/* Knapper til at skifte mellem "Min Profil" og "Mine Annoncer" */}
            <div className={styles.tabContainer}>
                <button
                    className={activeTab === "profile" ? styles.activeTab : ""}
                    onClick={() => setActiveTab("profile")} // Skifter til profil-sektionen
                >
                    Min Profil
                </button>
                <button
                    className={activeTab === "ads" ? styles.activeTab : ""}
                    onClick={() => setActiveTab("ads")} // Skifter til Mine Annoncer-sektionen
                >
                    Mine Annoncer
                </button>
            </div>

            {/* Viser profil-sektionen, hvis "profile" er valgt */}
            {activeTab === "profile" && (
                <div className={styles.profileSection}>
                    <div className={styles.formContainer}>
                        <div className={styles.leftSection}>
                            <form>
                                <label>Fornavn</label>
                                <input type="text" placeholder="Dit navn..." readOnly />

                                <label>Efternavn</label>
                                <input type="text" placeholder="Dit efternavn..." readOnly />

                                <label>Adresse</label>
                                <input type="text" placeholder="Din adresse..." readOnly />

                                <label>Postnummer</label>
                                <input type="text" placeholder="Dit postnummer..." readOnly />

                                <label>Telefon</label>
                                <input type="text" placeholder="Dit telefonnummer..." readOnly />

                                <label>Email</label>
                                <input type="email" placeholder="Din emailadresse..." readOnly />
                            </form>
                        </div>

                        {/* Sektion med nyhedsbrev og notifikationsindstillinger */}
                        <div className={styles.rightSection}>
                            <div className={styles.checkboxContainer}>
                                <input type="checkbox" disabled />
                                <label>
                                    Jeg ønsker at modtage nyheder om klimaindsatsen, gode tilbud, eksklusive deals og lignende promoverings-mails fra Den Grønne Avis og samarbejdspartnere.
                                </label>
                            </div>

                            <div className={styles.checkboxContainer}>
                                <input type="checkbox" disabled />
                                <label>
                                    Jeg ønsker at modtage notifikationer i form af emails, når der sker en opdatering på en af mine annoncer, eller jeg modtager en ny henvendelse.
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Knapper til at slette eller gemme profilændringer (deaktiveret for nu) */}
                    <div className={styles.buttonContainer}>
                        <button className={styles.deleteButton} disabled>Slet Profil</button>
                        <button className={styles.saveButton} disabled>Gem ændringer</button>
                    </div>
                </div>
            )}

            {/* Viser brugerens annoncer, hvis "ads" er valgt */}
            {activeTab === "ads" && <MineAnnoncer />}
        </div>
    );
};
