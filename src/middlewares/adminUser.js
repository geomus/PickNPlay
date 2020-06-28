module.exports = (req,res, next) => {
    if(req.session.logedUser){
        if(req.session.logedUser.isAdmin){
            next()
        }
    } else {
        res.send('Acceso no autorizado, solo administradores')
    }
}