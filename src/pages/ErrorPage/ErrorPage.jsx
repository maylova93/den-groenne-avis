import { useNavigate } from "react-router-dom";
import styles from "./errorpage.module.scss";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Ups, noget gik galt!</h1>
      <p className={styles.errorMessage}>
        Det ser ud til, at siden du leder efter, ikke findes, eller der opstod en uventet fejl. Vi beklager ulejligheden.
      </p>
      <button onClick={() => navigate("/")} className={styles.homeButton}>
        Tilbage til forsiden
      </button>
    </div>
  );
};