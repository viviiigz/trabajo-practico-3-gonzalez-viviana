const charactersContainer = document.getElementById("charactersContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const modal = new bootstrap.Modal(document.getElementById("characterModal"));
const modalContent = document.getElementById("modalContent");

let currentPage = 1;
let isLoading = false;
let searchQuery = "";

// funcion para mostrar el loader
function showLoader() {
  loader.classList.remove("d-none");
}

// funcion para ocultar el loader
function hideLoader() {
  loader.classList.add("d-none");
}

// funvio para mostrar personajes en el contenedor
function displayCharacters(characters) {
  characters.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.className = "col";
    characterCard.innerHTML = `
      <div class="card h-100">
        <img src="${character.image}" class="card-img-top" alt="${character.name}" />
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <p class="card-text">Ki: ${character.ki}</p>
          <button class="btn btn-secondary" onclick="showCharacterDetails(${character.id})">
            Ver detalles
          </button>
        </div>
      </div>
    `;
    charactersContainer.appendChild(characterCard);
  });
}
// funcion para mostrar los detalles del personaje en el modal
window.showCharacterDetails = async function (id) {
  try {
    const response = await fetch(`https://dragonball-api.com/api/characters/${id}`);
    const character = await response.json();

    modalContent.innerHTML = `
      <div class="modal-header">
        <h5 class="modal-title">${character.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <img src="${character.image}" class="img-fluid mb-3" alt="${character.name}" />
        <p><strong>Ki:</strong> ${character.ki}</p>
        <p><strong>Raza:</strong> ${character.race}</p>
        <p><strong>Descripción:</strong> ${character.description || "Sin descripción"}</p>
      </div>
    `;

    modal.show();
  } catch (error) {
    console.error("Error al cargar detalles:", error);
  }
};
// funciom para cargar personajes desde la API
async function fetchCharacters() {
  if (isLoading) return;
  isLoading = true;
  showLoader();

  try {
    const url = searchQuery
      ? `https://dragonball-api.com/api/characters?name=${searchQuery}&page=${currentPage}`
      : `https://dragonball-api.com/api/characters?page=${currentPage}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      displayCharacters(data.items);
      currentPage++;
    } else {
      if (currentPage === 1) {
        charactersContainer.innerHTML = `<p class="text-center">No se encontraron personajes.</p>`;
      }
    }
  } catch (error) {
    console.error("Error al obtener personajes:", error);
  } finally {
    hideLoader();
    isLoading = false;
  }
}

