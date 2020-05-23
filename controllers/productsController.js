const fs = require('fs');
const path = require('path');

const controller = {
	list: (req, res) => {
		res.render('list',{title: 'Catalogo'});
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