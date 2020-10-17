const Login = require('../models/Login');

exports.index = (req, res) => {
    res.render('login');
};

exports.confirm = async (req, res) => {
    try {
        const login = new Login(req.body);

        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                res.redirect('/login');
            });
            return;
        }
        req.flash('success', 'Olá, você entrou no sistema!');
        req.session.user = login.user;
        req.session.save(() => {
            res.redirect('/');
        });
        res.send(login.success);

    } catch (err) {
        console.log(err);
        return res.render('error');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}