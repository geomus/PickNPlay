let db = require("../../database/models");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");
const { validationResult } = require("express-validator");
//const { Op } = db.Sequelize;
//let cors = requiere ('cors')

const controller = {
    listUsers: async (req, res) =>{
        const users = await db.Users.findAll();
        res.json({
            meta:{
                status: 200,
                count: users.length,
                link: '/api/users/'
            },
            data: users.map(user => {
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName:user.lastName,
                    email: user.email,
                    detail: `/api/users/${user.id}`
                }
            })
        })

    },

    profileOneUser: async (req, res) => {
        const user = await db.Users.findByPk(req.params.id)
        res.json({
            meta:{
                status: 200,
                link: `/api/users/${user.id}`
            },
            data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar
                }
            });
    },

    listProducts: async (req, res) => {
        let products = await db.Articles.findAll({ include: ["category"] })
        let categories = await db.Categories.findAll()

        let countProd = products.length
        //console.log(categories);
        //console.log(products);
        let productos =  products.map (product => {return {
            id: product.id,
            name: product.name,
            category_id: product.category_id,
            categorie: product.category.name,
            description: product.description,
            detail: `/api/products/${product.id}`
        }})
        
        let accesorios = 0
        let baterias = 0
        let bajos = 0
        let teclados = 0
        let acusticas = 0
        let clasicas = 0
        let electricas = 0
        for (let producto of productos){
            //console.log(producto.category_id);
            switch(producto.category_id){
                case 1 : accesorios = accesorios + 1
                break
                case 2 : baterias = baterias + 1
                break
                case 3 : bajos = bajos + 1
                break
                case 5 : teclados = teclados + 1
                break
                case 6 : acusticas = acusticas +1
                break
                case 7 : clasicas = clasicas +1
                break
                case 9 : electricas = electricas +1
                break
            }
        }
        let countByCategory = {
            accesorios:accesorios,
            baterias:baterias,
            bajos:bajos,
            teclados:teclados,
            acusticas:acusticas,
            clasicas:clasicas,
            electricas:electricas
        }
        //console.log(bajos);
        //console.log(accesorios);
        //console.log(teclados);
        res.json({
            meta:{
                status: 200,
                link: `/api/products/`
            },
            data:{
                productsList:productos,
                count: countProd,
                countByCategory: countByCategory

            }

    })}

}

module.exports = controller;
