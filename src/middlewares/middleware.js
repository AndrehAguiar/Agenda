const session = require("express-session");

exports.mddGlobal = (req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.email = req.session;
    next();
}

exports.mddErrors = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
}
exports.mddCheckCSRF = (err, req, res, next) => {
    if (err) {
        return res.render('error');
    }
    next();
};

exports.mddCSRF = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}