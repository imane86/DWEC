//variable y utilidades
const BASE_URL = "https://rickandmortyapi.com/api";

//accede a los elementos del HTML
//DONDE EL USUARIO ESCRIBE EL ID
const input = document.getElementById("characterId");
//DONDE SE MUESTRAN LOS DATOS
const result = document.getElementById("result");
//MENSAJES COMO  "CARGANDO", "ERROR", "OK"
const status = document.getElementById("status");

//LIMPIA LA INTERFAZ DE LOS RESULTADOS Y MENSAJES ANTERIORES
//SE USA ANTES DE CADA NUEVA BUSQUEDA PARA NO MEZCLAR DATOS
function clearUI() {
  result.innerHTML = "";
  status.textContent = "";
}


/*
COMPRUEBA QUE EL USUARIO HA ESCRITO ALGO VALIDO
EL NUM ES MAYOR QUE 0
VALIDA ANTES DE HACER LA LLAMADA A LA API
*/ 
function validateId(id) {
  if (!id || id <= 0) {
    status.textContent = "ID inválido";
    return false;
  }
  return true;
}

//ESA FUNCION SE ENCARGA DE MOSTRAR LOS DATOS, NO PEDIRLOS
// function render(character, firstEpisode) {
//   result.innerHTML = `
//     <h2>${character.name}</h2>
//     <p>Especie: ${character.species}</p>
//     <p>Estado: ${character.status}</p>
//     <p>Origen: ${character.origin.name}</p>
//     <p>Nº de episodios: ${character.episode.length}</p>
//     <p>Primer episodio: ${firstEpisode.name}</p>
//     <img src="${character.image}">
//   `;
// }

function render(character, firstEpisode) {
  result.innerHTML = `
    <div class="card">
      <img src="${character.image}" alt="${character.name}">
      <div class="info">
        <h2>${character.name}</h2>

        <span class="badge">Especie: ${character.species}</span>
        <span class="badge">Estado: ${character.status}</span>

        <p><strong>Origen:</strong> ${character.origin.name}</p>
        <p><strong>Nº de episodios:</strong> ${character.episode.length}</p>
        <p><strong>Primer episodio:</strong> ${firstEpisode.name}</p>
      </div>
    </div>
  `;
}


//callbacks
//A DONDE LLAMAR, QUE HACER SI VA BIEN Y QUE HACER SI HAY ERROR
function fetchJsonCallback(url, onSuccess, onError) {
  fetch(url)
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(() => onError());
}

//INFORMA AL USUARIO Y GESTIONA LAS LLAMADAS
function getCharacterWithCallback(id) {
  status.textContent = "Cargando · Callback";
//FIRST CALL=> CHARACTER
  fetchJsonCallback(
    `${BASE_URL}/character/${id}`,
    //SECOND CALL=> FIRST EPISODE
    //CALLBACK HELL(UNO DENTRO DE OTRO)
    character => {
      fetchJsonCallback(
        character.episode[0],
        episode => {
          status.textContent = "OK · Callback";
          render(character, episode);
        },
        () => status.textContent = "Error"
      );
    },
    () => status.textContent = "Error"
  );
}

//promises

//DEVUELVE UNA PROMISE QUE RESULVE CON LOS DATOS JSON
function fetchJsonPromise(url) {
  return fetch(url)
    .then(response => response.json());
}

function getCharacterWithPromises(id) {
  status.textContent = "Cargando · Promesas";

  //FIRST CALL=> CHARACTER
  fetchJsonPromise(`${BASE_URL}/character/${id}`)
    .then(character => {
        //SECOND CALL=> FIRST EPISODE
      return fetchJsonPromise(character.episode[0])
        .then(episode => {
          status.textContent = "OK · Promesas";
          render(character, episode);
        });
    })
    .catch(() => {
      status.textContent = "Error";
    });
}

//async-await
//F.ASYNC GENERICA, AWAIT ESPERA SI O SI EL RESULTADO, POS O NEG
//EL CODIGO PARACE SINCRONO PERO NO LO ES
async function fetchJsonAsync(url) {
  const response = await fetch(url);
  return await response.json();
}

async function getCharacterWithAsyncAwait(id) {
  status.textContent = "Cargando · Async/Await";

  try {
    //SE LEE DE ARRIBA A ABAJO COMO SI FUERA SINCRONO
    const character = await fetchJsonAsync(`${BASE_URL}/character/${id}`);
    const episode = await fetchJsonAsync(character.episode[0]);

    status.textContent = "OK · Async/Await";
    render(character, episode);

    //MANEJO DE ERRORES
  } catch {
    status.textContent = "Error";
  }
}


//botones y eventos

//CUANDO EL USUARIO HACE CLICK EN CADA BOTON
document.getElementById("btnCallback").addEventListener("click", () => {
  
  /*LIMPIA LA PANTALLA
    LEE EL ID
    VALIDA EL ID
    LLAMA A LA FUNCION CORRESPONDIENTE
    CADA BOTON TECNICA DISTINTA
  */
    clearUI();
  const id = input.value;
  if (validateId(id)) {
    getCharacterWithCallback(id);
  }
});


//CUANDO EL USUARIO HACE CLICK EN CADA BOTON
document.getElementById("btnPromises").addEventListener("click", () => {
  /*LIMPIA LA PANTALLA
    LEE EL ID
    VALIDA EL ID
    LLAMA A LA FUNCION CORRESPONDIENTE
    CADA BOTON TECNICA DISTINTA
  */
    clearUI();
  const id = input.value;
  if (validateId(id)) {
    getCharacterWithPromises(id);
  }
});


//CUANDO EL USUARIO HACE CLICK EN CADA BOTON
document.getElementById("btnAsync").addEventListener("click", () => {
 
 /*LIMPIA LA PANTALLA
    LEE EL ID
    VALIDA EL ID
    LLAMA A LA FUNCION CORRESPONDIENTE
    CADA BOTON TECNICA DISTINTA
  */
    clearUI();
  const id = input.value;
  if (validateId(id)) {
    getCharacterWithAsyncAwait(id);
  }
});

document.getElementById("btnClear").addEventListener("click", () => {
  clearUI();
  
});



/*la aplicacion no ejecuta todas las llamadas a la vez
cada boton ejecuta una forma distinta de consumir la API:
callbacks, promesas y async/await
el resultado es el mismo, pero el codigo que se ejecuta cambia
*/