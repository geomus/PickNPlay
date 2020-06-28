module.exports = function (req, res, next) {
    res.locals.frontLogedUser = false;
    if (req.session.logedUser != undefined) {
        res.locals.frontLogedUser = req.session.logedUser;
    }else if(req.cookies.userLog){
        //si esta la cookie con el usuario se lo pasamos a la sesion a la vista
        req.session.logedUser = req.cookies.userLog;
        res.locals.frontLogedUser =  req.cookies.userLog;
    }
    next();
};
//este midleware asigna el usuario a locals  y se pone a disposicion de todas las rutas en el app.js