const express = require('express');
const Consulta = require('../model/consulta');
const ConsultaDAO = require('../dao/consulta-dao');

class PacienteResource {

    constructor() {
        this._router = express.Router();
        this._dao = new ConsultaDAO();
        this._setup();
    }



    _setup() {
        this._setupCreateConsulta();
        this._setupGetConsulta();
        this._setupGetConsultas();
        this._setupPutConulta();
        this._setupDeleteConsulta();
    }

    _setupCreateConsulta() {
        this.router.post('/', (req, res) => {
            let consulta = new Consulta(req.body);
            this.dao.save(consulta).then((consultaSalva) => {
                if (consulta !== undefined) {
                    res.status(200).json(consulta.toObject());
                }
            }).catch((err) => {
                res.status(400).json({
                    error: {
                        code: 400,
                        message: err.message,
                    }
                });
            });
            res.status(200).json("post ok")
        });
    }

    _setupGetConsulta() {
        this.router.get('/:consultaId', (req, res) => {
            this.dao.findById(req.params.consultaId)
                .then((consulta) => {
                    if (consulta) {
                        res.status(200).json(consulta.toObject());
                    } else {
                        res.status(404).json({
                            error: {
                                code: 404,
                                type: "notFound"
                            }
                        });
                    }
                }).catch((err) => {
                res.status(400).send(err);
            });
        });
    }

    _setupGetConsultas() {
        this.router.get('/', (req, res) => {
            this.dao.findAll()
                .then((consultas) => {
                    let consultasParseds = consultas.map((consulta) => {
                        return consulta.toObject();
                    });
                    res.json(consultasParseds);
                })
                .catch((err) => {
                    res.status(400).send(err);
                });
        });
    }

    _setupPutConulta() {
        this.router.put('/:consultaId', (req, res) => {
            let consultaId = req.params.consultaId;
            let consulta = new Consulta(req.body);

            if (consultaId !== consulta.objectId) {
                res.status(400).json({
                    error: {
                        code: 400,
                        message: "Object IDs must be the same",
                        type: "invalidField"
                    }
                });
            } else {
                this.dao.findAndUpdate(consulta)
                    .then((consultaAtualizada) => {
                        res.send(consultaAtualizada.toObject());
                    }).catch((err) => {
                    console.error(err);
                    res.status(400).json({
                        error: {
                            code: 400,
                            message: err.message,
                            type: "invalidField"
                        }
                    });
                });
            }
        });
    }

    _setupDeleteConsulta() {
        this.router.delete('/:consultaId', (req, res) => {
            res.status(200).json("delete ok")
        });
    }

    get router() {
        return this._router;
    }

    get dao() {
        return this._dao;
    }
}

module.exports = PacienteResource;