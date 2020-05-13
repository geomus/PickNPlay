// const fs = require('fs');
// const path = require('path');

// ************ Function to Read an HTML File ************
// function readEJS (fileName) {
// 	let ejsFile = fs.readFileSync(path.join(__dirname, `/../views/${fileName}.ejs`), 'utf-8');
// 	return ejsFile;
// }

const controller = {
	home: (req, res) => {
		// let ejs = readEJS('index');
		// res.send(ejs);
		res.render('index',{title: 'Home'});
	},
	detalle: (req, res) => {
		res.render('detalle',{title: 'Detalle Producto'})
	}
};

module.exports = controller;