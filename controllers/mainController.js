const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
// function readEJS (fileName) {
// 	let ejsFile = fs.readFileSync(path.join(__dirname, `/../views/${fileName}.ejs`), 'utf-8');
// 	return ejsFile;
// }

const controller = {
	home: (req, res) => {
		res.render('index',{title: 'Home'});
	},
	carrito: (req, res) => {
		res.render('carrito',{title: 'Carro Compras'});
	},
	register: (req, res) => {
		res.render('register',{title: 'Registro'});
	}
};

module.exports = controller;