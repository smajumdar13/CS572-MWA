angular.module("mangaBase").factory("AuthFactory",AuthFactory);

function AuthFactory(){
    
    const auth={isLoggedIn:false};

    return {
        auth:auth
    };

}