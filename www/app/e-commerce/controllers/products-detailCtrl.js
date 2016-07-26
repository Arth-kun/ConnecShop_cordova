'use strict';

angular.module('app.eCommerce')

.controller('products-detailController', function ($scope, $location) {

    //Ddom
    $('#ribbon').addClass('displayNone');
    $('#header').addClass('productsDetailHeader');

    //Rdom
    // Récupèration des paramètres(rayon, id) dans l'url
    //Ivar
	var hashProduct = document.location.hash.split("/"); //arr
    var idProduct = parseInt(hashProduct[4]); //int as str
    var idCategory = hashProduct[3]; //str

    //Rext
    //WebService
    $.post( webServUrl+"GET_ArticleParID", { id: idProduct })
    .done(function(products) {

        //Svar
        $scope.products = formateJson(products, 'detail'); //obj /Efunc jsonTransformation.js

    });

    //Svar
    $scope.menuTitle={
        "best":"Meilleures Ventes",
        "PROMOMOMENT":"Promotions du Moment"
    }; //obj
    //Ifunc
    getMenuByID(2);
    getMenuByID(0);
    getMenuByID(1);


    //Svar
    $scope.description = new Dispenser(); //func
    $scope.avis = new Dispenser(); //func

    //Sfunc
    $scope.initCarousel = function () {
        $('.carousel, .promoTag').hammer().on("swipeleft", function(){
            $('.carousel').carousel('next');
        });

        $('.carousel, .promoTag').hammer().on("swiperight", function(){
            $('.carousel').carousel('prev');
        });
    }

    //Sfunc
    $scope.category = function () {
        if (idCategory==='Accueil') {
            return idCategory;
        } else {
            return $scope.menuTitle[idCategory];
        }
    }

    //Sfunc
    $scope.goBack = function () {
        history.go(-hashProduct[5]);
    }

    //Sfunc
    $scope.addCart = function (product) {
    	angular.element($("#header #buttonsPullRight .controllerContainer")).scope().addCart(product);
	}

    //Iclass
    function Dispenser () {
        //Permit to hide and show the product details

    	this.showDesc = false;

    	this.dispDesc = function () {
    		if (!this.showDesc) {
    			this.showDesc = true;
    		} else {
    			this.showDesc = false;
    		}
    	}
    }

    //DIfunc
    function getMenuByID (idMenu) {
        //Get the categories in function of a certain idMenu

        $.post( webServUrl+"GET_ListeCategorieParMenu", { menu : idMenu })
        .done(function(categories) {

            for (var category of categories) {
                $scope.menuTitle[category.KeyTheme] = category.Theme;
            }
        });
    }
		

});