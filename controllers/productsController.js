const fs = require('fs');
const path = require('path');

let productsPath = path.join(__dirname,'..','data','productos.json');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function getProducts() {
    let products = fs.readFileSync(productsPath, "utf8")
    return products != '' ? JSON.parse(products) : []
};
let productos = getProducts();
const controller = {
	list: (req, res) => {

        res.render('list',{title: 'Catalogo', productos, puntoMil:toThousand});
    },
    detalle: (req, res) => {
        console.log(req.params.id);
        let productos = getProducts();
        let producto = productos.find((prod) => prod.id == req.params.id);
        console.log(producto);
        res.render('detalle',{title: 'Detalle Producto',producto, toThousand})
    },
    // Detail - Detail from one product
    //detail: (req, res) => {
    //    let producto = products.find((prod) => //prod.id == req.params.productId);
    //    res.render("detail", { producto, enMiles: //toThousand });
    //},


    delete: (req, res, next) => {
        
        res.redirect('list');
    },
    editView: (req, res) => {
        let producto = productos.find(prod => prod.id == req.params.id);
        res.render('edit',{title: 'Editar producto',producto});
    },
    edit: (req, res, next) => {
        req.body.price = Number(req.body.price);//paso text a num
        let moded = productos.map(prod => {
            //busca el prod por id, devuelve un objeto lit con los campos del form
			if(prod.id == req.params.id){
				return {
					id: prod.id,
					...req.body,
                    image: prod.image,
                    discount: prod.discount,
                    destacado: prod.destacado
				}
			} else {
				return prod
			}
        });
        //escribe el JSON
        fs.writeFileSync(productsPath, JSON.stringify(moded, null, ' '));
        res.redirect('/products');
    },
    productAdd: (req, res) => {
        res.render('productAdd',{title: 'Admin Control'});
    },
    add: (req, res, next) => {

        res.redirect('list');
    }
};

module.exports = controller;