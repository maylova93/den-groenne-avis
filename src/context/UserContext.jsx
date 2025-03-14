import { createContext, useState, useEffect } from "react";

// 🔹 Opretter en kontekst til brugerdata
export const UserContext = createContext();

// 🔹 Provider-komponent, der gør brugerdata tilgængelig i hele appen
export const UserContextProvider = ({ children }) => {
  // 🔹 useState til at håndtere brugerdata, forsøger at hente tidligere gemte data fra sessionStorage
  const [userData, setUserData] = useState(() => {
    const storedUser = sessionStorage.getItem("user"); // 🔹 Henter brugerdata fra sessionStorage
    return storedUser ? JSON.parse(storedUser) : null; // 🔹 Hvis data findes, parse JSON, ellers returner `null`
  });

  // 🔹 useEffect til at opdatere sessionStorage, hver gang userData ændres
  useEffect(() => {
    if (userData) {
      console.log("🔹 Opdateret brugerdata:", userData); // 🔹 Debugging - viser brugerdata i konsollen
      sessionStorage.setItem("user", JSON.stringify(userData)); // 🔹 Gemmer brugerdata i sessionStorage
    } else {
      sessionStorage.removeItem("user"); // 🔹 Hvis `userData` er `null`, fjernes det fra sessionStorage
    }
  }, [userData]); // 🔹 Kører hver gang `userData` ændres

  // 🔹 Funktion til at logge brugeren ud
  const logout = (navigate) => {
    sessionStorage.removeItem("user"); // 🔹 Fjerner brugerdata fra sessionStorage
    setUserData(null); // 🔹 Opdaterer `userData` til `null`, så appen registrerer at brugeren er logget ud
    if (navigate) navigate("/"); // 🔹 Hvis der sendes en `navigate`-funktion, send brugeren til forsiden
  };

  return (
    // 🔹 Gør `userData`, `setUserData` og `logout` tilgængelige for resten af applikationen
    <UserContext.Provider value={{ userData, setUserData, logout }}>
      {children} {/* 🔹 Viser child-komponenterne */}
    </UserContext.Provider>
  );
};
