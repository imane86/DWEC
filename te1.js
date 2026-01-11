const URL_API = 'https://jsonplaceholder.typicode.com/todos/2';

//espera a que se cargue todo el contenido de la pagina
window.onload = function(){
    //funcion auxiliar
    const mostrarResultado = (metoddo, dato) => {
        const contenedor = document.getElementById('resultado');
        //uso del operador condiocional para el estado
        const estado = dato.completed ? "Completado" : "No Completado";
        contenedor.innerHTML = `    
            <h3>Metodo: ${metoddo}</h3>
            <p>Titulo: ${dato.title}</p>
            <p>Estado: ${estado}</p>
        `;
    }

    //parte1: Callback
    const ejecutarCallback = () => {
        fetch(URL_API)
        .then(response => response.json())
        .then(data => mostrarResultado('Callback', data))
        .catch(error => console.error('Error en Callback:', error));
    }
    document.getElementById("Callback").onclick = ejecutarCallback;
    //parte2: Promesa
    const ejecutarPromesa = () => {
        new Promise((resolve, reject) => {
            fetch(URL_API)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
        .then(data => mostrarResultado('Promesa', data))
        .catch(error => console.error('Error en Promesa:', error));
    }   
    document.getElementById("Promesa").onclick = ejecutarPromesa;

    //parte3: Asincrono
    const ejecutarAsincrono = async () => {
        try {
            const response = await fetch(URL_API);
            const data = await response.json();
            mostrarResultado('Asincrono', data);
        } catch (error) {
            console.error('Error en Asincrono:', error);
        }
    }
    document.getElementById("Asincrono").onclick = ejecutarAsincrono;
}       



/* <h2>parte1</h2>

    function Callback(callback){
        

        fetch('https://jsonplaceholder.typicode.com/todos/2')
        .then(response => response.json())
        .then(data => callback(data));
        alert("Hola desde Callback");
       
    }
    Callback(function(data){
        const estado = data.completed ? "Completado" : "No Completado";
      

    }); */
    ////////////////////////////////////////////////////////////////////////////////////////

// <h2>parte2</h2>

//     function Promesa(){
//         return new Promise((resolve, reject) => {
//             fetch('https://jsonplaceholder.typicode.com/todos/2')
//             .then(response => response.json())
//             .then(data => resolve(data))
//             .catch(error => reject(error));
//         });
//     }

//     Promesa()
//     .then(data => {
//         const estado = data.completed ? "Completado" : "No Completado";
//         // console.log(`El estado de la tarea con ID ${data.id} es: ${estado}`);
//         document.getElementById('resultado').innerHTML = `
//             <p> ${data.title}</p>
//             <p> ${estado}</p>
//         `;
//     })

//     .catch(error => {
//         document.getElementById('resultado').innerHTML = ' ' ; 
//             <p>Error al obtener los datos</p>
//         ;
//         // console.error('Error:', error);
//     }); 
////////////////////////////////////////////////////////////////////////////////////////////

{/* <h2>parte3<h2> 

    async function Asincrono(){
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/2');
            const data = await response.json();
            const estado = data.completed ? "Completado" : "No Completado";
        } catch (error) {
            console.error('Error:', error);
        }
    }
    Asincrono(); */}


    
// function mostrar(){
//     alert("Hola");

// }

// //funcion para eliminar el buffer de resultados
// function limpiar(){
//    alert("Limpiar pantalla");
// }


// window.onload = function(){
//     document.getElementById("Callback").addEventListener("click", Callback);
// }
// document.getElementById("Callback").onclick = Callback;

    
// document.getElementById("Promesa").onclick = Promesa;
// // document.getElementById("Asincrono").onclick = Asincrono;

// document.getElementById("Limpiar").onclick = limpiar;

// document.getElementById("Mostrar").onclick = mostrar;
