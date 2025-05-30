const charactersContainer = document.getElementById("charactersContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const modal = new bootstrap.Modal(document.getElementById("characterModal"));
const modalContent = document.getElementById("modalContent");

let currentPage = 1;
let isLoading = false;
let searchQuery = "";

// Función para mostrar el loader
function showLoader() {
  loader.classList.remove("d-none");
}

// Función para ocultar el loader
function hideLoader() {
  loader.classList.add("d-none");
}

// Función para mostrar personajes en el contenedor
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

