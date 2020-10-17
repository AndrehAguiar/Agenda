import validator from 'validator';

export default class Contact {
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
        const inpName = el.querySelector('input[name="name"]');
        const inpEmail = el.querySelector('input[name="email"]');
        const inpPhone = el.querySelector('input[name="phone"]');
        let error = false;

        if (validator.isEmpty(inpName.value)) {
            this.spError.innerText = 'O campo nome é obrigatório.';
            inpName.insertAdjacentElement('afterend', this.spError);
            error = true;
            return;
        }

        if (validator.isEmpty(inpPhone.value) && validator.isEmpty(inpEmail.value)) {
            this.spError.innerText = 'Informe pelo menos 1 meio de contato.';
            inpPhone.insertAdjacentElement('afterend', this.spError);
            inpEmail.insertAdjacentElement('afterend', this.spError);
            error = true;
            return;
        }
        if (!validator.isEmpty(inpEmail.value) && !validator.isEmail(inpEmail.value)) {
            this.spError.innerText = 'E-mail inválido.';
            inpEmail.insertAdjacentElement('afterend', this.spError);
            error = true;
            return;
        }

        if (!error) el.submit();
    }
}