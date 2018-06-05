(function(){
  angular
    .module('filmes')
    .controller('FilmesController', function($scope, MeusFilmes) {
      $scope.titulo = "Controle de Pacientes";

      $scope.filmes = [];
	  
	  var carregarPacientes = function() {
		MeusFilmes.listar().then(function(filmes){
			$scope.filmes = filmes;
			console.log('dados', filmes);
		});
	  }

		$scope.novoPaciente = {};
			
		$scope.resetForm = function() {
			$scope.formulario.$setPristine();
			$scope.formulario.$setUntouched();
		}

		$scope.criarPaciente = function() {
			$scope.formulario.$setDirty();

			if ($scope.formulario.$invalid)
				return;

			var filme = {
				id: Date.now() + "",
				nome: $scope.novoPaciente.nome,
				sexo: $scope.novoPaciente.sexo,
				idade: $scope.novoPaciente.idade,
				endereco: $scope.novoPaciente.endereco,
				sintomas: $scope.novoPaciente.sintomas,
				medico: $scope.novoPaciente.medico
			};

	MeusFilmes.inserir(filme).then(carregarPacientes);
			alert('Obrigado!');
			$scope.novoPaciente = {};
			$scope.resetForm();
	}
	 
	$scope.removerFilme = function(id) {
		angular.forEach($scope.filmes, function(filme, i){
			if(filme.id == id){
				$scope.filmes.splice(i, 1);
				alert('Paciente excluído!');
			};
		});
	}
	carregarPacientes();
	
	});

})();

