module.exports = function (req, res, next) {
    res.locals.frontLogedUser = false;
    if (req.session.logedUser != undefined) {
        res.locals.frontLogedUser = req.session.logedUser;
        //console.log(res.locals.frontLogedUser);
    }
    next();
};
//este midleware asigna el usuario a locals  y se pone a disposicion de todas las rutas en el app.js