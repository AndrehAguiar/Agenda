const Login = require('../models/Login');

exports.index = (req, res) => {
    res.render('./register');
};

exports.confirm = async (req, res) => {
    try {
        const user = new Login(req.body);

        await user.register();

        if (user.errors.length > 0) {
            req.flash('errors', user.errors);
            req.session.save(() => {
                return res.redirect('../register');
            });
            return;
        }
        req.flash('success', 'Usuário cadastrado com sucesso!');
        await user.login();
        req.session.user = user.user;
        req.session.save(() => {
            res.redirect('../');
        });
        return;
    } catch (err) {
        console.log(err);
        return res.render('error');
    }
};