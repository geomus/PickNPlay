window.addEventListener("load", () => {
    let formProduct = document.querySelector("form.formProduct");
    let errores = document.querySelector("form div.errors ul");
    let name = document.querySelector("input.name");
    let price = document.querySelector("input.price");
    let discount = document.querySelector("input.discount");
    let stock = document.querySelector("input.stock");
    let serialNumber = document.querySelector("input.serialNumber");
    let description = document.querySelector("textarea.description");
    let image = document.querySelector("input.image");


    formProduct.addEventListener("submit", (e) => {
        let errors = [];

        if(name.value.trim() == "" || name.value.length < 5) {
            errors.push("El NOMBRE es obligatorio, y de mínimo 5 caracteres");
        }
        if (price.value.trim() == "" || Number(price.value) == 0) {
            errors.push("El PRECIO es obligatorio y no puede ser 0");
        }
        if (discount.value.trim() == "" || Number(discount.value) > 99) {
            errors.push("El DESCUENTO no debe superar el 100%");
        }
        if (stock.value.trim() == "" || Number(stock.value) > 999 || Number(stock.value) == 0) {
            errors.push("El STOCK debe estar entre 1 y 999");
        }
        if (serialNumber.value.trim() == "") {
            errors.push("El Nº de SERIAL es obligatorio");
        }
        if (description.value.trim() == "" || description.value.length < 20) {
            errors.push("La DESCRIPCIÓN debe tener un minimo de 20 caracteres");
        }

        //  validar formato de una imagen
        function validateType (fileName){
            let fileType = (fileName).split(".");
            if((fileType.find(type => type=="jpg" || type=="jpeg" ||type=="gif" || type=="png")) !== undefined){
                return true;
            } else {
                return false;
            }
        }

        // validar formato de todas las imágenes (CORREGIR)
        function validateTypeAll () {
            let valid = [];
            for (let i = 0; i < image.files.length; i++) {
                if (validateType(image.files[i].name)) {
                    valid.push(true);
                } else {
                    valid.push(false);
                };
            }
            return valid;
        }
        // let validation = validateTypeAll();

        // if (validation.includes(false)) {
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
});