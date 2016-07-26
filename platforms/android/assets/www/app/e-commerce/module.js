"use strict";


angular.module('app.eCommerce', ['ui.router'])
.config(function ($stateProvider) {

    $stateProvider
        .state('app.eCommerce', {
            abstract: true,
            data: {
                title: 'E-Commerce'
            }
        })

        .state('app.eCommerce.products', {
            url: '/e-commerce/products-list/:id',
            data: {
                title: 'Products List'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/e-commerce/views/products-list.html',
                    controller: 'products-listController'
                }
            }
        })

        .state('app.eCommerce.detail', {
            url: '/e-commerce/products-detail/:category/:id/:history',
            data: {
                title: 'Products Detail'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/e-commerce/views/products-detail.html',
                    controller: 'products-detailController'
                }
            }
        })
});