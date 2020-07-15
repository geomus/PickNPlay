alert("Hola acá es, buenos dias!")
window.addEventListener('load',()=>{
    const form = document.querySelector('#form-UserAdd');
    
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const email = document.querySelector('#email');
    const pass = document.querySelector('#pass');
    const repass = document.querySelector('#repass');
    //const avatar = document.querySelector('#avatars')
    const errorElement = document.querySelector('.error')

    


    form.addEventListener("submit",(e) =>{
        let messages = [ ]
        if (firstName.value.trim()== ' ' || firstName.value==null ){
        messages.push("Nombre es requerido")
        }
        if(lastName.value.trim() == '' || lastName.value==null){
            messages.push("Apelido es requerido")
        }
        if(pass.value.length <=6){
            messages.push('Debe contener mas de 2 caracteres')
        }
        if(pass.value.length >=20){
            messages.push('Debe contener menos de 20 caracteres')
        }
        if(pass.value ==='contraseña'){
            massages.push('la contraseña no puede ser contraseña')
        }
        if(repass.value === (pass.value)){
            messages.push('La contraseña debe ser la misma')
        }
        if (messages.lenght >0){
            e.preventDefault()
            errorElement.innerText = messages.join(' , ')
        }

    })


       
    //Validando email
    if (email.value.trim() == "") {
        errors.push("El correo es obligatorio");
    }
    

   

    //Validar Imagen
    function validarImagen(obj){
        let uploadFile = obj.files[0];
    
        if (!window.FileReader) {
            alert('El navegador no soporta la lectura de archivos');
            return;
        }
    
        if (!(/\.(jpg|png|gif|jpeg)$/i).test(uploadFile.avatar)) {
            alert('El archivo a adjuntar no es una imagen');
        }
        else {
            var img = new Image();
            img.onload = function () {
                if (this.width.toFixed(0) != 200 && this.height.toFixed(0) != 200) {
                    alert('Las medidas deben ser: 200 * 200');
                }
                else if (uploadFile.size > 20000)
                {
                    alert('El peso de la imagen no puede exceder los 200kb')
                }
                else {
                    alert('Imagen correcta :)')                
                }
            };
            img.src = URL.createObjectURL(uploadFile);
        }                
        //e.preventDefault()
    }
})
