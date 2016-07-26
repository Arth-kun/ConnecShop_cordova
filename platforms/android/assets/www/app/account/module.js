"use strict";


angular.module('app.account', ['ui.router'])
.config(function ($stateProvider) {

    $stateProvider
        .state('app.account', {
            url: '/account',
            data: {
                title: 'Blank'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/account/views/account.html',
                    controller: 'AccountController'
                }
            }
        })
});
