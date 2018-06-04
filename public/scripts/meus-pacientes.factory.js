angular.module("filmes").factory("MeusFilmes", function($q, $http){
    return {
        listar: function() {
            var promessa = $q.defer();

            $http.get("http://localhost:5000/api/pacientes/").then(
                function(result){
                    var filmes = [];
                    angular.forEach(result.data, function(filme, id){
                        filme.id = id;
                        filmes.push(filme);
                    });

                    promessa.resolve(filmes);
            });

            return promessa.promise;
        },
        inserir: function(filme) {
            delete filme.id;

            return $http.post("http://localhost:5000/api/pacientes/", filme).then((response) => {
                debugger ;
                return response.config.data;
            });
        }
    }
});