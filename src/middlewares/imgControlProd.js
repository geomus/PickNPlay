module.exports = (req,res, next) => {
    req.body.file = req.files
    next()
    }
//agrega el files al body para poder verlo desde express validator