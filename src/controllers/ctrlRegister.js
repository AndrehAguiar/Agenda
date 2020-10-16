const Login = require('../models/Login');

exports.index = (req, res) => {
    res.render('./register');
};

exports.confirm = async (req, res) => {
    try {
        const login = new Login(req.body);

        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('../register');
            });
            return;
        }
        req.flash('success', 'Usuário cadastrado com sucesso!');
        req.session.save(() => {
            return res.redirect('../register');
        });

        return res.send(login.success);
    } catch (err) {
        console.log(err);
        return res.render('error');
    }
};