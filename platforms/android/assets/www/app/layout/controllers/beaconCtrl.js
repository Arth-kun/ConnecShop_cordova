'use strict';

angular.module('app.beacon', ['ui.router'])

.controller('beaconController', function ($scope) {

	//Svar
	$scope.showBeacon = new Shower(); //func

	//close the view with swipe
	$('#beacon').hammer().on("swiperight", function(){
		if ($scope.showBeacon.doShow) {
			$scope.showBeacon.show();
		}
	});

	//open and close the view by swipe the arrow
	$('#beacon .paddingFleche').hammer().on("swipeleft", function(){
		if (!$scope.showBeacon.doShow) {
			$scope.showBeacon.show();
		}
	});

	//Ivar
	var dejaVu = []; //arr

	//Sfunc Show all the product that has been already seen
	$scope.showDejaVu = function () {

		//Svar
		$scope.dejaVu = JSON.parse(JSON.stringify(dejaVu)); //obj

		for (var product of $scope.dejaVu) {

			//We have to add those again
			product.descriptionShow = new Dispenser();
			product.avisShow = new Dispenser();
			product.detailProduct = new Opener();
			product.randomID = getRandom();

		}

		//Svar
		$scope.hideDejaVu = new Dispenser(); //obj

 	}

 	//Sfunc
	$scope.addDejaVu = function (rayon) {

		for (var product of rayon) {

			if (dejaVu != "") {

				//Ivar
				var storeProd = true; //bool

				for (var dejaVuProd of dejaVu) {

					if (dejaVuProd.ID == product.ID) {
						storeProd = false;
					}
				}
				
				//we had only if it's not already added
				if(storeProd)
					dejaVu.push(product);

			} else {

				dejaVu.push(product);

			}

		}

		//$scope.showDejaVu(); //DUR

	}

	//var idRayon = 'RAYON1'; //DUR


	//Sfunc
	$scope.selectRayon = function (idRayon) {

		if (idRayon!=undefined) {

			//Rext
			$.post( webServUrl+"GET_ListeArticlesParRayon", { rayon: idRayon })
  			.done(function(rayon) {

				for (var product of rayon) {

					product.descriptionShow = new Dispenser();
					product.avisShow = new Dispenser();
					product.detailProduct = new Opener();
					product.randomID = getRandom();

				}

				//Svar
				$scope.nomRayon = rayon[0].Theme; //string
				$scope.rayon = formateJson(rayon, 'beacon'); //obj /Efunc jsonTransformations.js
				$scope.addDejaVu($scope.rayon);
			});

		}
	}

	//$scope.selectRayon(idRayon); //DUR


	//Svar
	$scope.conseils = [{
		"id":0,
		"titre":"Bien choisir son rouge à lèvres !",
		"img":"styles/img/demo/e-comm/2.png",
		"apercu":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
	}]; //arr


	//Sfunc
	$scope.addCart = function (product) {

    	angular.element($("#header #buttonsPullRight .controllerContainer")).scope().addCart(product);
	
	}


	//Ifunc
	function getRandom () {

	  	return Math.floor((Math.random()*6)+1);

	}

	//Iclass
	function Opener () {

		this.open = function (classProd, bProd) {

			$('.spanImg').addClass('col-xs-3').removeClass('col-xs-12');	
			$('.produitContent').addClass('col-xs-9').removeClass('col-xs-12');

			$('.produitContent .produitNote, .spanImg img, .produitContent .produitPrix .produitRemise, .produitContent .produitPrix .produitPrixBarre, .produitContent .produitPrix .produitPrixTTC, .produitContent .produitName, .promTagBeacon .backgroundPromo, .promTagBeacon .textPromo, .spanImg, .produitContent .produitNote .produitAvis, .produitContent .produitPanier, .descAvis').removeClass('openDetail');

			$('.product'+classProd+' .spanImg').removeClass('col-xs-3').addClass('col-xs-12');	
			$('.product'+classProd+' .produitContent').removeClass('col-xs-9').addClass('col-xs-12');

			$('.product'+classProd+' .produitContent .produitNote, .product'+classProd+' .spanImg img, .product'+classProd+' .produitContent .produitPrix .produitRemise, .product'+classProd+' .produitContent .produitPrix .produitPrixBarre, .product'+classProd+' .produitContent .produitPrix .produitPrixTTC, .product'+classProd+' .produitContent .produitName, .product'+classProd+' .promTagBeacon .backgroundPromo, .product'+classProd+' .promTagBeacon .textPromo, .product'+classProd+' .spanImg, .product'+classProd+' .produitContent .produitNote .produitAvis, .product'+classProd+' .produitContent .produitPanier, .product'+classProd+' .descAvis').addClass('openDetail');

			var rayon = $scope.rayon;

			for (var product of rayon) {
				if (product != bProd) {
					product.avisShow.showDesc = false;
					product.descriptionShow.showDesc = false;
				}
			}

		}
	}	


	//Iclass
	function Shower () {
		//Permit to hide and show the product details

		this.doShow = false;

		this.show = function () {

			if (!this.doShow) {

				$('#bodyMainContent').addClass('translateBody');
				$('#header, #ribbon').addClass('translateRibbonHeader');
				$('#menu-toggle-button').addClass('translateButtunToggleMenu');
				$('.calqueOpacite').addClass('calqueOpaciteBeacon');

				document.addEventListener('touchmove', stopScroll, false);
				$('body').addClass('noscroll');

				this.doShow = true;

			} else {

				$('#bodyMainContent, #header, #ribbon').removeClass('translateBody');
				window.setTimeout(function() {
					$('#header, #ribbon').removeClass('translateRibbonHeader');
					$('#menu-toggle-button').removeClass('translateButtunToggleMenu');
				}, 300);
				$('.calqueOpacite').removeClass('calqueOpaciteBeacon');

				document.removeEventListener('touchmove', stopScroll, false);
				$('body').removeClass('noscroll');

				this.doShow = false;
				
			}

		}
	}


	//Iclass
	function Dispenser () {

		this.showDesc = false;

		//Permit to hide and show the description of a product
		this.dispDesc = function () {
			this.showDesc = !this.showDesc;
		}

	}

	//Ifunc
	function stopScroll (e) {

		if(!$('#beacon').has($(e.target)).length)
			e.preventDefault(); 

	}

});