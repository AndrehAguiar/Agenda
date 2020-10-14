exports.mddCheckCSRF = (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
        return res.render('error');
    }
};

exports.mddCSRF = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}