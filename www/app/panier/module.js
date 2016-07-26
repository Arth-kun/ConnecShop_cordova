"use strict";


angular.module('app.panier', ['ui.router'])
.config(function ($stateProvider) {

    $stateProvider
        .state('app.panier', {
            url: '/panier',
            data: {
                title: 'Blank'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/panier/views/panier.html',
                    controller: 'PanierController'
                }
            }
        })
});
