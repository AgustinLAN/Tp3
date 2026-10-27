let personajes = [];

fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((data) => {
    personajes = data.results;
    cargarSiguientes(data.info.next);
  })
  .catch((error) => {
    console.error("Error al cargar los personajes:", error);
  });

  function cargarSiguientes(url) {
    if (url === null || personajes.length >= 100) {
      mostrarpersonajes(personajes.slice(0, 100));
      return;
    }
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        personajes = personajes.concat(data.results).slice(0, 100);
        cargarSiguientes(data.info.next);
      })
      .catch((error) => {
        console.error("Error al cargar más personajes:", error);
      });
  }


  const personajeContainer = document.getElementById("personajeContainer");
  const filtrospecies = document.getElementById("filtroespecie");
  const filtrooriginname = document.getElementById("filtroorigen");
  const buscador = document.getElementById("buscador");


  function mostrarpersonajes(lista) {
    personajeContainer.innerHTML = "";
  
    lista.forEach((personaje) => {
      personajeContainer.innerHTML += `
        <article class="personaje1">
          <img src="${personaje.image}" alt="${personaje.name}">
          <h2>${personaje.name}</h2>
          <p>Especie: ${personaje.species}</p>
          <p>Origen: ${personaje.origin.name}</p>
          <p>Estado: ${personaje.status}</p>
        </article>
      `;
    });
  }


  function filtrarpersonajes() {
    const personajesFiltradas = personajes.filter((personaje) => {
      return (
        personaje.species.includes(filtrospecies.value) &&
        personaje.origin.name.includes(filtrooriginname.value)
      );
    });
  
    mostrarpersonajes(personajesFiltradas);
  }
  function buscarpersonajes() {
    const texto = buscador.value.toLowerCase();
  
    const personajesFiltradas = personajes.filter((personaje) => {
      return (
        personaje.name.toLowerCase().includes(texto) ||
        personaje.origin.name.toLowerCase().includes(texto) ||
        personaje.species.toLowerCase().includes(texto)
      );
    });
  
    mostrarpersonajes(personajesFiltradas);
  }

  filtrooriginname.addEventListener("change", filtrarpersonajes);
  filtrospecies.addEventListener("change", filtrarpersonajes);
  buscador.addEventListener("input", buscarpersonajes);
