export const handleDeleteComment = async (commentID) => {
  //  Viser en bekræftelsesdialog før sletning
  if (!window.confirm("Er du sikker på, at du vil slette din kommentar?")) return;

  //  Henter JWT-token fra sessionStorage
  const token = sessionStorage.getItem('token'); 

  //  Sender en DELETE-anmodning til API'et for at slette kommentaren
  const response = await fetch(`http://localhost:4242/comment/${commentID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, //  Inkluderer token for at sikre autentificering
    },
  });

  //  Hvis sletningen lykkes, skal data opdateres
  if (response.ok) {
    refetch(); //  Opdaterer kommentarlisten (forudsætter, at `refetch` er defineret)
  } else {
    //  Henter fejlbeskeden fra API'et og viser den til brugeren
    const errorData = await response.json();
    alert("Kunne ikke slette kommentar: " + errorData.message);
  }
};
