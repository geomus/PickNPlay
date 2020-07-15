module.exports = (req,res, next) => {
    req.body.file = req.files[0]
    next()
    }
//agrega el files al body para poder verlo desde express validator