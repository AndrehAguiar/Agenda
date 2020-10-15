exports.homePage = (req, res) => {
    res.render('index');
};

exports.homePost = (req, res) => {
    res.send(`<h1>Message Posted</h1>`);
};