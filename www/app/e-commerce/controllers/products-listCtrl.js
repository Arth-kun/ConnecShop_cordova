'use strict';

angular.module('app.eCommerce')

.controller('products-listController', function ($scope, $http) {

    //Rdom
    // Récupèration des paramètres(rayon, id) dans l'url
    //Ivar
	var hashCategory = document.location.hash.split("/"); //arr
    var idCategory = hashCategory[3]; //str

    //Svar
    $scope.idCategory = idCategory;
    $scope.menuTitle={
        "best":"Meilleures Ventes",
        "PROMOMOMENT":"Promotions du Moment"
    }; //obj
    //Ifunc
    getMenuByID(2);
    getMenuByID(0);
    getMenuByID(1);


    if (idCategory=='best') {
        //Ivar
        var requetePost = $.post( webServUrl+"GET_ArticleMeilleuresVentes"); //obj
    } else {
        //Ivar
        var requetePost = $.post( webServUrl+"GET_ListeArticlesParCategorie", { categorie: idCategory }); //obj
    }

    //Rext
    requetePost
    .done(function(productsList) {

        if (productsList.length===1) {
            //On va directement au détail s'il n'y a qu'un produit dans la liste
            document.location.hash = '#/e-commerce/products-detail/'+idCategory+'/'+productsList[0].ID+'/2';
        
        } else {

            //Svar
            $scope.nbArticle = productsList.length; //int
            $scope.productsList = formateJson(productsList, 'list'); //obj /Efunc jsonTransformation.js
        
        }
    });


    //Sfunc
    $scope.goToDetail = function (id) {
      document.location.hash ='#/e-commerce/products-detail/'+idCategory+'/'+id+'/1';
    }


    //DIfunc
    function getMenuByID (idMenu) {
        $.post( webServUrl+"GET_ListeCategorieParMenu", { menu : idMenu })
        .done(function(categories) {

            for (var category of categories) {
                $scope.menuTitle[category.KeyTheme] = category.Theme;
            }
        });
    }


});