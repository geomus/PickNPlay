const fs = require("fs");
const path = require("path");

let productsPath = path.join(__dirname, "..", "data", "productos.json");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function getProducts() {
  let products = fs.readFileSync(productsPath, "utf8");
  return products != "" ? JSON.parse(products) : [];
}
let productos = getProducts();
const controller = {
  list: (req, res) => {
    res.render("list", { title: "Catalogo", productos, puntoMil: toThousand });
  },
  detalle: (req, res) => {
    console.log(req.params.id);
    let productos = getProducts();
    let producto = productos.find((prod) => prod.id == req.params.id);
    console.log(producto);
    res.render("detalle", { title: "Detalle Producto", producto, toThousand });
  },
  delete: (req, res, next) => {
    console.log("controller delete");

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
  //get
  productAdd: (req, res) => {
    res.render("productAdd", { title: "Admin-Control" });
  },
  //post
  add: (req, res, next) => {
    //Elegir Id
    let ids = productos.map((prod) => prod.id);
    // Math.max(1,2,3) -> 1
    let id = Math.max(...ids) + 1; //2
    //creo el producto con los datos  del form
    req.body.price = Number(req.body.price);
    req.body.discount = Number(req.body.discount);
    req.body.cantidad = Number(req.body.cantidad);

    let productoNuevo = {
      id: id,
      ...req.body,
      image: " ",
    };

    //agrego el producto nuevo al array de productos
    let final = [...products, productoNuevo];

    fs.writeFileSync(productosPath, JSON.stringify(final, null, " "));
    //redirecciono a la lista de productos
    res.redirect("/products");
  },
};

module.exports = controller;
