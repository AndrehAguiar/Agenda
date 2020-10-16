const Contact = require('../models/Contact');

exports.index = (req, res, next) => {
    res.render('./contact', {
        contact: {}
    });
    next();
};

exports.confirm = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('../contact'));
            return;
        }
        req.flash('success', 'O contato foi gravado com sucesso!')
        req.session.save(() => res.redirect(`../contact/${contact.contact._id}`));
        return;

    } catch (err) {
        console.log(err);
        return res.render('error');
    }
};

exports.upIndex = async (req, res) => {
    try {
        if (!req.params.id) return res.render('error');

        const contact = await Contact.searchId(req.params.id);
        if (!contact) return res.render('error');

        return res.render('./contact', { contact });

    } catch (err) {
        console.log(err);
        return res.render('error');
    }
};

exports.update = async (req, res) => {
    try {
        if (!req.params.id) return res.render('error');
        const contact = new Contact(req.body);
        await contact.update(req.params.id);

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect(`../${req.params.id}`));
            return;
        }
        req.flash('success', 'O contato foi atualizado com sucesso!');
        req.session.save(() => res.redirect(`../${contact.contact._id}`));
        return;

    } catch (err) {
        console.log(err);
        return res.render('error');
    }
};

exports.delete = async (req, res) => {
    try {
        if (!req.params.id) return res.render('error');

        const contact = await Contact.delete(req.params.id);
        if (!contact) return res.render('error');

        req.flash('success', 'O contato foi apagado com sucesso!');
        req.session.save(() => res.redirect(`back`));
        return;

    } catch (err) {
        console.log(err);
        return res.render('error');
    }
}