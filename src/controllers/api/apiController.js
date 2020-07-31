let db = require("../../database/models");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");
const { validationResult } = require("express-validator");
// const { Op } = db.Sequelize;
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
                    detail: `/api/profile/${user.id}`
                }
            })
        })

    },

    profileOneUser: async (req, res) => {
        const user = await db.Users.findByPk(req.params.id)
        res.json({
            meta:{
                status: 200,
                link: `/api/profile/${user.id}`
            },
            data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    rating: user.rating,
                    avatar: user.avatar,
                }
            });
    },

    listProducts: async (req, res) => {
        let products = await db.Articles.findAll()
        //console.log(products);
        res.json({
            meta:{
                status: 200,
                link: `/api/products/`
            },
            data: products.map (product => {return {
                id: product.id,
                name: product.name
            }})

    })}
    

}

module.exports = controller;
