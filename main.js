fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    personajes = data.results;
    mostrarpersonajes(personajes);
  })
  .catch((error) => {
    console.error("Error al leer psnajes:", error);
  });
const personajeContainer = document.getElementById("personajeContainer");
const filtrospecies = document.getElementById("filtroespecie");
const filtrooriginname = document.getElementById("filtroorigen");
const buscador = document.getElementById("buscador");

let personajes = [];

function mostrarpersonajes(lista) {
  personajeContainer.innerHTML = "";

  lista.forEach((personaje) => {
    personajeContainer.innerHTML += `
    <article class="personaje1">
      <img src="${personaje.image}" alt="${personaje.name}">
      <h2 class="personaje">${personaje.name}</h2>
      <p class="species">${personaje.species}</p>
      <p class="originname">${personaje.origin.name}</p>
      <p class="status">${personaje.status}</p>
    </article>
  `;
  });
}

formpersonajeNueva.addEventListener("submit", (e) => {
  e.preventDefault();

  let nuevapersonaje = {
    name: e.target.nombre.value,
    species: e.target.especie.value,
    origin: {
      name: e.target.origen.value,
    },
    status: e.target.estado.value,
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  };

  personajes.push(nuevapersonaje);
  filtrarpersonajes();
  formpersonajeNueva.reset();
});

function filtrarpersonajes() {
  const personajesFiltradas = personajes.filter((personaje) => {
    return (
      personaje.species.includes(filtrospecies.value) &&
      personaje.originname.includes(filtrooriginname.value)
    );
  });
  mostrarpersonajes(personajesFiltradas);
}
function buscarpersonajes() {
  const texto = buscador.value.toLowerCase();
  const personajesFiltradas = personajes.filter((personaje) => {
    return (
      personaje.name.toLowerCase().includes(texto) ||
      personaje.originname.toLowerCase().includes(texto) ||
      personaje.species.toLowerCase().includes(texto)
    );
  });
  mostrarpersonajes(personajesFiltradas);
}

filtrooriginname.addEventListener("change", filtrarpersonajes);
filtrospecies.addEventListener("change", filtrarpersonajes);
buscador.addEventListener("input", buscarpersonajes);
