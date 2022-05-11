// El objetivo del desafio era utilizar lo aprendido para escribir en el DOM utilizando inputs del usuario atraves de eventos en el codigo. 

// El concepto es de un board de canciones que las personas podrán apoyar con el presionar de un Enter a partir del resultado del test en la parte inferior. 


// Array inicial con las canciones presentadas al usuario. 
const songs = [
    {   id:1 , name: "Romantic Movies", autor: "Kay Vs the Moon", genero:"Rock", aplausos: 0   },
    {   id:2 , name: "En cuatro", autor: "Amigos Invisibles", genero:"Rock", aplausos: 0   },
    {   id:3 , name: "Toxic", autor: "Britney Spears", genero:"Pop", aplausos: 0      },
    {   id:4 , name: "The Feels", autor: "TWICE", genero:"KPOP", aplausos: 0      },
    {   id:5 , name: "Patiently Waiting (ft Eminem)", autor: "50 Cent", genero:"Rap", aplausos: 0  },
    {   id:6 , name: "Sunny Afternoon", autor: "Drake Bell", genero:"Rock", aplausos: 0     },
    {   id:7 , name: "Till I Collapse", autor: "Eminem", genero:"Rap", aplausos: 0    },
    {   id:8 , name: "Bad Habits", autor: "Ed Sheeran", genero:"Pop", aplausos: 0  },
    {   id:9 , name: "Lie", autor: "BTS", genero:"KPOP", aplausos: 0   },
    {   id:10 , name: "I Will Survive", autor: "Hermes House Band", genero:"Pop", aplausos: 0   },
    {   id:11 , name: "Still D.R.E. (ft. Snoop Dog)", autor: "Dr. D.R.E.", genero:"Rap", aplausos: 0  },
    {   id:12 , name: "Love Again", autor: "Dua Lipa", genero:"Pop", aplausos: 0    },
    {   id:13 , name: "Come With Me Now", autor: "Kongos", genero:"Rock", aplausos: 0   },
    {   id:14 , name: "Bellacoso", autor: "Residente", genero:"Rap", aplausos: 0    },
    {   id:15 , name: "Close Up On Your Lips", autor: "Kay Vs the Moon", genero:"Rock", aplausos: 0    },
    {   id:16 , name: "Torero", autor: "Chayanne", genero:"Pop", aplausos: 0     },
    {   id:17 , name: "How u like that", autor: "BLACKPINK", genero:"KPOP", aplausos: 0     },
    {   id:18 , name: "Energetic", autor: "Wanna One", genero:"KPOP", aplausos: 0    },
    {   id:19 , name: "Ko Ko Bop", autor: "EXO", genero:"KPOP", aplausos: 0    },
    {   id:20 , name: "The Bidding", autor: "Tally Hall", genero:"Rock", aplausos: 0   },
]

// Array de nombres de las bandas, este array esta matcheado contra las imagenes que tenemos en la carpeta. Para que le aparezca al usuario el nombre dependiendo de lo que le haya aparecido. 
const bandNames = [
    "Tally Hall", "Dr. D.R.E.", "Kongos", "EXO", "Hermes House Band", "Dua Lipa", "Kay Vs the Moon", "Eminem", "Drake Bell", "Amigos Invisibles", "TWICE", "Ed Sheeran", "50 Cent", "Britney Spears", "BLACKPINK", "BTS", "Wanna One", "Chayanne", "Residente"
]

let stringsOfArrayOfSongs = [] // Se llenará de un string hecho para poder depositarse con un innerHTML de manera comoda. 
 
// Funcion que transforma los arrays de objetos en las tablas para imprimirlas.
function printTableOfSongs(arrayOfObj) {
    stringsOfArrayOfSongs.splice(0, stringsOfArrayOfSongs.length);
    for (let i = 0; i < arrayOfObj.length; i++) {
        stringsOfArrayOfSongs.push(
        "<div class='row'>" +
            "<p class='songTable tableId'>" + arrayOfObj[i].id + ' - </p>' +
            "<p class='songTable tableName'>" + arrayOfObj[i].name + '</p>' +
            "<p class='songTable tableAutor'> by " + arrayOfObj[i].autor + '</p>' +
            "<p class='songTable tableGenero'>" + arrayOfObj[i].genero + '</p>' + 
            "<p class='songTable tableAplausos'>" + "👏🏼" + arrayOfObj[i].aplausos + '</p>' +
        "</div>"
        );
    }
}

printTableOfSongs(songs);
console.log(stringsOfArrayOfSongs);


// INICIA EL FLUJO DEL USUARIO

// ########################################################################################################################

    // Imprimimos la primer tabla que se ve hasta arriba para el usuario.
    let initialPlaylist = document.getElementById("PlaylistSelection");
    let stringify = stringsOfArrayOfSongs.join("");
    initialPlaylist.innerHTML = stringify;

// ########################################################################################################################

//  Dependiendo de la selección en el input, el listener nos avisará y cambiaremos la tabla inferior para el usuario, imprimiendo una nueva. En esta sección por ahora solo capto el registro y activo la función printFilteredPlaylist() como segundo paso.
let songFilter = [];
const userGenre = document.getElementById("selectDeGenero");
userGenre.addEventListener('change', () => {                    // Evento utilizado.
    console.log("Genre obtained = " + event.target.value);
    songFilter = songs.filter(   (el) => el.genero.includes(event.target.value)  ); 
    console.log("songFilter value = " + songFilter);
    printTableOfSongs(songFilter);
    console.log(stringsOfArrayOfSongs);
    printFilteredPlaylist ();
})

// ########################################################################################################################

function printFilteredPlaylist () {
    genreFilteredPlaylist = document.getElementById("FinalPlaylist")
    stringify = stringsOfArrayOfSongs.join("");
    genreFilteredPlaylist.innerHTML = stringify;
}

// ########################################################################################################################

// En esta sección el usuario podra participar en un test, donde podrá jugar a ver "cual artista le toca", rotando entre una serie de imagenes de las bandas mencionadas en el primer array.

let bandImage = document.getElementById('imageForTest');
let bandEres = document.getElementById('eres');
let imgV = parseInt(0);
let bandInSpotlight;

bandImage.onmousemove = () => {
    imgV++
    console.log("mousemove")
    bandImage.src="images/band" + imgV + ".jpg"
    bandEres.innerText = "Eres: " + bandNames[imgV-1];
    bandInSpotlight = bandNames[imgV-1]
    
    if (imgV > bandNames.length-1) {
        imgV = parseInt(0);
    }
};

// ########################################################################################################################

// En esta sección adquirimos el evento del ENTER y cada que esto ocurra escribimos un array nuevo el cual se imprime en la tabla superior, con la diferencia en que dependiendo del artista que le haya tocado en el array sumaremos "aplausos" a este artista. 

let enterValidation = document.getElementById("all");

enterValidation.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        console.log("ENTER");

        let bandNameFilter = bandNames[imgV-1];
        console.log("bandNameFilter is " + bandNameFilter);

        const newArr = songs.map(obj => {


            if (obj.autor === bandNameFilter) {
              return {
                id: obj.id,
                name: obj.name,
                autor: obj.autor,
                aplausos: parseInt(obj.aplausos++)};
            }
            return obj;
          });
          printTableOfSongs(newArr);
          initialPlaylist = document.getElementById("PlaylistSelection");
          stringify = stringsOfArrayOfSongs.join("");
          initialPlaylist.innerHTML = stringify;
    }
} )





