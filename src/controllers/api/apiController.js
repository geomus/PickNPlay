let db = require("../../database/models");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    listUsers: async (req, res) => {
        const users = await db.Users.findAll();
        res.json({
            meta: {
                status: 200,
                count: users.length,
                link: "/api/users/",
            },
            data: users.map((user) => {
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    detail: `/api/users/${user.id}`,
                };
            }),
        });
    },

    profileOneUser: async (req, res) => {
        const user = await db.Users.findByPk(req.params.id);
        res.json({
            meta: {
                status: 200,
                link: `/api/users/${user.id}`,
            },
            data: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
            },
        });
    },

    listProducts: async (req, res) => {
        let products = await db.Articles.findAll({ include: ["category"] });
        let categories = await db.Categories.findAll();

        let countProd = products.length;
        //console.log(categories);
        //console.log(products);
        let productos = products.map((product) => {
            let fixPrice = toThousand(Math.trunc(product.price))
            //console.log(fixPrice);
            return {
                id: product.id,
                name: product.name,
                category_id: product.category_id,
                category: product.category.name,
                description: product.description,
                price:fixPrice,
                detail: `/api/products/${product.id}`,
            };
        });

        let countByCategory = {
            accesorios: productos.filter((producto) => producto.category_id == 1)
                .length,
            baterias: productos.filter((producto) => producto.category_id == 2)
                .length,
            bajos: productos.filter((producto) => producto.category_id == 3)
                .length,
            teclados: productos.filter((producto) => producto.category_id == 5)
                .length,
            acusticas: productos.filter((producto) => producto.category_id == 6)
                .length,
            clasicas: productos.filter((producto) => producto.category_id == 7)
                .length,
            electricas: productos.filter((producto) => producto.category_id == 8)
                .length,
        };

        res.json({
            meta: {
                status: 200,
                link: `/api/products/`,
            },
            data: {
                productsList: productos,
                count: countProd,
                countByCategory: countByCategory,
            },
        });
    },
    oneProduct: async (req, res) => {
        try {
            const article = await db.Articles.findByPk(req.params.id, {
                include: ["category"],
            });
            //console.log(article)
            let fixPrice = toThousand(Math.trunc(article.price))
            res.json({
                meta: {
                    status: 200,
                    link: `/api/users/${article.id}`,
                },
                data: {
                    id: article.id,
                    name: article.name,
                    price: fixPrice,
                    discount: article.discount,
                    category_id: article.category_id,
                    category: article.category.name,
                    outstanding: article.outstanding,
                    imges: JSON.parse(article.image),
                    description: article.description,
                    createdAt: article.createdAt,
                    updatedAt: article.updatedAt,
                    urlFirstImg: `/images/instrumentos/${
                        JSON.parse(article.image)[0]
                    }`,
                },
            });
        } catch (error) {
            res.json({ error: error });
        }
    },
};

module.exports = controller;
