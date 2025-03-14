export const postLogin = async (event, setUserData, navigate) => {
  event.preventDefault(); // 🔹 Forhindrer standard opførsel af formularen (siden genindlæses ikke)

  //  Opretter en `URLSearchParams` objekt til at sende form-data korrekt
  const body = new URLSearchParams();
  body.append("username", event.target.email.value); //  Henter email fra inputfeltet
  body.append("password", event.target.password.value); //  Henter password fra inputfeltet

  //  Konfigurerer fetch-anmodningen med HTTP-metoden POST og nødvendige headers
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // Indstiller content-type for at matche backend-forventning
    body: body, //  Sender form-data som request body
  };

  try {
    //  Sender anmodningen til backend API for at logge brugeren ind
    const response = await fetch("http://localhost:4242/login", options);
    const data = await response.json(); //  Konverterer respons til JSON

    console.log("✅ Login response:", data); //  Debugging - viser serverens svar i konsollen

    // 🔥 Tjek om API'et returnerer `access_token`
    if (data?.data?.access_token) { 
      const userWithToken = {
        ...data.data.user, //  Kopierer brugerdata
        access_token: data.data.access_token, // 🔥 Tilføjer access token
      };

      setUserData(userWithToken); //  Opdaterer brugerdata i `UserContext`
      sessionStorage.setItem("user", JSON.stringify(userWithToken)); //  Gemmer brugerdata + token i sessionStorage
      navigate("/min-side"); // 🚀 Omdirigerer brugeren til sin profilside
    } else {
      alert("Login fejlede! Tjek dine oplysninger."); //  Viser en fejlbesked, hvis login mislykkes
    }
  } catch (error) {
    console.error("❌ Fejl ved login:", error); //  Logger fejl til konsollen, hvis der opstår problemer med fetch
  }
};
