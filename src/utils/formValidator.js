//fonction de validation du formulaire
function validateForm() {
    let isValid = true;
    let form = document.querySelector('form');

    //réinitialise les erreurs du formulaire
    //On pré remplit les content des formData avec " "
    form.querySelectorAll("div.input").forEach(function (divTmp) {
        if(divTmp.querySelector('p.error'))
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

            if (!emailRegex.test(inputTmp.value.toLowerCase())){
                isValid = false;
                errorInField(inputTmp);
            }
        }
    });

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
