exports.homePage = (req, res) => {
    res.render('index', {
        titulo: 'Home page',
        subtitulo: 'Donec et laoreet augue',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh mi, malesuada vel laoreet et, laoreet quis risus. Donec et laoreet augue. Nullam pellentesque, massa vel pretium vehicula, purus tortor vehicula turpis, elementum porta sem sem at justo. Mauris auctor tincidunt dapibus. Donec dui tellus, pulvinar tristique massa eget, finibus bibendum nunc. Suspendisse potenti. Maecenas et nibh pretium, bibendum justo mollis, dictum velit. Mauris luctus nisl in urna aliquet tincidunt. Aliquam id sapien rutrum, pulvinar libero vitae, dignissim quam. Maecenas nec aliquet arcu. Praesent consectetur tincidunt lectus vel dapibus. Curabitur vel quam nisi. Duis eget elit aliquam, bibendum augue quis, maximus justo. Quisque porta neque mi, sed ullamcorper nisl consectetur ultricies. Pellentesque rutrum nec diam ac condimentum.',
    });
};

exports.homePost = (req, res) => {
    res.send(`<h1>Message Posted</h1>`);
};