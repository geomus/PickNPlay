module.exports = (req, res, next) => {
    res.locals.showModal = '';
    res.locals.errorsL = undefined;
    next();
};
