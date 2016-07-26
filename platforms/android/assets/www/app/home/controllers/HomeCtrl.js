'use strict';

angular.module('app.home')

.controller('HomeController', function ($scope) {

	//Rext
	$.post(webServUrl+"GET_ArticleMeilleuresVentes")
  	.done(function(articlesMeilleureVente) {

  		//Svar
    	$scope.articlesMeilleureVente = formateJson(articlesMeilleureVente, 'home'); //obj /Efunc jsonTransformation.js

	});

  	//Svar
	$scope.promo = []; //arr


	//Sfunc
	$scope.goToDetail = function (id) {
		document.location.hash ='#/e-commerce/products-detail/Accueil/'+id+'/1';
	}

	//Sfunc
	$scope.goToList = function (KeyTheme) {
		document.location.hash ='#/e-commerce/products-list/'+KeyTheme;
	}

	//Ifunc
	//Swipe Carousel functions
	$('.carousel').carousel({
		interval: 7000
	});

	$('.carousel').hammer().on("swipeleft", function(){
		$(this).carousel('next');
	});

	$('.carousel').hammer().on("swiperight", function(){
		$(this).carousel('prev');
	});

	//Ifunc
	getMenuByID(0);
	getMenuByID(1);

	//DIfunc
   	function getMenuByID (idMenu) {
	    $.post( webServUrl+"GET_ListeCategorieParMenu", { menu : idMenu })
	    .done(function(categories) {

	        for (var category of categories) {
	        	category.src = "http://ac01.ow04.fr/I-Grande-"+category.IDImage+".net.jpg";
	    	}

	    	$scope.promo[idMenu] = categories;

	    });
    }


});