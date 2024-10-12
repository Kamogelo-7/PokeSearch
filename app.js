async function fetchPokemonData() {
  // Retrieve the last searched Pokemon from localStorage if available
  document.querySelector("#Pokemon").value =
    localStorage.getItem("Pokemon") || "";

  try {
    document.querySelector(".SubmitBtn").addEventListener("click", async () => {
      const pokemonInput = document
        .querySelector("#Pokemon")
        .value.toLowerCase();

      // Save the input to localStorage
      localStorage.setItem("Pokemon", pokemonInput);

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`
      );

      if (!res.ok) {
        throw new Error("Unsuccessful request❗");
      }

      const data = await res.json();
      const pokemonSprite = data.sprites.front_default;

      const imgElement = document.querySelector(".pokemonImg");
      imgElement.src = pokemonSprite;
      imgElement.style.display = "block";

      document.querySelector("p").innerText = `It's ${data.name} 😀`;

      document.querySelector("#Pokemon").focus();
    });
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
}

fetchPokemonData();
