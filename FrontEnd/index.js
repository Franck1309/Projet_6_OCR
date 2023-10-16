/**************** Récupération du Back-End *********************/
/*fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: {
        "email": "string",
        "password": "string"
      }
})*/

    

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

const buttonTous = document.createElement("input")
    buttonTous.type = "button"
    buttonTous.value = "Tous"
    buttonTous.classList.add("buttonFiltres")
filtres.appendChild(buttonTous)

const buttonObjets = document.createElement("input")
    buttonObjets.type = "button"
    buttonObjets.value = "Objets"
    buttonObjets.classList.add("buttonFiltres")
filtres.appendChild(buttonObjets)

const buttonAppart = document.createElement("input")
    buttonAppart.type = "button"
    buttonAppart.value = "Appartements"
    buttonAppart.classList.add("buttonFiltres")
filtres.appendChild(buttonAppart)

const buttonHotels = document.createElement("input")
    buttonHotels.type = "button"
    buttonHotels.value = "Hotels & Restaurants"
    buttonHotels.classList.add("buttonFiltres")
filtres.appendChild(buttonHotels)

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
            filtres.toggleAttribute("hidden")
        })

        buttonObjets.addEventListener ("click", function(){
    
            if (workId !== 1){
                contenuDiv.style.display = "none"
            } else {
                contenuDiv.style.display = "block"
            }
        })

        buttonAppart.addEventListener ("click", function(){
            if (workId !== 2){
                contenuDiv.style.display = "none" 
            } else {
                contenuDiv.style.display = "block"
            }
        })

        buttonHotels.addEventListener ("click", function(){
            if (workId !== 3){
                contenuDiv.style.display = "none" 
            } else {
                contenuDiv.style.display = "block"
            }
        })

        buttonTous.addEventListener ("click", function(){
            contenuDiv.style.display = "block"
        })
    };
         
}


    const login = document.querySelector(".login")
    const sectionLogin = document.querySelector(".formulaire-login")

    login.addEventListener("click", function(){
        console.log("ok")
        sectionLogin.style.display("block")
    })

