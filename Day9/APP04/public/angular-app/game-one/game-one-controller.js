angular.module("meanGames").controller("GameController", GameController);

function _getStarRating(stars) {
  return new Array(stars);
}

function GameController(GameDataFactory, $routeParams, $route, $location, AuthFactory) {
  const vm = this;
  let gameId = $routeParams.gameId;
  GameDataFactory.getOneGame(gameId)
    .then(function (game) {
      vm.game = game;
      vm.rating = _getStarRating(vm.game.rate);
      vm.editedGamePrice = game.price;
      vm.editedGameMinPlayers = game.minPlayers;
      vm.editedGameMaxPlayers = game.maxPlayers;
      vm.editedGameMinAge = game.minAge;
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

  vm.isLoggedIn = function () {
    return AuthFactory.auth.isLoggedIn;
  }

  vm.deleteGame = function () {
    GameDataFactory.deleteGame(gameId)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // $route.reload();
    $location.path("/");
  };
}
