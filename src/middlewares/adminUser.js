// const functions = require('../public/javascripts/userFunctions');
// let usuarios= functions.getUsers;
// let adminUsers= usuarios.filter((user)=>user.lastName == "Admin");

module.exports = (req,res, next) => {
    if(req.session.logedUser){
        if(req.session.logedUser.lastName =="Admin"){
            next()
        }
    } else {
        res.send('Acceso no autorizado, solo administradores')
    }
}