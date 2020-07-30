window.addEventListener("load", () => {
    let formUser = document.querySelector('form.formUser');
    let firstName = document.querySelector("input.firstName");
    let lastName = document.querySelector('input.lastName');
    let email = document.querySelector('input.email');
    let pass = document.querySelector('input.pass');
    let repass = document.querySelector('input.repass');
    let avatar = document.querySelector("input.avatar");
    let inputsUser = document.querySelectorAll(".user");

    let formUserLogin = document.querySelector('form.formUserLogin')
    let emailL = document.querySelector('form.formUserLogin div input.emailL');
    let passL = document.querySelector('form.formUserLogin div input.passL');
    let inputsUserLogin = [emailL, passL];

    let formUserEdit = document.querySelector('form.formUserEdit');
    let inputsUserEdit = document.querySelectorAll(".userEdit");

    // Validar caracteres
    let expEm =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let exp =/^[A-Z]+$/i
    let expP =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

    //  Reset errores
    for (let i = 0; i < inputsUser.length; i++) {
        inputsUser[i].classList.remove("in-valid")
    };
    for (let i = 0; i < inputsUserLogin.length; i++) {
        inputsUserLogin[i].classList.remove("badLogin")
    };
    for (let i = 0; i < inputsUserEdit.length; i++) {
        inputsUserEdit[i].classList.remove("in-valid")
    };

    // Register
    firstName.addEventListener("blur", ()=> {
        //  || !exp.test(firstName)
        if (firstName.value.trim()=="" || firstName.value.length <2|| !exp.test(firstName.value)) {
            firstName.classList.add("in-valid");
            document.querySelector("small.errorFirstName").style.display ='inline-block';
        } else {
            document.querySelector("small.errorFirstName").style.display ='none';
            firstName.classList.remove("in-valid");
        }
    });

    lastName.addEventListener("blur", ()=> {
        if (lastName.value.trim()== "" || lastName.value.length < 2 || !exp.test(lastName.value)) {
            lastName.classList.add("in-valid");
            document.querySelector("small.errorLastName").style.display ='inline-block';
        } else {
            document.querySelector("small.errorLastName").style.display ='none';
            lastName.classList.remove("in-valid");
        }
    });

    email.addEventListener("blur", ()=> {
        // || !expEm.test(email.value)
        if (email.value.trim()== "" || email.value.length > 35 || email.value.length < 4) {
            email.classList.add("in-valid");
            document.querySelector("small.errorEmail").style.display ='inline-block';
        } else {
            document.querySelector("small.errorEmail").style.display ='none';
            email.classList.remove("in-valid");
        }
    });

    pass.addEventListener("blur", ()=> {
        //  || !expP.test(pass.value)
        if (pass.value.trim()=="" || pass.value.length > 20 || pass.value.length < 8) {
            pass.classList.add("in-valid");
            document.querySelector("small.errorPass").style.display ='inline-block';
        } else {
            document.querySelector("small.errorPass").style.display ='none';
            pass.classList.remove("in-valid");
        }
    });

    repass.addEventListener("blur", ()=> {
        if (repass.value.trim()== "" || !(repass.value == pass.value)) {
            repass.classList.add("in-valid");
            document.querySelector("small.errorRepass").style.display ='inline-block';
        } else {
            document.querySelector("small.errorRepass").style.display ='none';
            repass.classList.remove("in-valid");
        }
    });

    //  validar formato de una imagen

    //function validateType (fileName){
    //    let fileType = (fileName).split(".");
    //    if((fileType.find(type => type=="jpg" || type=="jpeg" ||type=="gif" || type=="png")) !== undefined){
    //        return true;
    //    } else {
    //        return false;
    //    }
    //};

    //  validar formato de una imagen
    function validateType(fileName) {
        let fileType = (fileName.split("."))[1].toLowerCase();
        console.log(fileType);
        if (fileType == "jpg" || fileType == "jpeg" || fileType == "gif" || fileType == "png") {
            return true;
        } else {
            return false;
        }
    }

    //avatar.addEventListener("blur", ()=> {
    avatar.addEventListener("change", ()=> {

        let errorAvatar = document.querySelector("small.errorAvatar");
        if (!validateType(avatar.value)) {
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
    });

    formUser.addEventListener("submit", (e) => {
        // check errors, si hay errores no permite el submit
        let errores = [];
        let hasErrors = () => {
            for (let i = 0; i < inputsUser.length; i++) {
                if (inputsUser[i].classList.contains('in-valid')) {
                    errores.push(true);
                } else {
                    errores.push(false);
                };
            };
            return errores;
        };

        if (hasErrors().includes(true)) {
            e.preventDefault();
        };
    });

    // Login
    emailL.addEventListener("blur", ()=> {
        if (emailL.value.trim()== "" || emailL.value.length > 35 || emailL.value.length < 4) {
            emailL.classList.add("badLogin");
            document.querySelector("small.errorEmailL").style.display ='inline-block';
        } else {
            document.querySelector("small.errorEmailL").style.display ='none';
            emailL.classList.remove("badLogin");
        }
    });

    passL.addEventListener("blur", ()=> {
        //  || !expP.test(passL.value)
        if (passL.value.trim()=="" || passL.value.length > 20 || passL.value.length < 8) {
            passL.classList.add("badLogin");
            document.querySelector("small.errorPassL").style.display ='inline-block';
        } else {
            document.querySelector("small.errorPassL").style.display ='none';
            passL.classList.remove("badLogin");
        }
    });

    formUserLogin.addEventListener("submit", (e) => {
        // check errors, si hay errores no permite el submit
        let hasErrorsLogin = () => {
            let errores = [];
            for (let i = 0; i < inputsUserLogin.length; i++) {
                if (inputsUserLogin[i].classList.contains('badLogin')) {
                    errores.push(true);
                } else {
                    errores.push(false);
                };
            };
            return errores;
        };

        if (hasErrorsLogin().includes(true)) {
            e.preventDefault();
        };
    });

    // Edit
    formUserEdit.addEventListener("submit", (e) => {
        // check errors, si hay errores no permite el submit
        let errores = [];
        let hasErrorsEdit = () => {
            for (let i = 0; i < inputsUserEdit.length; i++) {
                if (inputsUserEdit[i].classList.contains('in-valid')) {
                    errores.push(true);
                } else {
                    errores.push(false);
                };
            };
            return errores;
        };

        if (hasErrorsEdit().includes(true)) {
            e.preventDefault();
        };
    });
});