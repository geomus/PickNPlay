const fs = require("fs");
const path = require("path");
const db = require('../database/models')
const {check, validationResult, body} = require ('express-validator');

let productsPath = path.join(__dirname, "..", "data", "productos.json");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



const controller = {
    list: (req, res) => {
        db.Articles.findAll().then((productos) =>
            res.render("list", {
                productos:productos,
                toThousand:toThousand,
                title:'listadoProductos'
            })
        );
    },
    detalle: (req, res) => {
        db.Articles.findByPk(req.params.id, { include: ["category"] })
            .then((producto) => {
                pictures = JSON.parse(producto.image);
                return res.render("detalle", {
                    title: "detalleProducto",
                    producto: producto,
                    toThousand: toThousand,
                    pictures: pictures,
                });
            }).catch((error) => console.log(error));
    },

    delete: async (req, res) => {
        let deletedArticle = await db.Articles.findByPk(req.params.id)
        await db.Articles.destroy({
            where:{
                id: req.params.id
            }
        })
        let arrayImages = JSON.parse(deletedArticle.image)
        console.log(arrayImages);
        arrayImages.forEach(image => fs.unlinkSync(path.join(__dirname,`../../public/images/imgInstrumentos/${image}`)))
        return res.redirect('/products')

        //array1.forEach(element => console.log(element));

    },

    editView: (req, res) => {

        db.Articles.findByPk(req.params.id, { include: ["category"] })
            .then((producto) => {
                return res.render("edit", {
                    title: "editProducto",
                    producto: producto,
                });
            }).catch((error) => console.log(error));
    },

    edit: (req, res, next) => {

        //crea string de nombre de imagenes para mandar a db

        let images = [];
        for (let i = 0; i < req.files.length; i++) {
            images.push(req.files[i].filename);
        }
        //console.log(images);

        let imagesString = JSON.stringify(images);
        //console.log(imagesString);

        //crea articulo en la db

        db.Articles.update({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            stock: req.body.stock,
            category_id: req.body.category,
            serialNumber: req.body.serialNumber,
            outstanding: req.body.destacado,
            description: req.body.description,
            image: imagesString
        },{
            where:{id: req.params.id}
        })
            .then(() => res.redirect('/products'))
            .catch((error) => console.log(error));
    },

    productAdd: (req, res) => {
        let categorias = db.Categories.findAll()
            //console.log(categorias)

            .then((categorias) =>
                res.render("productAdd", {
                    categorias: categorias,
                    title: "prodAdd",
                })
            )
            .catch((error) => console.log(error));
    },
    add: function (req, res) {
        //crea string de nombre de imagenes para mandar a db

        let images = [];
        for (let i = 0; i < req.files.length; i++) {
            images.push(req.files[i].filename);
        }
        //console.log(images);

        let imagesString = JSON.stringify(images);
        //console.log(imagesString);

        //crea articulo en la db

        db.Articles.create({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            stock: req.body.stock,
            category_id: req.body.category,
            serialNumber: req.body.serialNumber,
            outstanding: req.body.destacado,
            description: req.body.description,
            image: imagesString
        })
            .then(() => res.redirect('/products'))
            .catch((error) => console.log(error));
    },
};

module.exports = controller;
