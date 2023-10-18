/**************** Récupération du Back-End *********************/

fetch('http://localhost:5678/api/categories')
    .then (dataCategories => dataCategories.json())
    
fetch('http://localhost:5678/api/works')
    .then (dataWorks => dataWorks.json())
    .then (jsonListWorks => {
       displayWorks(jsonListWorks)
    });

/*********** Appel d'éléments ***************/
const titlePortfolio = document.querySelector("#portfolio .title")
const filtresGallery = document.querySelector("#portfolio .filtres")
const contenuGallery = document.querySelector(" #portfolio .gallery")
const filtres = document.querySelector(".filtres")

/************** Création Button Filtres ****************/

const iconModif = document.createElement("i")
    iconModif.classList = ("fa-regular fa-pen-to-square")
    iconModif.style.color = "#000000"
titlePortfolio.appendChild(iconModif)

const buttonModif = document.createElement("input")
    buttonModif.type = "button"
    buttonModif.value = "modifier"
titlePortfolio.appendChild(buttonModif)

/************** fonctions ****************/

function displayWorks(jsonListWorks){
    for (let i = 0 ; i < jsonListWorks.length ; i++) {

        const contenuDiv = document.createElement("figure")
        const contenuImage = document.createElement("img")
        const contenuText = document.createElement("figcaption")
        const workId = jsonListWorks[i].categoryId 

        contenuImage.src = jsonListWorks[i].imageUrl
        contenuText.innerText = jsonListWorks[i].title

        contenuGallery.appendChild(contenuDiv)
        contenuDiv.appendChild(contenuImage)
        contenuDiv.appendChild(contenuText)

        buttonModif.addEventListener ("click", function() {
           
        })

    };
         
}

    

