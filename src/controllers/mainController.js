const db = require("../database/models");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	home: async (req, res) => {
		let destacados = await db.Articles.findAll({ include: ["category"] , where:{
            outstanding: 1
        }})
		res.locals.showModal = false;
		res.render('index',{title: 'Home', destacados, puntoMil:toThousand});
	},
	carrito: (req, res) => {
		res.render('carrito',{title: 'Carro Compras'});
	}
};

module.exports = controller;