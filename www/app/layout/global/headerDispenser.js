//DGfunc
function headerDispenser () {
	//this show and hide the header elements depending on wich page you're on

	//Recalc panier value on each change
	angular.element($(".controllerContainer")).scope().recalc();

	var allSelectors = '#ribbon, #ribbon #homeSearchbar, #header .pull-left #logo, #header #buttonsPullRight .buttonContainer, #menu-toggle-button, #beacon .flecheHome';

	if (document.location.hash === '#/home') {

		$(allSelectors).removeClass('displayNone');
		
		//fire if the new rayon has been detecting while you were on another page
		if (newRayon) {

			//show the beacon view
			angular.element($("#beacon")).scope().showBeacon.show();
			newRayon = false;

		}

	} else {

		$(allSelectors).addClass('displayNone');
		
		if (document.location.hash !== '#/panier' && document.location.hash !== '#/account') {
			$('#header #buttonsPullRight .buttonCartContainer').removeClass('displayNone');
		}

	}

	if (!document.location.hash.includes("products-detail") && document.location.hash !== '#/account') {

		if (document.location.hash !== '#/panier')
			$('#ribbon').removeClass('displayNone');

    	$('#header').removeClass('productsDetailHeader');

	} else if (document.location.hash === '#/account') {
    	$('#header').addClass('productsDetailHeader');
	}

}

window.onhashchange = function () {

	headerDispenser();

}