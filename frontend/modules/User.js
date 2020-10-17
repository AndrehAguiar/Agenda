import validator from 'validator';

export default class User {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
        this.spError = document.createElement('span');
        this.spError.className = 'invalid';
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const inpEmail = el.querySelector('input[name="email"]');
        const inpPassword = el.querySelector('input[name="password"]');
        let error = false;

        if (!validator.isEmail(inpEmail.value)) {
            this.spError.innerText = 'E-mail inválido.';
            inpEmail.insertAdjacentElement('afterend', this.spError);
            error = true;
            return;
        }

        if (inpPassword.value.length < 6 || inpPassword.value.length > 15) {
            this.spError.innerText = 'A senha precisa ter de 6 a 15 caracteres.';
            inpPassword.insertAdjacentElement('afterend', this.spError);
            error = true;
            return;
        }

        if (!error) el.submit();
    }
}