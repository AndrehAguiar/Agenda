exports.mddRegister = (req, res, next) => {
    res.locals.formAction = "/register/confirm";
    res.locals.btnText = "Registrar";
    res.locals.formTitle = "Formulário de cadastro";
    res.locals.formDescr = "Registre sua conta ou faça <a href='./login'>login aqui.</a>"
    next();
}