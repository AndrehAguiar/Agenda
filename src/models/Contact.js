const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    createdAt: { type: Date, default: Date.now() }
});

const ClsContact = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async register() {
        this.validate();
        if (this.errors.length > 0) return;
        this.contact = await ClsContact.create(this.body);
    }

    async update(id) {
        if (typeof id !== 'string') return;
        this.validate();
        if (this.errors.length > 0) return;
        this.contact = await ClsContact.findByIdAndUpdate(id, this.body, { new: true });
    }

    validate() {
        this.cleanUp();

        // O e-mail precisa ser um e-mail válido
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
        if (!this.body.name) this.errors.push('O nome é um campo obrigatório.');
        if (!this.body.email && !this.body.phone) {
            this.errors.push(`Algum meio de contato deve ser informado, telefone ou e-mail.`);
        }
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            name: this.body.name,
            lastname: this.body.lastname,
            email: this.body.email,
            phone: this.body.phone
        };
    }

    static async searchId(id) {
        if (typeof id !== 'string') return;
        const contact = await ClsContact.findById(id);
        return contact;
    }

    static async contactList() {
        const lstContact = await ClsContact.find()
            .sort({ createdAt: -1 });
        return lstContact;
    }

    static async delete(id) {
        if (typeof id !== 'string') return;
        const contact = await ClsContact.findByIdAndDelete({ _id: id });
        return contact;
    }
}

module.exports = Contact;