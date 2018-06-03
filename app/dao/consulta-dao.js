// Responsável pelo tratamento do modelo da classe 'Formulário'.
// Author: Hiago Forte

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ConsultaSchema = mongoose.Schema({
    createdAt: Date,
    updatedAt: Date,
    id: String,
    nome: String,
    sexo: String,
    idade: Number,
    endereco: String,
    sintomas: String,
    medico: String
});

const ConsultaDTO = mongoose.model('bank', ConsultaSchema);
const Consulta = require('../model/consulta');

class ConsultaDAO {
    constructor() {

    }

    findAll() {
        return new Promise((onSuccess, onError) => {
            ConsultaDTO.find()
                .then((consultasAchadas) => {
                    let consultas = consultasAchadas.map((c) => new Consulta(c));
                    onSuccess(consultas);
                }).catch((err) => {
                onError(err);
            });
        });
    }

    findById(id) {
        return new Promise((onSuccess, onError) => {
            ConsultaDTO.findOne({
                _id: mongoose.Types.ObjectId(id),
                deletedAt: {
                    $exists: false
                }
            }).then((consultaEncontrada) => {
                if (consultaEncontrada) {
                    let consulta = new Consulta(consultaEncontrada);
                    onSuccess(consulta);
                } else {
                    onSuccess(null);
                }
            }).catch((err) => {
                console.error(err);
                onError(err);
            });
        });
    }

    save(consulta) {
        console.info(consulta);
        return new Promise((onSuccess, onError) => {
            let novaConsulta = new ConsultaDTO({
                createdAt: consulta.createdAt,
                updatedAt: consulta.updatedAt,
                nome: consulta.nome,
                sexo: consulta.sexo,
                idade: consulta.idade,
                endereco: consulta.endereco,
                sintomas: consulta.sintomas,
                medico: consulta.medico,
            });
            novaConsulta.save()
                .then((consultaSalva) => {
                    consulta.objectId = consultaSalva._id;
                    onSuccess(consulta);
                }).catch((err) => {
                onError(err);
            });
        });
    }

    findAndUpdate(consulta) {
        return new Promise((onSuccess, onError) => {
            ConsultaDTO.findOneAndUpdate({
                _id: consulta.objectId
            }, {
                $set: {
                    nome: consulta.nome,
                    sexo: consulta.sexo,
                    idade: consulta.idade,
                    endereco: consulta.endereco,
                    sintomas: consulta.sintomas,
                    medico: consulta.medico,
                    updatedAt: new Date()
                }
            }, {
                new: true
            }, (err, novaConsulta) => {
                if (err) {
                    onError(err);
                } else {
                    let consulta = new Consulta(novaConsulta);
                    onSuccess(consulta);
                }
            });
        });
    }
}

module.exports = ConsultaDAO;