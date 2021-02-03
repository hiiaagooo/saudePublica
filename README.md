# saudePublica - front  

https://saude-publica.herokuapp.com/



Utilizei a plataforma Heroku (https://dashboard.heroku.com) para hospedar os serviços. 

Por motivos de inexperiência, não soube de imediato que essa plataforma não exibe arquivos de frontend, apenas os dados criados via REST que criei via uma API Rest que criei em NodeJs. Porém, segui esse tutorial https://medium.com/@YOzaz/generation-angularjs-production-files-with-gulp-12214f076a50 e consegui gerar um <script> concatenando todos os meus arquivos em apenas um e servindo ele estaticamente no nodeJs. 


Peço que note os dados da lista que foram cadastrados intencionalmente, os demais foram apenas para teste. É que não estou conseguindo limpar o database no Mongobd (aws em que hospedei os dados da API: https://mlab.com). 

Exemplo:

O ultimo dado representa o sintoma. Esse cadastro seria aquele que solicitam ao chegarmos em um hospital (público).

Segue meu github:

FrontEnd
https://github.com/hiiaagooo/saude-publica-front

BackEnd
https://github.com/hiiaagooo/saudePublica

** devido a unificação dos arquivos para que se fosse possível utilizar o Heroku, o backend não pode ser chamado via npm! Apenas fazendo o push no github e executando o deploy no Heroku.
** Heroku pode desativar por ausência de deploys.

Para utilizar o front é só baixar os arquivos ou fazer clone, npm install > npm run serve. 

Servidor/API: NodeJs(Heroku)
Banco de Dados: MongoDb (mlab aws)
