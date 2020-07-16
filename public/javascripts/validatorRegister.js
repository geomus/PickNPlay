alert("Hola acá es, buenos dias!")
window.addEventListener('load',()=>{
   
    // REGISTER
    const formUser = document.querySelector('form.formUser');
    
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const email = document.querySelector('#email');
    const pass = document.querySelector('#pass');
    const repass = document.querySelector('#repass');
    const image = document.querySelector("input.image");
    const errores = document.querySelector("form div.errors ul");
    
    //LOGIN
    const formLogin = document.querySelector('form.formLogin')

    const passL = document.querySelector('#pass-m');
    const emailL = document.querySelector('#email-m');
    const erroresL = document.querySelector("form div.errorsL ul")

    //Registro
    formUser.addEventListener("submit",(e) =>{
      let errors = []

        let expEm =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let exp =/^[A-Z]+$/i
        let expp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

      if (firstName.value.trim()=="" || firstName.value.length < 2 || !exp.test(firstName)){
          errors.push('El nombre es obligatorio, debe contener letras y debe ser mayor a 2 caracteres')
      }
      if (lastName.value.trim()== "" || lastName.value.length < 2 || !exp.test(lastName)){
          errors.push('El apellido es obligatorio, debe contener letras y debe ser mayor a 2 caracteres')
      }
      if(email.value.trim()== ""|| email.value.length >20||!expEm.test(email)){
          errors.push('La email no debe contener espacio, debe ser menor a 20 caracteres, debe contener formato email.')
      }
      if(pass.value.trim()==""||pass.value.length >20 ||!expp.test(pass)){
          errors.push('La contraseña no debe tener espacios, debe contener minimo 8 caracteres, al menos una mayuscula. No acepta emojis')
              
      }
      if (repass.value.trim()== ""||repass.value.length>20|| !expp.test(repass)||repass.value == pass){
          errors.push('La confirmacion debe ser igual a la contraseña')
      }

      function validateType (fileName){
        let fileType = (fileName).split(".");
        if((fileType.find(type => type=="jpg" || type=="jpeg" ||type=="gif" || type=="png")) !== undefined){
            return true;
        } else {
            return false;
        }
    
        }
        if (!validateType(image.value)) {
            errors.push("Formatos de IMAGEN permitidos: JPG, JPEG, PNG, GIF, seleccionar de nuevo");
            image.value = "";
        } else if(image.files.length>3){
            errors.push("Máximo 3 IMÁGENES por producto, seleccionar de nuevo");
            image.value = "";
        }

        if (errors.length > 0) {
            e.preventDefault();
            errors.forEach(error => {
                errores.innerHTML += "<li>" + error + "</li>";
            })
        }
        
    })

     //Login
    formLogin.addEventListener("submit",(e) =>{
        let expEmL =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let exppL =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
        let errorsL = []

        if(emailL.value.trim()== ""|| emailL.value.length >20||!expEmL.test(emailL)){
            errorsL.push('La email no debe contener espacio, debe ser menor a 20 caracteres, debe contener formato email.')
        }
        if(passL.value.trim()==""||passL.value.length >20 ||!exppL.test(passL)){
            errorsL.push('La contraseña no debe tener espacios, debe contener minimo 8 caracteres, al menos una mayuscula. No acepta emojis')
                
        }

        if (errorsL.length > 0) {
            e.preventDefault();
            errorsL.forEach(error => {
                erroresL.innerHTML += "<li>" + error+ "</li>";
            })
        
        }
    })
});

    
     
    
   

    
    

