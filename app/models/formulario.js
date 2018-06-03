// Responsável pelo tratamento do modelo da classe 'Formulário'.
// Author: Hiago Forte

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Classe Formulario
**/

var FormularioSchema = new Schema({
    id: String,
    nome: String,
    sexo: String,
    idade: Number,
    endereco: String,
    sintomas: String,
    medico: String
});

module.exports = mongoose.model('Formulario', FormularioSchema);