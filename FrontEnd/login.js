const formulaireLogin = document.querySelector(".formulaire-login")
const buttonConnexion = document.querySelector(".btnConnecter")
formulaireLogin.addEventListener("submit", function(event){
    let erreur ;
    const inputs = this; 
    if (inputs["email"].value != "sophie.bluel@test.tld") {
        erreur = "Adresse E-mail inconnu"
    }
    if (inputs["password"].value != "S0phie") {
        erreur = "Mot de passe invalide"
    }
    for (let i = 0 ; i < inputs.length ; i++) {
        if (!inputs[i].value) {
            erreur = "Veuillez remplir les champs vides"
        }
    }
    if (erreur) {
        event.preventDefault()
        document.getElementById("erreur").innerHTML = erreur;
    }  else {
         event.preventDefault()
        location.href = "http://127.0.0.1:5500/FrontEnd/indexlogin.html"
    }
});