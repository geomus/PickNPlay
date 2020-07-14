module.exports = (req,res, next) => {
    //console.log(req.files[0]);
    req.body.file = req.files[0]
    //console.log(req.body);
    next()
    }
//agrega el files al body para poder verlo desde express validator