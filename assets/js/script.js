//elemtos dom
const API_URL = 'https://dragonball-api.com/api/characters';
const container = document.getElementById('charactersContainer');
const loader = document.getElementById('loader');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

let page = 1;
let isLoading = false;
let isSearching = false;

// buscar personajes
async function fetchCharacters(name = '', pageNum = 1) {
  try {
    loader.classList.remove('d-none');
    let url;

    if (name) {
      url = `${API_URL}?name=${encodeURIComponent(name)}`;
    } else {
      url = `${API_URL}?page=${pageNum}`;
    }

    const res = await fetch(url);

    if (!res.ok) throw new Error('Error al consultar la API');

    const data = await res.json();
    const characters = Array.isArray(data) ? data : data.items;
    return characters || [];
    
  } catch (error) {
    alert(error.message);
    return [];
  } finally {
    loader.classList.add('d-none');
  }
}
