const fs = require('fs');
const path = require('path');

let productsPath = path.join(__dirname,'..','data','productos.json');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function getProducts() {
    let products = fs.readFileSync(productsPath, "utf8")
    return products != '' ? JSON.parse(products) : []
};

const controller = {
	list: (req, res) => {
        let productos = getProducts();
        res.render('list',{title: 'Catalogo', productos, puntoMil:toThousand});
    },
    detalle: (req, res) => {
		res.render('detalle',{title: 'Detalle Producto'})
    },
    delete: (req, res, next) => {
        
        res.redirect('list');
    },
    editView: (req, res) => {
        res.render('edit',{title: 'Editar producto'});
    },
    edit: (req, res, next) => {

        res.redirect('list');
    },
    productAdd: (req, res) => {
        res.render('productAdd',{title: 'Admin Control'});
    },
    add: (req, res, next) => {

        res.redirect('list');
    }
};

module.exports = controller;