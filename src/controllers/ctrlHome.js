const Contact = require('../models/Contact');

exports.index = async (req, res) => {
    const lstContact = await Contact.contactList();
    res.render('index', { lstContact });
};
