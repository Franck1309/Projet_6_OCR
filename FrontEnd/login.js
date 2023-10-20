const formulaireLogin = document.querySelector(".formulaire-login")
formulaireLogin.addEventListener("submit", function(event){

    event.preventDefault()
    let erreur ;
    const inputs = this;
    const formData = new FormData(formulaireLogin)
    const data = Object.fromEntries(formData)

   
    fetch('http://localhost:5678/api/users/login', {
        method :"POST", 
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(result => {
        console.log(result)
        console.log(data)

    if (result.message === ("user not found")){
        event.preventDefault()
        erreur = "Adresse email incorrect"
    }
    if (result.error){
        event.preventDefault()
        erreur = "Mot de passe incorrect"
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
        location.href = "indexlogin.html"
    };
    })
});
