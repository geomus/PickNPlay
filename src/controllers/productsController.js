const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize")
const { check, validationResult, body } = require("express-validator");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    list: (req, res) => {
        if (!req.params.id){
        db.Articles.findAll({ include: ["category"] }).then((productos) =>
            res.render("list", {
                productos: productos,
                toThousand: toThousand,
                title: "Listado Productos",
                cardsTitle:'Catalogo'
            })
        );
    }else{
        db.Articles.findAll({ include: ["category"], where: {category_id:req.params.id} }).then((productos) =>
        res.render("list", {
            productos: productos,
            toThousand: toThousand,
            title: "Listado Productos",
            cardsTitle:''
        })
        );
    }
    },
    search: async (req, res) => {
        try {
            let search = req.query.q;
            let productos = await db.Articles.findAll({ include: ["category"],
            where: {
                name : {[Op.like]:'%'+ search +'%'}
            }});
            return res.render("search", {
                title: `Resultados para ${search}`,
                productos,
                toThousand: toThousand,
                search,
                exist: productos.length
            });
        } catch (error) {
            console.log(error);
        }
    },
    detalle: async (req, res) => {
        try {
            let producto = await db.Articles.findByPk(req.params.id, { include: ["category",'brand'] })
            let pictures = JSON.parse(producto.image);

            // separar categoria de la subcategoria (si la hay)
            let cat, subcat;
            if (producto.category.parent_id != null) {
                cat = await db.Categories.findOne({where:{
                    id: producto.category.parent_id
                }})
                subcat = producto.category.name;
            } else {
                cat = producto.category;
                subcat = "";
            };

            return res.render("detalle", {
                title: `Detalle ${producto.name}`,
                producto: producto,
                cat: cat.name,
                subcat: subcat,
                toThousand: toThousand,
                pictures: pictures
            })
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        let deletedArticle = await db.Articles.findByPk(req.params.id);
        await db.Articles.destroy({
            where: {
                id: req.params.id,
            },
        });
        let arrayImages = JSON.parse(deletedArticle.image);
        arrayImages.forEach((image) =>
            fs.unlinkSync(
                path.join(
                    __dirname,
                    `../../public/images/imgInstrumentos/${image}`
                )
            )
        );
        return res.redirect("/products/list/");
    },

    editView: async (req, res) => {
        let categories = await db.Categories.findAll({ where:{
            parent_id: {
                [Op.is]: null
            }
        }})
        let subcategories = await db.Categories.findAll({ where:{
            parent_id: {
                [Op.not]: null
            }
        }})
        //console.log(subcategories)
        let producto = await db.Articles.findByPk(req.params.id, { include: ["category"] })
        return res.render("edit", {
        title: "Editar Producto",
        categories: categories,
        subcategories: subcategories,
        producto: producto
        });
    },

    edit: async (req, res) => {
        try {
            let errors = validationResult(req);
            let images = [];
            for (let i = 0; i < req.files.length; i++) {
                images.push(req.files[i].filename);
            }
            if (!errors.isEmpty()) {
                //si hay algun error del validator, borra las imagenes que subio previamente el multer en le ruta
                images.forEach((image) => {
                    if (image != []) {
                        fs.unlinkSync(
                            path.join(
                                __dirname,
                                `../../public/images/imgInstrumentos/${image}`
                            )
                        );
                    }
                });
                console.log(errors);
                res.redirect("/");
            } else {

                //primero borra imagenes de actuales del producto de la carpeta public
                let product = await db.Articles.findByPk(req.params.id)
                let arrayImages = JSON.parse(product.image);
                arrayImages.forEach((image) =>
                    fs.unlinkSync(
                        path.join(
                            __dirname,
                            `../../public/images/imgInstrumentos/${image}`
                        )
                    )
                );

                //despues crea string de nombre de imagenes seleccionadas en el multer para mandar a db
                let images = [];
                for (let i = 0; i < req.files.length; i++) {
                    images.push(req.files[i].filename);
                }
                let imagesString = JSON.stringify(images);

                // seteo categoria
                let categoryFinal = "";
                if (req.body.subcategory != "") {
                    categoryFinal = Number(req.body.subcategory);
                } else {
                    categoryFinal = Number(req.body.category);
                }
                //por ultimo edita el articulo  en la db
                await db.Articles.update(
                    {
                        name: req.body.name,
                        price: req.body.price,
                        discount: req.body.discount,
                        stock: req.body.stock,
                        category_id: categoryFinal,
                        serialNumber: req.body.serialNumber,
                        outstanding: req.body.destacado,
                        description: req.body.description,
                        image: imagesString,
                    },
                    {
                        where: { id: req.params.id },
                    }
                )
                await res.redirect("/products/list/")
            }
        } catch (error) {
            console.log(error);
        }
    },

    productAdd: async (req, res) => {
        let categories = await db.Categories.findAll({ where:{
            parent_id: {
                [Op.is]: null
            }
        }})
        let subcategories = await db.Categories.findAll({ where:{
            parent_id: {
                [Op.not]: null
            }
        }})
        return res.render("productAdd", {
            categories: categories,
            subcategories: subcategories,
            title: "Agregar Productos"}
        )
    },
    add: function (req, res) {
        let errors = validationResult(req);
        let images = [];
        for (let i = 0; i < req.files.length; i++) {
            images.push(req.files[i].filename);
        }
        //console.log(images);
        if (!errors.isEmpty()) {
            //si hay algun error del validator, borra las imagenes que subio previamente el multer en le ruta
            images.forEach((image) => {
                if (image != []) {
                    fs.unlinkSync(
                        path.join(
                            __dirname,
                            `../../public/images/imgInstrumentos/${image}`
                        )
                    );
                }
            });
            console.log(errors);
            res.redirect("/");
        } else {

            //crea string de nombre de imagenes para mandar a db
            let imagesString = JSON.stringify(images);
            // asigna numero de categoria padre si no hay subcategoria, sino el de la subcategoria
            let categoryFinal = "";
            if (req.body.subcategory != "") {
                categoryFinal = req.body.subcategory;
            } else {
                categoryFinal = req.body.category;
            }
            categoryFinal = Number(categoryFinal)

            //crea articulo en la db
            db.Articles.create({
                name: req.body.name,
                price: req.body.price,
                discount: req.body.discount,
                stock: req.body.stock,
                category_id: categoryFinal,
                serialNumber: req.body.serialNumber,
                outstanding: req.body.destacado,
                description: req.body.description,
                image: imagesString,
            })
            .then(() => res.redirect("/products/list/"))
            .catch((error) => console.log(error));
        }
    },
};

module.exports = controller;
