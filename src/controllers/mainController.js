const db = require("../database/models");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	home: async (req, res) => {
		let destacados = await db.Articles.findAll({ include: ["category"] , where:{
            outstanding: 1
        }})
		res.locals.showModal = false;
		res.render('index',{title: 'Home', destacados, puntoMil: toThousand});
	},
	carrito: async (req, res) => {
		let productos = await db.Articles.findAll({ include: ["category"]})
		res.render('carrito',{title: 'Carro Compras', productos});
	}
};

module.exports = controller;