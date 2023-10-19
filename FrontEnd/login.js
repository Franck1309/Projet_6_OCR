
const url = ('http://localhost:5678/api/users/login');
const data = {
        "email": "sophie.bluel@test.tld" ,
        "password": "S0phie"
};
fetch(url, {
        method :"POST", 
        headers : {"content-type" : "application/json"},
        body :JSON.stringify(data)
})
.then(resp => resp.json())
.then(result => {
    console.log(data)
    console.log(result)
})

const filtresGallery = document.querySelector("#portfolio .filtres")
const contenuGallery = document.querySelector(" #portfolio .gallery")
const formulaireLogin = document.querySelector(".formulaire-login")

formulaireLogin.addEventListener("submit", function(event){
    
    let erreur ;
    const inputs = this;

    if (inputs["email"].value != data.email){
        erreur = "Adresse email incorecte"
    }

    if (inputs["password"].value != data.password){
        erreur = "Mot de passe incorrect"
    }

    for (let i = 0 ; i < inputs.length ; i++){
        if (!inputs[i].value) {
            erreur = "Veuillez remplir tous les champs vide"
        }
    } 

    if (erreur) {
        event.preventDefault()
        document.getElementById("erreur").innerHTML = erreur;
    } else {
        event.preventDefault()
        location.href = "indexlogin.html"
    }
});
