const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const PacienteResource = require('./app/resources/paciente-resource');
const app = express();

var mongoose = require('mongoose');
mongoose.Promisse = global.Promisse;
mongoose.connect('mongodb://hforte:Devil110110@ds016718.mlab.com:16718/node-crud-api');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(morgan('dev'));

const api = express.Router();

api.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token, Authorization');
    console.info(req.path);
    next();
});

app.use('/api', api);
app.use('/', api);
api.use('/pacientes', new PacienteResource().router);

const port = process.env.PORT || 5000;
if (!module.parent) {
    app.server = http.createServer(app);
    app.server.listen(port, () => {
        console.info('API is running on port http://localhost:' + port);
    });
}