window.addEventListener("load", () => {
    let formProduct = document.querySelector("form.formProduct");
    let name = document.querySelector("input.name");
    let price = document.querySelector("input.price");
    let discount = document.querySelector("input.discount");
    let stock = document.querySelector("input.stock");
    let serialNumber = document.querySelector("input.serialNumber");
    let description = document.querySelector("textarea.description");
    let image = document.querySelector("input.image");
    let inputsProduct = document.querySelectorAll(".product");

    //  Reset errores
    for (let i = 0; i < inputsProduct.length; i++) {
        inputsProduct[i].classList.remove("in-valid")
    };
    name.addEventListener("blur", ()=> {
        if(name.value.trim() == "" || name.value.length < 5) {
            name.classList.add("in-valid");
            document.querySelector("small.errorName").style.display ='inline-block';
        } else {
            document.querySelector("small.errorName").style.display ='none';
            name.classList.remove("in-valid");
        }
    });

    price.addEventListener("blur", ()=> {
        if (price.value.trim() == "" || Number(price.value) == 0) {
            price.classList.add("in-valid");
            document.querySelector("small.errorPrice").style.display ='inline-block';
        } else {
            document.querySelector("small.errorPrice").style.display ='none';
            price.classList.remove("in-valid");
        }
    })

    discount.addEventListener("blur", ()=> {
        if (discount.value.trim() == "" || Number(discount.value) > 99) {
            discount.classList.add("in-valid");
            document.querySelector("small.errorDiscount").style.display ='inline-block';
        } else {
            document.querySelector("small.errorDiscount").style.display ='none';
            discount.classList.remove("in-valid");
        }
    })

    stock.addEventListener("blur", ()=> {
        if (stock.value.trim() == "" || Number(stock.value) > 999 || Number(stock.value) == 0) {
            stock.classList.add("in-valid");
            document.querySelector("small.errorStock").style.display ='inline-block';
        } else {
            document.querySelector("small.errorStock").style.display ='none';
            stock.classList.remove("in-valid");
        }
    })

    serialNumber.addEventListener("blur", ()=> {
        if (serialNumber.value.trim() == "") {
            serialNumber.classList.add("in-valid");
            document.querySelector("small.errorSerialNumber").style.display ='inline-block';
        } else {
            document.querySelector("small.errorSerialNumber").style.display ='none';
            serialNumber.classList.remove("in-valid");
        }
    })

    description.addEventListener("blur", ()=> {
        if (description.value.trim() == "" || description.value.length < 20) {
            description.classList.add("in-valid");
            document.querySelector("small.errorDescription").style.display ='inline-block';
        } else {
            document.querySelector("small.errorDescription").style.display ='none';
            description.classList.remove("in-valid");
        }
    })

    // validar formato de una imagen
    function validateType (fileName){
        //console.log(fileName);
        //let fileType = (fileName).split(".");
        let fileType = (fileName.split("."))[1].toLowerCase();
        console.log(fileType);
        if (fileType == "jpg" || fileType == "jpeg" || fileType == "gif" || fileType == "png"){
        //if((fileType.find(type => type=="jpg" || type=="jpeg" ||type=="gif" || type=="png")) !== undefined){
            return true;
        } else {
            return false;
        }
    };

    // validar formato de todas las imágenes
    function validateTypeAll () {
        let valid = [];
        for (let i = 0; i < image.files.length; i++) {
            if (validateType(image.files[i].name)) {
                //console.log(image.files[i].name);
                valid.push(true);
            } else {
                valid.push(false);
            };
        };
        return valid;
    };

    //image.addEventListener("blur", ()=> {
    image.addEventListener("change", ()=> {
    
        let errorImage = document.querySelector("small.errorImage");
        if (validateTypeAll().includes(false)) {
            image.classList.add("in-valid");
            errorImage.innerHTML = "Formatos de IMAGEN permitidos: JPG, JPEG, PNG, GIF, seleccionar de nuevo";
            errorImage.style.display = 'inline-block';
            image.value = "";
        } else if(image.files.length > 3){
            image.classList.add("in-valid");
            errorImage.innerHTML = "Máximo 3 IMÁGENES por producto, seleccionar de nuevo";
            errorImage.style.display = 'inline-block';
            image.value = "";
        }
        else {
            image.classList.remove("in-valid");
            errorImage.style.display ='none';
        };
    });


    formProduct.addEventListener("submit", (e) => {
        // check errors, si hay errores no permite el submit
        let hasErrors = () => {
            let errores = [];
            for (let i = 0; i < inputsProduct.length; i++) {
                if (inputsProduct[i].classList.contains('in-valid')) {
                   errores.push(true);
                } else {
                    errores.push(false);
                };
            };
            return errores;
        };
        
        if (hasErrors().includes(true)) {
            console.log(errores);
            e.preventDefault();
        };
    });
});