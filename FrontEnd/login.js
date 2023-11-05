const formulaireLogin = document.querySelector(".formulaire-login")
const titlePortfolio = document.querySelector("#portfolio .btnModif")
const filtres = document.querySelector(".filtres")
const btnLogin = document.querySelector(".login")
let token = window.localStorage.getItem("token");

formulaireLogin.addEventListener("submit", function(event){

    event.preventDefault()
    let erreur 
    const inputs = this
    const formData = new FormData(formulaireLogin)
    const data = Object.fromEntries(formData)

    fetch('http://localhost:5678/api/users/login', {
        method :"POST", 
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(result => {
        window.localStorage.setItem("token", result.token);
       
        if (result.message === ("user not found") || result.error){
            event.preventDefault()
            erreur = "Adresse email ou mot de passe incorrect"
        }
        for (let i = 0 ; i < inputs.length ; i++){
            if (!inputs[i].value) {
                erreur = "Veuillez remplir tous les champs vide"
            }
        } 
        if (erreur) {
            event.preventDefault()
            document.getElementById("erreur").innerHTML = erreur
        } else {
            event.preventDefault()
            location.href = "index.html"
        };
    })
});

function displayLogin(){
    if (token != "undefined") {
        btnLogin.innerText = "logout"
    } 
}
displayLogin()

