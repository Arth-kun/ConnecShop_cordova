'use strict';

angular.module('app.panier')

.controller('PanierController'/*majuscule obligatoire quand on défini le ctrl dans module.js*/, function ($scope) {

	//Ifunc
	calcProducts();

	//This function is called on hash change in headerDispenser.js
	//DIfunc
	function calcProducts () {
		//calcul of the products's total price

		if (sessionStorage.getItem('articlesPanier') && JSON.parse(sessionStorage.getItem('articlesPanier')) != null && JSON.parse(sessionStorage.getItem('articlesPanier')) != '') {

			//Ivar
			var articlesPanier = JSON.parse(sessionStorage.getItem('articlesPanier')); //obj

			//Svar
			$scope.nbArticles=0; //int
			$scope.prixTotal=6.6; //int

			for (var article of articlesPanier) {
				//alert(JSON.stringify(article)); //LOG

				//Svar
				$scope.nbArticles+=article.quantity; //int

				if (article.prixNonRemise)
					article.prixNonRemiseStr=multiplyStr(article.prixNonRemise, article.quantity); //Ifunc

				article.prixTTCStr=multiplyStr(article.PrixTTC, article.quantity); //Ifunc

				totalPrix(article.prixTTCStr); //Ifunc
			}

			totalPrix($scope.prixTotal); //Ifunc

			//Svar
			$scope.products = articlesPanier;

		} else {

			//Svar
			$scope.nbArticles=0;
		
		}

	}


	//Sfunc
	$scope.changeQuantity = function (index, quantity) {
		
		//Ivar
		var productsStored=JSON.parse(sessionStorage.getItem('articlesPanier')); //obj

		//augment quantity
		productsStored[index].quantity+=quantity;

		//remove product if quantity is to 0
		if (!productsStored[index].quantity) {
			productsStored.splice(index,1);
		}

		sessionStorage.articlesPanier = JSON.stringify(productsStored);

		//call the func to make the maj
		calcProducts(); //Ifunc


		//When there is no more products in the shopping cart -> back home
		if ($scope.nbArticles==0) {

			$.prompt('Le panier est vide', {top: '10%'});
			document.location.hash = '#/home';

		}
	}


	//Sfunc
	$scope.addCart = function (product) {

		//the quantity option aren't in function of the disponibilities of the product
		//Ivar popUp impromptu
		var addCartPopup = {
			state0: {
				title: 'Quantité',
				html:'<select name="quantity" class="form-control">'+
				'<option value="1" selected>1</option>'+
				'<option value="2">2</option>'+
				'<option value="3">3</option>'+
				'<option value="4">4</option>'+
				'<option value="5">5</option>'+
				'</select>',
				buttons: { "Ajouter": true },
				submit:function(e,v,m,f){

					//Ivar
				 	var quantity = parseInt(f.quantity); //int
				 	var doublon = false; //bool

					if ($.isEmptyObject(sessionStorage) || JSON.parse(sessionStorage.getItem('articlesPanier')) == null) {

						//Ivar
						var products=[]; //arr
						product.quantity=quantity; //int
						products[0]=product; //obj

					}
					else {

						//Ivar
						var products=JSON.parse(sessionStorage.getItem('articlesPanier')); //objs

						for (var productStored of products) {

							//verify if the product already is in the shopping cart
							if (productStored.ID===product.ID&&productStored.idPromo===product.idPromo){

								productStored.quantity+=quantity;
								doublon=true;

							}

						}

						if (!doublon) {		

							product.quantity=quantity;
							products[products.length]=product;

						}
					}

					sessionStorage.articlesPanier = JSON.stringify(products);
			  		//alert(sessionStorage.getItem('articlesPanier')); //LOG

			  		calcProducts(); //Fint


			  		e.preventDefault();
			  		$.prompt.nextState();
  				}
  			},
  			state1: {
  				title: 'Ajouté !',
  				html: '<p>Votre produit a bien été ajouté.</p>',
  			}
		};

		//If product's stock == 0
		if (product.Stock)
			$.prompt(addCartPopup);
		else
			$.prompt('Le produit n\'est plus en stock')
	}


	//Sfunc
	$scope.goToPanier = function () {
		if ($scope.nbArticles!==0) {
			document.location.hash='#/panier';
		} else {
			$.prompt('Le panier est vide', {top: '10%'});
		}
	}


	//Ifunc
	function multiplyStr (str, factor) {
		//multiply the price from string to int and return in string again

		//Ivar
		var strNumber = str.replace(",","."); //str
		var number = parseFloat(strNumber); //float
		var doubleNumber = (number*factor).toFixed(2);	//float
		var newStrNumber = doubleNumber.toString(); //str

		return newStrNumber.replace(".",",");
	}

	//Ifunc
	function totalPrix (prix) {
		//Calcul of the total price

		if (typeof prix === 'string') {

			//Ivar
			var prixNumber = prix.replace(",","."); //str
			
			//Svar	
			$scope.prixTotal += parseFloat(prixNumber); //float

		} else {

			//Ivar
			var prixTotal = prix.toFixed(2); //float
			var prixTotalString = prixTotal.toString(); //str

			//Svar
			$scope.prixTotal = prixTotalString.replace(".",","); //str

		}
	}

	$scope.recalc = function () {
		calcProducts();
	}

});