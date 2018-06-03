const BaseObject = require('./base-object');


class Consulta extends BaseObject {

    constructor(data) {
        super(data);

        if (data) {
            this._nome = data.nome;
            this._sexo = data.sexo;
            this._idade = data.idade;
            this._endereco = data.endereco;
            this._sintomas = data.sintomas;
            this._medico = data.medico;

        }
    }

    get nome() {
        return this._nome;
    }

    set nome(value) {
        this._nome = value;
    }

    get sexo() {
        return this._sexo;
    }

    set sexo(value) {
        this._sexo = value;
    }

    get idade() {
        return this._idade;
    }

    set idade(value) {
        this._idade = value;
    }

    get endereco() {
        return this._endereco;
    }

    set endereco(value) {
        this._endereco = value;
    }

    get sintomas() {
        return this._sintomas;
    }

    set sintomas(value) {
        this._sintomas = value;
    }

    get medico() {
        return this._medico;
    }

    set medico(value) {
        this._medico = value;
    }
}

module.exports = Consulta;