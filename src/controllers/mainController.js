const fs = require('fs');
const path = require('path');

let productsPath = path.join(__dirname,'..','data','productos.json');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function getProducts() {
	let products = fs.readFileSync(productsPath, "utf8")
    return products != '' ? JSON.parse(products) : []
};
let productos = getProducts();
const destacados = productos.filter(prod =>prod.destacado==true);
let errors ;

const controller = {
	home: (req, res) => {
		res.locals.showModal = false;
		res.render('index',{title: 'Home', destacados, puntoMil:toThousand, errors});
	},
	carrito: (req, res) => {
		res.render('carrito',{title: 'Carro Compras', errors});
	}
};

module.exports = controller;