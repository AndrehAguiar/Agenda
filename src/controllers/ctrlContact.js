exports.contactPage = (req, res) => {
    res.render('index');
};

exports.contactPost = (req, res) => {
    res.send(`<h1>Message Posted</h1>`);
};