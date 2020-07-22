window.addEventListener("load", () => {
    let formUser = document.querySelector('form.formUser');
    let firstName = document.querySelector("input.firstName");
    let lastName = document.querySelector('input.lastName');
    let email = document.querySelector('input.email');
    let pass = document.querySelector('input.pass');
    let repass = document.querySelector('input.repass');
    let avatar = document.querySelector("input.avatar");
    let inputs = document.querySelectorAll("input");

    let emailL = document.querySelector('input.emailL');
    let passL = document.querySelector('input.passL');

    // Validar caracteres
    let expEm =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let exp =/^[A-Z]+$/i
    let expP =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

    firstName.addEventListener("blur", ()=> {
        //  || !exp.test(firstName)
        if (firstName.value.trim()=="" || firstName.value.length <2|| !exp.test(firstName.value)) {
            firstName.classList.add("in-valid");
            document.querySelector("small.errorFirstName").style.display ='inline-block';
        } else {
            document.querySelector("small.errorFirstName").style.display ='none';
            firstName.classList.remove("in-valid");
        }
    })

    lastName.addEventListener("blur", ()=> {
        if (lastName.value.trim()== "" || lastName.value.length < 2 || !exp.test(lastName.value)) {
            lastName.classList.add("in-valid");
            document.querySelector("small.errorLastName").style.display ='inline-block';
        } else {
            document.querySelector("small.errorLastName").style.display ='none';
            lastName.classList.remove("in-valid");
        }
    })

    email.addEventListener("blur", ()=> {
        if (email.value.trim()== "" || email.value.length > 20 || !expEm.test(email.value)) {
            email.classList.add("in-valid");
            document.querySelector("small.errorEmail").style.display ='inline-block';
        } else {
            document.querySelector("small.errorEmail").style.display ='none';
            email.classList.remove("in-valid");
        }
    })

    pass.addEventListener("blur", ()=> {
        //  || !expP.test(pass.value)
        if (pass.value.trim()=="" || pass.value.length > 20 || pass.value.length <8) {
            pass.classList.add("in-valid");
            document.querySelector("small.errorPass").style.display ='inline-block';
        } else {
            document.querySelector("small.errorPass").style.display ='none';
            pass.classList.remove("in-valid");
        }
    })

    repass.addEventListener("blur", ()=> {
        if (repass.value.trim()== "" || !(repass.value == pass.value)) {
            repass.classList.add("in-valid");
            document.querySelector("small.errorRepass").style.display ='inline-block';
        } else {
            document.querySelector("small.errorRepass").style.display ='none';
            repass.classList.remove("in-valid");
        }
    })

    //  validar formato de una imagen
    function validateType (fileName){
        let fileType = (fileName).split(".");
        if((fileType.find(type => type=="jpg" || type=="jpeg" ||type=="gif" || type=="png")) !== undefined){
            return true;
        } else {
            return false;
        }
    }

    avatar.addEventListener("blur", ()=> {
        let errorAvatar = document.querySelector("small.errorAvatar");
        if (!validateType(avatar.value)) {
        // if (!validateType(image.value)) {
            avatar.classList.add("in-valid");
            errorAvatar.innerHTML = "Formatos de AVATAR permitidos: JPG, JPEG, PNG, GIF, seleccionar de nuevo";
            errorAvatar.style.display = 'inline-block';
            avatar.value = "";
        } else if(avatar.files.length > 1){
            avatar.classList.add("in-valid");
            errorAvatar.innerHTML = "Máximo 1 AVATAR por usuario, seleccionar de nuevo";
            errorAvatar.style.display = 'inline-block';
            avatar.value = "";
        }
        else {
            avatar.classList.remove("in-valid");
            errorAvatar.style.display ='none';
        };
    })

    // Login
    emailL.addEventListener("blur", ()=> {
        if (emailL.value.trim()== "" || emailL.value.length > 20) {
            emailL.classList.add("in-valid");
            document.querySelector("small.errorEmailL").style.display ='inline-block';
        } else {
            document.querySelector("small.errorEmailL").style.display ='none';
            emailL.classList.remove("in-valid");
        }
    })

    passL.addEventListener("blur", ()=> {
        //  || !expP.test(passL.value) || passL.value.length <8
        if (passL.value.trim()=="" || passL.value.length > 20) {
            passL.classList.add("in-valid");
            document.querySelector("small.errorPassL").style.display ='inline-block';
        } else {
            document.querySelector("small.errorPassL").style.display ='none';
            passL.classList.remove("in-valid");
        }
    })

    formUser.addEventListener("submit", (e) => {
        // check errors, si hay errores no permite el submit
        let hasErrors = () => {
            let errores = [];
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].classList.contains('in-valid')) {
                   errores.push(true);
                } else {
                    errores.push(false);
                };
            };
            return errores;
        };

        //if (hasErrors().includes(true)) {
       //     e.preventDefault();
        //    alert("Tiene errores");
       // };
    });
});



