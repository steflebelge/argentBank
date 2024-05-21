//fonction de validation du formulaire
function validateForm() {
    let isValid = true;
    let form = document.querySelector('form');

    //réinitialise les erreurs du formulaire
    //On pré remplit les content des formData avec " "
    form.querySelectorAll("div.input").forEach(function (divTmp) {
        divTmp.querySelector('p.error').innerText="";
    });

    //parcours des input.text-control + verification de leur validité
    form.querySelectorAll('input').forEach(function (inputTmp) {
        if (!inputTmp.checkValidity()) {
            isValid = false;
            errorInField(inputTmp);
        }
        if(inputTmp.getAttribute('type') === "mail"){
            // Expression régulière pour valider l'email
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(inputTmp.value)){
                isValid = false;
                errorInField(inputTmp);
            }
        }
    });

    // //verification que les CGU ont bien ete acceptée
    // if (!form.querySelector('input[type="checkbox"]').checkValidity()) {
    //     isValid = false;
    //     errorInField(document.querySelector('input[type="checkbox"]'));
    // }

    //si le formulaire est valide, on recupere puis prepare les données pour un envoi au back end
    // et on affiche le message de confirmation
    if (isValid) {
        //recuperation du FormData correspondant au form
        let formData = new FormData(form);

        //preparation de l'objet Json a envoyer via xhr/fetch
        let jsonData = {};

        //iteration sur les entrees du formulaire pour completer la data a envoyer
        for(const [key, value] of formData.entries()){
            jsonData[key] = value;
        }

        //transforme le json en string pour envoi via xhr/fetch
        let dataToSend = JSON.stringify(jsonData);

        //envoi du formulaire
        alert('todo');
    }

    return isValid;
}

//fonction de gestion d'une erreur
function errorInField(elt) {

    //recuperation du message d'erreur de l'api validation
    let msgError = elt.validationMessage;
    if(msgError === "" && elt.getAttribute('type') === "mail")
        msgError = "Veuillez vérifier que l'email est correctement formaté.";

    //recuperation de la div.formData correspondante a l'element
    let divInput = elt;
    while (!divInput.classList.contains('input')) {
        divInput = divInput.parentElement;
    }

    //set de sa data-error pour affichage du message
    divInput.querySelector('p.error').innerText = msgError;

    elt.focus();
}

export {validateForm, errorInField};
