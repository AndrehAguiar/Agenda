exports.mddRegister = (req, res, next) => {
    res.locals.formAction = "/register/confirm";
    res.locals.btnText = "Registrar";
    res.locals.formTitle = "Usuário cadastrado com sucesso!";
    next();
}