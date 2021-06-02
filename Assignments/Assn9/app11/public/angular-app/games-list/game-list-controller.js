angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GameDataFactory, AuthFactory, $route) {
    const vm = this;
    vm.title = "Mean Games App";
    // vm.isSubmitted=false;
    GameDataFactory.getAllGames().then(function (response) {
        vm.games = response;
    });
    vm.isLoggedIn = function () {
        return AuthFactory.auth.isLoggedIn;
        // if(AuthFactory.auth.isLoggedIn){
        //     return true;
        // }else{
        //     return false;
        // }
    };

    vm.addGame = function () {
        const newGame = {
            title: vm.newGameTitle,
            price: vm.newGamePrice,
            rate: vm.newGameRating,
            year: vm.newGameYear,
            minPlayers: vm.newGameMinPlayers,
            maxPlayers: vm.newGameMaxPlayers,
            minAge: vm.newGameMinAge,
            designers: vm.newGameDesigner
        };
        if (vm.gameForm.$valid) {
            console.log(newGame);
            GameDataFactory.addOneGame(newGame).then(function (response) {
                console.log("Game saved");
                return response.data;
            }).catch(function (error) {
                console.log(error);
            });
        }
        $route.reload();
        // else{
        //     vm.isSubmitted=true;
        // }
    }

    vm.previous = function () {
        GameDataFactory.previousPage().then(function (response) {
            console.log("Previous page");
            vm.games = response;
        }).catch(function (error) {
            console.log(error);
        });
    };

    vm.next = function () {
        GameDataFactory.nextPage().then(function (response) {
            console.log("Next page");
            vm.games = response;
        }).catch(function (error) {
            console.log(error);
        });
    };

}

