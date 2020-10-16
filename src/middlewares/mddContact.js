exports.mddContact = (req, res, next) => {
    res.locals.formAction = "/contact/confirm";
    res.locals.btnText = "Gravar";
    res.locals.formTitle = "Registro de contato.";
    res.locals.formDescr = "Cadastre o seu contato abaixo.";
    next();
};

exports.mddCttUpdate = (req, res, next) => {
    res.locals.formAction = '/contact/update/';
    res.locals.btnText = "Atualizar";
    res.locals.formTitle = "Editar contato.";
    res.locals.formDescr = "Atualize o seu contato abaixo.";
    next();
};