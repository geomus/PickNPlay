const fs = require("fs");
const path = require("path");
const {check, validationResult, body} = require ('express-validator');

let productsPath = path.join(__dirname, "..", "data", "productos.json");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function getProducts() {
  let products = fs.readFileSync(productsPath, "utf8");
  return products != "" ? JSON.parse(products) : [];
}
let productos = getProducts();

const controller = {
    list: (req, res) => {
        res.render("list", {
            title: "Catalogo",
            productos,
            puntoMil: toThousand,
        });
    },
    detalle: (req, res) => {
        let producto = productos.find((prod) => prod.id == req.params.id);
        //console.log(producto);
        res.render("detalle", {
            title: "Detalle Producto",
            producto,
            toThousand,
        });
    },
    delete: (req, res, next) => {
        let aReescribir = productos.filter(
            (unProducto) => unProducto.id != req.params.id
        );
        //console.log(aReescribir);
        fs.writeFileSync(productsPath, JSON.stringify(aReescribir, null, " "));
        res.redirect("/products");
    },
    editView: (req, res) => {
        let producto = productos.find((prod) => prod.id == req.params.id);
        res.render("edit", { title: "Editar producto", producto });
    },
    edit: (req, res, next) => {
        req.body.price = Number(req.body.price);
        req.body.discount = Number(req.body.discount);
        req.body.destacado = Boolean(req.body.destacado);
        let moded = productos.map((prod) => {
            //busca el prod por id, devuelve un objeto lit con los campos del form
            if (prod.id == req.params.id) {
                let images = [];
                // array con las nuevas img
                for (let i = 0; i < req.files.length; i++) {
                    images.push(req.files[i].filename);
                }

                return {
                    id: prod.id,
                    ...req.body,
                    image: prod.image.concat(images),
                };
            } else {
        return prod;
        }
        });
        //escribe el JSON
        fs.writeFileSync(productsPath, JSON.stringify(moded, null, " "));
        res.redirect("/products");
    },
    productAdd: (req, res) => {
        res.render("productAdd", { title: "Admin-Control" });
    },
    add: (req, res, next) => {
        // generar id
        let ids = productos.map((prod) => prod.id);
        let id = Math.max(...ids) + 1;

        // creo el producto con los datos  del form
        req.body.price = Number(req.body.price);
        req.body.discount = Number(req.body.discount);
        req.body.stock = Number(req.body.stock);

        // array img
        let images = [];
        // array con las nuevas img
        for (let i = 0; i < req.files.length; i++) {
        images.push(req.files[i].filename);
        }

        let newProduct = {
        id: id,
        ...req.body,
        image: images
        };

        //agrego el producto nuevo al array de productos
        let final = [...productos, newProduct];
        fs.writeFileSync(productsPath, JSON.stringify(final, null, " "));

        // errores
        let errors = validationResult (req);
        if (errors.isEmpty()){
            //redirecciono a la lista de productos
            res.redirect("/products");
        } else {
            return res.render('error', {errors: errors.errors})
        }
    }
};

module.exports = controller;
