window.onload = function () {

  var estado = document.getElementById("status");
  var resultado = document.getElementById("result");
  var input = document.getElementById("characterId");

  document.getElementById("btn-Async").onclick = async function () {

    var id = input.value;

    if (id === "") {
      estado.innerHTML = "Escribe un número";
      return;
    }

    try {
      estado.innerHTML = "Buscando...";

      // PERSONAJE
      var respPersonaje = await fetch(
        "https://rickandmortyapi.com/api/character/" + id
      );

      if (!respPersonaje.ok) {
        throw "error";
      }

      var personaje = await respPersonaje.json();

      // PRIMER EPISODIO 
      var respEpisodio = await fetch(personaje.episode[0]);
      var episodio = await respEpisodio.json();

      // MOSTRAR RESULTADO
      resultado.innerHTML =
        "<h2>" + personaje.name + "</h2>" +
        "<img src='" + personaje.image + "'>" +
        "<p>Origen: " + personaje.origen + "</p>" +
        "<p>Nº de episodios: " + personaje.episodio + "</p>" +
        "<p>Primer episodio: " + episodio.name + "</p>";


        
/*  resultado.innerHTML =
        "<h2>" + personaje.name + "</h2>" +
        "<img src='" + personaje.image + "'>" +
        "<p>Estado:" personaje.status +"</p>" +
        "<p>Especie:" personaje.especies +"</p>" +
        "<p>Origen: " + personaje.origen.name + "</p>" +
        "<p>Nº de episodios: " + personaje.episodio.length + "</p>" +
        "<p>Primer episodio: " + firstEpisode.name + "</p>";
 */

      estado.innerHTML = "OK";

    } catch (e) {
      estado.innerHTML = "Error: Personaje no encontrado";
      resultado.innerHTML = "";
    }
  };

  document.getElementById("btn-Callback").onclick = function () {

  var id = document.getElementById("characterId").value;

  if (id === "") {
    document.getElementById("status").innerHTML = "Escribe un número";
    return;
  }

  document.getElementById("status").innerHTML = "Buscando (Callback)...";

  fetch("https://rickandmortyapi.com/api/character/" + id)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (personaje) {
      return fetch(personaje.episode[0]);
    })
    .then(function (respEp) {
      return respEp.json();
    })
    .then(function (episodio) {
      document.getElementById("result").innerHTML =
        "<h2>" + episodio.name + "</h2>";
      document.getElementById("status").innerHTML = "OK (Callback)";
    })
    .catch(function () {
      document.getElementById("status").innerHTML = "Error (Callback)";
    });
};


document.getElementById("btn-Promises").onclick = function () {

  var id = document.getElementById("characterId").value;

  if (id === "") {
    document.getElementById("status").innerHTML = "Escribe un número";
    return;
  }

  document.getElementById("status").innerHTML = "Buscando (Promesas)...";

  fetch("https://rickandmortyapi.com/api/character/" + id)
    .then(function (resp) {
      if (!resp.ok) throw "error";
      return resp.json();
    })
    .then(function (personaje) {
      return fetch(personaje.episode[0]);
    })
    .then(function (respEp) {
      return respEp.json();
    })
    .then(function (episodio) {
      document.getElementById("result").innerHTML =
        "<p>Primer episodio: " + episodio.name + "</p>";
      document.getElementById("status").innerHTML = "OK (Promesas)";
    })
    .catch(function () {
      document.getElementById("status").innerHTML = "Error (Promesas)";
    });
};

};
