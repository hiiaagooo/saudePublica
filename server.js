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

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    //res.setHeader('Access-Control-Allow-Origin', 'https://saude-publica.herokuapp.com/api/formulario');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

var express = require('express'),
    cors = require('cors'),
    app = express();

    // segunda tentativa Cors
var corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));

var cors = require('cors');
app.use(cors({origin:true,credentials: true}));

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

// API.
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
                res.send('Erro ao salvar o paciente' + error);

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

// definindo a rota para o FrontEnd 
router.get('*', function(req, res) {
// Carrega nossa view formulario.html que será a única da nossa aplicação
    res.sendfile('./public/index.html');
});

// definindo o padrão das rotas (prefixadas em '/api').
app.use('/api', router); 

// iniciando a aplicação e definindo a porta.
app.listen(process.env.PORT || 5000)




