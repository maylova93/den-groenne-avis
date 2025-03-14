// Custom hook til at opdatere data via en PATCH-anmodning
export const usePatch = async (url, data) => {
    try {
        // Sender en PATCH-anmodning til API'et
        const response = await fetch(url, {
            method: "PATCH", // PATCH bruges til at opdatere specifikke felter i en ressource
            headers: { "Content-Type": "application/json" }, // Sikrer at serveren ved, at vi sender JSON
            body: JSON.stringify(data), // Konverterer data til JSON-format
        });

        // Hvis responsen ikke er OK (status 200-299), kaster vi en fejl
        if (!response.ok) {
            throw new Error("Kunne ikke opdatere data"); // Fejlbesked ved mislykket anmodning
        }

        return { ok: true }; // Returnerer succes, hvis PATCH-anmodningen lykkes
    } catch (error) {
        return { ok: false, error: error.message }; // Returnerer fejlbesked, hvis der opstår en fejl
    }
};
