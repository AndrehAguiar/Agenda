exports.mddLogin = (req, res, next) => {
    res.locals.formAction = "/login/confirm";
    res.locals.btnText = "Entrar";
    res.locals.formTitle = "Formulário de login.";
    next();
}