import { useState } from "react";

// Custom hook til at håndtere POST-anmodninger til API
export const usePost = (url) => {
  // State til at holde styr på loading-status og fejlbeskeder
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Funktion der sender data til API'et
  const postData = async (body) => {
    setIsLoading(true);  // Starter loading-state
    setError(null);  // Nulstiller fejlbeskeden

    const token = sessionStorage.getItem("token"); // Henter JWT-token fra sessionStorage

    // Konverterer objekt til x-www-form-urlencoded format
    const formBody = new URLSearchParams(body).toString();

    try {
      // Sender en POST-anmodning til API'et
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Sikrer korrekt dataformat
          "Authorization": `Bearer ${token}`, // Tilføjer token for autentificering
        },
        body: formBody, // Sender data som x-www-form-urlencoded
      });

      const data = await response.json(); // Læser JSON-svaret fra serveren

      if (!response.ok) {
        throw new Error(data.message || "Fejl ved POST!"); // Håndterer API-fejl
      }

      return { ok: true, data }; // Returnerer data, hvis alt gik godt
    } catch (err) {
      setError(err.message); // Gemmer fejlbeskeden
      return { ok: false, error: err.message }; // Returnerer fejl
    } finally {
      setIsLoading(false); // Stopper loading-state uanset resultat
    }
  };

  return { postData, isLoading, error }; // Returnerer funktion + state
};
