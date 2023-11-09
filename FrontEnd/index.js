/**************** Récupération du Back-End *********************/

let jsonListCat = fetch('http://localhost:5678/api/categories')
    .then (dataCategories => dataCategories.json())
    .then (jsonListCategories => {
        jsonListCat = jsonListCategories
    });

fetch('http://localhost:5678/api/works')
    .then (dataWorks => dataWorks.json())
    .then (jsonListWorks => {
        displayWorks(jsonListWorks)
});

/*********** Appel d'éléments HTML ***************/

const titlePortfolio = document.querySelector("#portfolio .btnModif")
const contenuGallery = document.querySelector(" #portfolio .gallery")
const filtres = document.querySelector(".filtres")
const btnLogin = document.querySelector(".login")

/*************** Stockage token *****************/

let token = window.localStorage.getItem("token");

/************** Création des Boutons Filtres Projets ****************/

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

/************** Création du bouton modifier ****************/

const iconModif = document.createElement("i")
    iconModif.classList = ("fa-regular fa-pen-to-square")
    iconModif.style.color = "#000000"
titlePortfolio.appendChild(iconModif)

const buttonModif = document.createElement("input")
    buttonModif.type = "button"
    buttonModif.value = "modifier"
titlePortfolio.appendChild(buttonModif)

/********** Écouteur d'événement du bouton modifier ************/

buttonModif.addEventListener("click", function(){
    fetch('http://localhost:5678/api/works')
    .then (dataWorks => dataWorks.json())
    .then (jsonListWorks => {
        createModale(jsonListWorks);
    });       
});

/********************** fonctions *************************/

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

function createModale(jsonListWorks){
    const modale = document.getElementById("modale")
    modale.innerHTML = "";
    modale.style.visibility = "visible"

    const divIconX = document.createElement("div")
    divIconX.classList = ("divIconX")
    modale.appendChild(divIconX)

    const iconCross = document.createElement("i")
    iconCross.classList = ("fa-solid fa-xmark fa-lg")
    iconCross.style.color = "#0a0c0f"
    divIconX.appendChild(iconCross)
    
    const titleModale = document.createElement("h2")
    titleModale.innerHTML = ("Galerie photo")
    modale.appendChild(titleModale)
        
    const contenuModale = document.createElement("div")
    contenuModale.classList = ("contenuModale")
    modale.appendChild(contenuModale)
        
    const contenuButton = document.createElement("input")
    contenuButton.type = "button"
    contenuButton.value = "Ajouter une photo"
    contenuButton.classList = ("buttonAdd")
    modale.appendChild(contenuButton)
        
    for (let i = 0 ; i < jsonListWorks.length ; i++) {   
        const contenuDivM = document.createElement("figure")
        const contenuImage = document.createElement("img")
        contenuImage.src = jsonListWorks[i].imageUrl

        const deleteImage = document.createElement("div")
        deleteImage.classList = ("backPoubelle")

        const poubelleImage = document.createElement("i")
        poubelleImage.classList = ("fa-solid fa-trash-can fa-xs poubelle")

        contenuDivM.appendChild(contenuImage)
        const cpt = document.createElement("div");
        cpt.innerHTML = i;
        contenuDivM.appendChild(cpt);  
           contenuDivM.appendChild(deleteImage)
        contenuModale.appendChild(contenuDivM)
        deleteImage.appendChild(poubelleImage)

        poubelleImage.addEventListener("click", function(){               
            let idFigure = jsonListWorks[i].id                 
            fetch(`http://localhost:5678/api/works/${idFigure}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization :`Bearer ${token}`
                }
                })
            .then( response => {
                // const deletedIndex = jsonListWorks.findIndex(work => work.id === idFigure);
                // if (deletedIndex !== -1) {
                //     jsonListWorks.splice(deletedIndex, 1);
                //     i--;
                // }
                // contenuGallery.innerHTML = "" 
                // contenuDivM.innerHTML = "" 
                fetch('http://localhost:5678/api/works')
                    .then (dataWorks => dataWorks.json())
                    .then (jsonListWorks => {
                        contenuGallery.innerHTML="";
                        displayWorks(jsonListWorks);
                        createModale(jsonListWorks);
                });

            })
        console.log(jsonListWorks)
        })
    };
        
    if (modale.style.visibility = "visible") {
        buttonModif.disabled = true
    }
    iconCross.addEventListener("click", function(){
        modale.style.visibility = "hidden"
        buttonModif.disabled = false
        modale.innerHTML= ""
    })
    contenuButton.addEventListener("click", function (){
        modale.style.visibility = "hidden";
        createModale2()
    })

}

function createModale2(){
            
    const modale2 = document.getElementById("modale2")
    modale2.classList = ("modale")
    modale2.style.visibility = "visible"
    
    const divIcon = document.createElement("div")
    divIcon.classList = ("divIcon")
    modale2.appendChild(divIcon)

    const arrow = document.createElement("i")
    arrow.classList =("fa-solid fa-arrow-left arrow-left")
    divIcon.appendChild(arrow)

    arrow.addEventListener("click", function(){
        fetch('http://localhost:5678/api/works')
        .then (dataWorks => dataWorks.json())
        .then (jsonListWorks => {
            createModale(jsonListWorks)      
        modale2.style.visibility = "hidden"
        if (modale2.style.visibility = "hidden"){
            modale2.innerHTML = ""
        }
    });
    })

    const iconCross = document.createElement("i")
    iconCross.classList = ("fa-solid fa-xmark fa-lg")
    iconCross.style.color = "#0a0c0f"
    divIcon.appendChild(iconCross)

    const titleModale = document.createElement("h2")
    titleModale.innerHTML = ("Ajout photo")
    modale2.appendChild(titleModale)
        
    /********************   Création du contenu pour l'image   ************************/

    const placePictures = document.createElement("div")
    placePictures.classList =("placePictures")
        
    const picturesLogo = document.createElement("i")
    picturesLogo.classList = ("fa-regular fa-image")
    picturesLogo.style.color = ("#b9c5cc")
    placePictures.appendChild(picturesLogo)

    const labelButton = document.createElement("button")
    labelButton.addEventListener("click", () => {
        document.getElementById("files").click();
    })

    labelButton.type = "button"
    labelButton.classList = ("buttonLabel")
    labelButton.innerText = ("+ Ajouter photo")
        
    const buttonAddPictures = document.createElement("input")
    buttonAddPictures.type = "file"
    buttonAddPictures.style.display = "none"
    buttonAddPictures.name = "myFile"
    buttonAddPictures.id = "files"
    placePictures.appendChild(labelButton)
    placePictures.appendChild(buttonAddPictures) 

    // Appel de la photo 
    buttonAddPictures.addEventListener("change", function(){
        const fr = new FileReader();
        fr.readAsDataURL(buttonAddPictures.files[0]);

        fr.addEventListener("load", function (){
            const url = fr.result
            const img = new Image()
            img.src = url
            placePictures.innerHTML = ""
            placePictures.appendChild(img)
            titreInputForm.value = buttonAddPictures.files[0].name
        }) 
    })

    const textPictures = document.createElement("p")
    textPictures.innerText = ("jpg, png : 4mo max")
    placePictures.appendChild(textPictures)

    /********************   Création du formulaire   ************************/

    const formAddPictures = document.createElement("form")
    modale2.appendChild(formAddPictures)

    formAddPictures.appendChild(placePictures)

    const labelTitre = document.createElement("label")
    labelTitre.innerText = ("Titre")
    formAddPictures.appendChild(labelTitre)

    const titreInputForm = document.createElement("input")
    titreInputForm.type = "text"
    titreInputForm.name = "title"
    titreInputForm.classList = ("inputText")
    formAddPictures.appendChild(titreInputForm)

    const labelCategorie = document.createElement("label")
    labelCategorie.innerText = ("Catégorie")
    formAddPictures.appendChild(labelCategorie)

    /********************   List of category of work  ************************/

    const categorieInputForm = document.createElement("select")
    categorieInputForm.classList = ("inputText")
    categorieInputForm.name = "category"
    formAddPictures.appendChild(categorieInputForm)

    for ( let i = 0 ; i < jsonListCat.length ; i++) {
            const newCat = document.createElement("option")
            newCat.innerText = jsonListCat[i].name
            newCat.value = jsonListCat[i].id
            categorieInputForm.appendChild(newCat)
    }

    const border = document.createElement("p")
    border.classList = ("border")
    formAddPictures.appendChild(border)
    /********************   Button Valid formulaire  ************************/

    const buttonValidPicture = document.createElement("input")
    buttonValidPicture.type = "submit"
    buttonValidPicture.value = "Valider"
    buttonValidPicture.classList =("buttonAdd")
    buttonValidPicture.style.background = "#A7A7A7"
    formAddPictures.appendChild(buttonValidPicture)
       
    const champError = document.createElement("p")
    champError.id = ("erreur")
    formAddPictures.appendChild(champError)

    formAddPictures.addEventListener("click", function(){
        const inputs = this
        if (!inputs[0].value == "" && !inputs[1].value == ""){
            buttonValidPicture.style.background = "#1D6154" 
        }
    }) 

    formAddPictures.addEventListener("submit", function(event){
        event.preventDefault()
        let erreur 
        const inputs = this
        const myFormData = new FormData()
        myFormData.append("image", buttonAddPictures.files[0])
        myFormData.append("title", titreInputForm.value)
        myFormData.append("category", +categorieInputForm.value)
        
        if (myFormData.get("image") == "undefined"){
                    erreur = "Veuillez ajouter une image"
        }
        if (myFormData.get("title") === ""){
                    erreur = "Veuillez ajouter un titre"
        } 
        if (erreur) {
                    event.preventDefault()
                    document.getElementById("erreur").innerHTML = erreur
        } else {     
            document.getElementById("erreur").style.color = "green"
            document.getElementById("erreur").innerHTML = "Formulaire envoyé"
            fetch("http://localhost:5678/api/works", {
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    Authorization :`Bearer ${token}`
                },
                body : myFormData    
            })
            .then(resp=> resp.json()).then(result => {   
                contenuGallery.innerHTML = ""
                fetch('http://localhost:5678/api/works')
                .then (dataWorks => dataWorks.json())
                .then (jsonListWorks => { 
                    displayWorks(jsonListWorks)
                })
            }) 
        }
    })
    iconCross.addEventListener("click", function(){
        modale2.style.visibility = "hidden"
        if (modale.style.visibility = "hidden"){
            modale.innerHTML = ""
        }
        if (modale2.style.visibility = "hidden"){
                modale2.innerHTML = ""
        }
        buttonModif.disabled = false
    })
}
/***************** fonction localStorage ******************/

function displayLogin(){
    if (token != "undefined") {
    titlePortfolio.style.display = "block"
    filtres.style.display = "none"
    btnLogin.innerText = "logout"
} else {
    titlePortfolio.style.display = "none"
}
btnLogin.addEventListener("click", ()=>{
    if (token != "undefined"){
        window.localStorage.setItem("token", "undefined");
    }
})
}
displayLogin()
