// Responsável por levantar o serviço (NodeJs) para a execução da API.
// Author: Hiago Forte

// Configurando o Setup da API.
var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Formulario = require('./app/models/formulario');

mongoose.Promisse = global.Promisse;

//URI: Mlab (aws)
mongoose.connect('mongodb://hforte:Devil110110@ds016718.mlab.com:16718/node-crud-api');

//URI: mongodb (local)
//mongodb.connect('mongobd://localhost:27017/node-crud-api');

// configurando a variável app para usar o 'bodyParser'.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// * lembrar que criar classe "routes" é uma boa prática.
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happen here!');
    //console.log("Iniciando a app na porta " + port);
    next();
});

//rota de exemplo.
router.get('/', function(req, res) {
    res.json({ message: 'Formulário - DrTis' })
});

// API'S.
//===========================================================================

router.route('/formulario')

    // 1) Método: Criar Produto (acessar em: POST http://localhost:8000/api/formulario)  
    .post(function(req, res) {
        var formulario = new Formulario();

        //Setando os campos do Formulário (via request).
        formulario.nome = req.body.nome;
        formulario.sexo = req.body.sexo;
        formulario.idade = req.body.idade;
        formulario.endereco = req.body.endereco;
        formulario.sintomas = req.body.sintomas;
        formulario.medico = req.body.medico;

        formulario.save(function(error) {
            if(error)
                res.send('Erro ao salvar o candidato' + error);

        res.json({ message: 'Paciente cadastrado com sucesso.'});
        });
    })

    // 2) Método: Selecionar Todos Produtos (acessar em: GET http://localhost:8000/api/formulario)  
    .get(function(req, res) {
        Formulario.find(function(error, formulario){
            if(error)
                res.send('Erro ao buscar Paciente.' + error)

        res.json(formulario)
        })
    })

    // * Rotas que vão terminar em .formulario/:formulario_id servirão tanto para GET, PUT & DELETE :id.
    router.route('/formulario/:formulario_id')
    // *

    // 3) Método: Selecionar por Id: (acessar em: GET http://localhost:8000/api/produtos/:formulario_id) 
    .get(function(req, res) {
        Formulario.findById(req.params.formulario_id, function(error, formulario){
            if(error)
                res.send('Paciente não encontrado.' + error)

        res.json(formulario);
        })
    })

    // 4) Método: Atualizar por Id: (acessar em: PUT http://localhost:8000/api/produtos/:formulario_id) 
    .put(function(req, res) {

        // Primeiro, encontrar o produto do Id.
        Formulario.findById(req.params.formulario_id, function(error, formulario){
            if(error)
                res.send('Erro ao buscar dados.' + error)

            // Segundo, coletar dados respectivos do ID.
            formulario.nome = req.body.nome;
            formulario.sexo = req.body.sexo;
            formulario.idade = req.body.idade;
            formulario.endereco = req.body.endereco;
            formulario.sintomas = req.body.sintomas;
            formulario.medico = req.body.medico;

            // Terceiro, gravar alterações.
            formulario.save(function(error){
                if(error)
                    res.send('Erro ao atualizar os dados' + error);
                
                res.json('Alterações salvas com sucesso!')
            })
        })
    })

    // 5) Método: Excluir por Id (acessar: http://localhost:8000/api/produtos/:formulario_id) 
    .delete(function(req, res){

        Formulario.remove({
            _id: req.params.formulario_id
            }, function (error){
                if (error)
                    res.send("error" + error);

                res.json({message: 'Excluído com sucesso.' })
            }
        );
    })

    //definindo o padrão das rotas (prefixadas em '/api').
app.use('/api', router); 

//iniciando a aplicação e definindo a porta.
app.listen(process.env.PORT || 5000)




