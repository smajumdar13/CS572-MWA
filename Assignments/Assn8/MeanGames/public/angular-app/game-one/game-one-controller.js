angular.module("meanGames").controller("GameController", GameController);

function _getStarRating(stars) {
  return new Array(stars);
}

function GameController(GameDataFactory, $routeParams, $route) {
  const vm = this;
  let gameId = $routeParams.gameId;
  GameDataFactory.getOneGame(gameId)
    .then(function (game) {
      vm.game = game;
      vm.rating = _getStarRating(vm.game.rate);
      vm.editedGamePrice = vm.game.price;
      vm.editedGameMinPlayers = vm.game.minPlayers;
      vm.editedGameMaxPlayers = vm.game.maxPlayers;
      vm.editedGameMinAge = vm.game.minAge;
    })
    .catch(function (error) {
      console.log(error);
    });

  vm.updateGame = function () {
    const editedGame = {
      title: vm.game.title,
      year: vm.game.year,
      rate: vm.game.rate,
      price: vm.editedGamePrice,
      minPlayers: vm.editedGameMinPlayers,
      maxPlayers: vm.editedGameMaxPlayers,
      minAge: vm.editedGameMinAge,
      designer: vm.game.designer,
      publisher: vm.game.publisher,
    };
    GameDataFactory.replaceOneGame(gameId, editedGame)
      .then(function (game) {
        console.log(game);
      })
      .catch(function (error) {
        console.log(error);
      });
    $route.reload();
  };

  vm.deleteGame = function () {
    GameDataFactory.deleteGame(gameId)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    $route.reload("/api/games");
  };
}
