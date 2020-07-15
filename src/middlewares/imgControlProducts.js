module.exports = (req,res, next) => {
    req.body.files = req.files
    next()
    }