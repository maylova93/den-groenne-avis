import { useEffect, useState } from "react";

//  Custom hook til at hente data fra API'et
export function useGet(url, token) {
  //  State til at gemme API-data, fejl og loading-status
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); //  Indikerer, at data er ved at blive hentet

    //  Hvis der er en token, tilføjes den i headers
    const options = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    fetch(url, options) //  Henter data fra den angivne URL
      .then((res) => res.json()) //  Konverterer responsen til JSON
      .then(setData) //  Opdaterer data-state med den modtagne respons
      .catch(setError) //  Hvis der opstår fejl, gemmes den i `error`-state
      .finally(() => setIsLoading(false)); //  Når hentningen er færdig, sættes `isLoading` til false
  }, [url, token]); //  useEffect afhænger af `url` og `token`, så den kører igen ved ændringer

  //  Returnerer API-data, fejl og loading-status
  return { data, error, isLoading };
}
