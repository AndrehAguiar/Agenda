exports.mddLogin = (req, res, next) => {
    res.locals.formAction = "/login/confirm";
    res.locals.btnText = "Entrar";
    res.locals.formTitle = "Formulário de login.";
    res.locals.formDescr = "Faça login ou <a href='./register'>registre a sua conta aqui.</a>";
    next();
}