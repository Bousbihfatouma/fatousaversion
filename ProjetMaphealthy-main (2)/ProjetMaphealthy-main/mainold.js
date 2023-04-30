// Creation de la MAP de base
// const map = L.map('map').setView([48.833, 2.333], 7);
const map = L.map('map').setView([48.833, 2.333], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 30,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Récupération des élements html
var modal = document.querySelector('#laModale');
var inputTitre = document.querySelector('#titre');
var inputAdresse = document.querySelector('#adresse');
var inputSite = document.querySelector('#site');
var inputDescription = document.querySelector('#description');
var coordonnée

//Récupération des éléments des checkbox du formulaire
var checkVegan = document.getElementById("resto-vegan")
var checkSansGluten = document.getElementById("resto-sansgluten")
var checkSansLactose = document.getElementById("resto-sanslactose")

// La variable qui stockera les coordonnées au click
// let selectedCoord;
// La fonction executée au click de la souris sur la map :
// On sauvegarde les coordonnées en mémoire,
// Puis on ouvre la modale
function onMapClick(e) {
    modal.showModal();
    console.log(e.latlng);
    var marker = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    coordonnée = e.latlng
    marker.bindPopup("<strong>" + e.latlng.lat + "</strong><p>" + e.latlng.lng + "</p>");
}

map.on('click', onMapClick);
// Quand la modale se ferme, on ajoute le nouveau marker sur la map
modal.addEventListener('close', function () {
    console.log(modal.returnValue);
    if (modal.returnValue == 'oui') {
        ajoutMarker(inputTitre.value, inputAdresse.value, inputSite.value, inputDescription.value,coordonnée);
    }
});

function ajoutMarker(w , x, y, z, coordonnée) {
if (checkVegan.checked){
     tableauVegan.push({
        titre : w,
        adresse : x,
        infosite : y,
        description: z,
        coordonnée : coordonnée
    }),
    console.log(tableauVegan);
    // Enregistre tableauMarker dans le localstorage avec le nom savetableauMarker
    localStorage.setItem('savetableauVegan', JSON.stringify(tableauVegan));
}
else if (checkSansGluten.checked){
    tableauSansGluten.push({
       titre : w,
       adresse : x,
       infosite : y,
       description: z,
       coordonnée : coordonnée
   })
   console.log(tableauSansGluten);
   // Enregistre tableauMarker dans le localstorage avec le nom savetableauMarker
   localStorage.setItem('savetableauSansGluten', JSON.stringify(tableauSansGluten));
}
else if (checkSansLactose.checked){
    tableauSansLactose.push({
       titre : w,
       adresse : x,
       infosite : y,
       description: z,
       coordonnée : coordonnée
   })
   console.log(tableauSansLactose);
   // Enregistre tableauMarker dans le localstorage avec le nom savetableauMarker
   localStorage.setItem('savetableauSansLactose', JSON.stringify(tableauSansLactose));
}
}

//On crée un tableau qui contiendra les restau vegans
var tableauVegan = JSON.parse(localStorage.getItem('savetableauVegan')) || [];
var tableauSansGluten = JSON.parse(localStorage.getItem('savetableauSansGluten')) || [];
var tableauSansLactose = JSON.parse(localStorage.getItem('savetableauSansLactose')) || [];

// var tableauMarker = JSON.parse(localStorage.getItem('savetableauMarker')) || [];
var savedMarkersVegan = localStorage.getItem('savetableauVegan');
var savedMarkersSansGluten = localStorage.getItem('savetableauSansGluten');
var savedMarkersSansLactose = localStorage.getItem('savetableauSansLactose');

if (savedMarkersVegan) {
    savedMarkersVegan = JSON.parse(savedMarkersVegan);
    // Ajoute chaque marker à la carte
    savedMarkersVegan.forEach(function(marker) {
        var newMarker = new L.marker(marker.coordonnée).addTo(map);
        newMarker.bindPopup("<strong>" + marker.titre + "</strong><br>" + marker.info);
    });
}
else if (savedMarkersSansGluten) {
    savedMarkersSansGluten = JSON.parse(savedMarkersSansGluten);
    // Ajoute chaque marker à la carte
    savedMarkersSansGluten.forEach(function(marker) {
        var newMarker = new L.marker(marker.coordonnée).addTo(map);
        newMarker.bindPopup("<strong>" + marker.titre + "</strong><br>" + marker.info);
    });
}
else if (savedMarkersSansLactose) {
    savedMarkersSansLactose = JSON.parse(savedMarkersSansLactose);
    // Ajoute chaque marker à la carte
    savedMarkersSansLactose.forEach(function(marker) {
        var newMarker = new L.marker(marker.coordonnée).addTo(map);
        newMarker.bindPopup("<strong>" + marker.titre + "</strong><br>" + marker.info);
    });
};

// //On récupère les valeurs des input de l'utilisateur
// let vegan = document.getElementById("vegan")
// let restauName = document.getElementById("restauName")
// let restauAddress = document.getElementById("restauAddress")
// ​
// //On crée un tableau qui contiendra les restau vegans
// let restauVegans = []
// ​
// //On déclare la fonction qui va assigner les valeurs entrées par l'utilisateur dans un objet
// function affichage() {
//     //Objet restauUser
//     let restauUser = {}
//     //On lui assigne les clés et les valeurs
//     restauUser.vegan = vegan.checked
//     restauUser.restauName = restauName.value
//     restauUser.restauAddress = restauAddress.value
//     console.log(restauUser)
//     //Vérification de la propriété vegan et assignation dans le tableau si c'est True
//     if (restauUser.vegan === true) {
//         restauVegans.push(restauUser)
//         console.log(restauVegans)
//     }
// }
// //Detection du click sur le bouton
// document.getElementById("submit")
//         .addEventListener("click", affichage)
// ​
// ​