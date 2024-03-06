//Importar funcions de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//Referència URL
const appSettings = {
    databaseURL: "https://addtocart-pauvinent-default-rtdb.europe-west1.firebasedatabase.app/"
} 
//Cream variables de la base de dades
const app = initializeApp(appSettings);
const database = getDatabase(app);
const restaurantsListInDB = ref(database, "restaurants");
//Cream referències als elements del HTML
const addButtonEl = document.getElementById("button");
const list = document.getElementById("hola");

//Recorre els elements de la BD
onValue(restaurantsListInDB, function(snapshot){
    if(snapshot.exists()){
    let restaurantsArray = Object.entries(snapshot.val());
    clearRestaurantsListEl();
    for(let i=0; i< restaurantsArray.length;i++){
        appendItemToRestaurantsListEl(restaurantsArray[i]);
    }}
    else{
        list.innerHTML = "No hi ha valoracions de moment."
    }
})
//Click per afegir elements a la BD
addButtonEl.addEventListener("click", function(){
    let place = document.getElementById("establiment").value;
    let mark = document.getElementById("puntuacio").value;
    let valoration = document.getElementById("valoracio").value;

    const eventData = {
        author: place,
        mark: mark,
        val: valoration
    }

    if (place == "" || mark == "" || valoration == ""){
        alert("Per poder introduir la teva ressenya has d'emplenar tota la informació");

    }else{

        push(restaurantsListInDB, eventData);
        
        console.log(`${eventData} added to Database`);
    }
})

function clearRestaurantsListEl(){
    list.innerHTML = "";
}

function clearText(){
    list.value = "";
}
//Afegir element a la llista del HTML
function appendItemToRestaurantsListEl(item){
    let itemValue = item[1];

    let cont = document.createElement("div");
    cont.className += "service"
    let ulGrupal = document.createElement("ul")
    let htmlEl = document.createElement("li");
    let htmlEl2 = document.createElement("li");
    let htmlEl3 = document.createElement("li");

    htmlEl.className += "htmlEl";
    htmlEl2.className += "htmlEl2";
    htmlEl3.className += "htmlEl3";
    ulGrupal.className += "ulGrupal"

    htmlEl.textContent = itemValue.author;
    htmlEl2.textContent = itemValue.mark; 
    htmlEl3.textContent = itemValue.val;

    ulGrupal.appendChild(htmlEl);
    ulGrupal.appendChild(htmlEl2);
    ulGrupal.appendChild(htmlEl3);
    cont.appendChild(ulGrupal)
    
    list.appendChild(cont);
}