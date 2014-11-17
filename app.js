(function() {
    var myApp;
    var firstTime = true;

    myApp = angular.module("weatherStation", ["ngRoute", "ngAnimate"])
        .config(["$routeProvider", function ($routeProvider) {
            $routeProvider.when("/home/:index/:cityName", {
                templateUrl: "views/weather-information.html",
                controller: "InfoCtrl"
            })
            .otherwise({
                redirectTo: "/home"
            })
        }])
        .directive("weatherInfo", function(){
            return {
                restricted: "E"
            }
        })
        .controller("InfoCtrl", ["$scope","$http",'$routeParams', "$location", function($scope, $http, $routeParams, $location) {
            var index = $routeParams.index,
                cityName = $routeParams.cityName;

            $scope.order = "main.temp";

            $scope.getData = function(data){
                $scope.details = data;
                $scope.cached = $scope.details;
            };

            $http.jsonp("http://api.openweathermap.org/data/2.5/group?id=2643123,2643339,2643743,4049979&units=metric&callback=JSON_CALLBACK").success(function(data) {
                $scope.results = data.list;
            });

            $scope.getDetails = function(name){
                $http.jsonp("http://api.openweathermap.org/data/2.5/weather?q=" + name + "&callback=JSON_CALLBACK").success(function(data){
                    $scope.getData(data);
                });
            };

            if(firstTime){
                firstTime = false;
                $location.path("/home");
            }

        }])
})();