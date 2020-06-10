module.exports = (req,res, next) => {
    if(req.session.logedUser) {
        res.redirect('/');
    } else {
        next()
    }
}