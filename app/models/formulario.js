// Responsável pelo tratamento do modelo da classe 'Formulário'.
// Author: Hiago Forte

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Classe Formulario
**/

var FormularioSchema = new Schema({
    nome: String,
    sexo: String,
    idade: Number,
    endereço: String,
    sintomas: String,
    medico: String
});

module.exports = mongoose.model('Formulario', FormularioSchema);