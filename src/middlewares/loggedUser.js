module.exports = (req,res, next) => {
    if(req.session.logedUser) {
        // si esta logueado y quiere entrar a un profile
        if (req.params.id){
            if(req.params.id == req.session.logedUser.id){
                next()
            } else {
                res.redirect(`/users/profile/${req.session.logedUser.id}`);
            };
        // si esta logueado pero no entra a info de ningun usuario en particular
        }else {
            next()
        };
    // si NO esta logueado
    }else {
        res.redirect('/');
    };
}
// permite el paso si esta logueado, sino redirect a home