// Responsável pelo tratamento do modelo da classe 'Formulário'.
// Author: Hiago Forte

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Classe Formulario
 * Id int
 * nome string
 * sexo string
 * idade number
 * medico string
**/

var FormularioSchema = new Schema({
    nome: String,
    sexo: String,
    idade: Number,
    medico: String
});

module.exports = mongoose.model('Formulario', FormularioSchema);