'use strict';

angular.module('app.account')

.controller('AccountController'/*majuscule obligatoire quand on défini le ctrl dans module.js*/, function ($scope) {

//Svar
$scope.menu = 0; //int

//Ivar
var menuReference; //obj
var menuReferencePassword; //obj

//Svar
$scope.day = 31; //int
$scope.mois = 12; //int
$scope.annee = 117; //int


// verif sessionStorage
if (sessionStorage.getItem('fiche')) {

	//Svar
	$scope.logged = true;
	$scope.fiche = JSON.parse(sessionStorage.getItem('fiche'));

} else {

	//Svar
	$scope.logged = false;
	$scope.fiche = "";

}


//Sfunc permet de récupèrer les tableaux allant de 0 à $scope.day/$scope.mois/$scope.annee
$scope.getNumber = function (num) {

	return new Array(num);

}

//Sfunc
$scope.valid = function (login, password) {

	$.post( webServUrl+"GET_FicheParLogin", { webLogin: login, webPassword : password })
  	.done(function(fiche) {

  		if (fiche=="") {

  			$.prompt("Mauvais identifiant ou mot de passe, réessayez !");
  		
  		} else {

  			//Svar
  			$scope.logged = true; //bool
  			$scope.fiche = fiche[0]; //obj
  			sessionStorage.setItem('fiche', JSON.stringify(fiche[0]));
  		
  		}

  	});

}

//Sfunc valid form on keypress enter
$scope.keypress = function (login, password, event) {

	if (event.which === 13){
		$scope.valid(login, password);	
	}

}

//Sfunc
$scope.disconect = function () {

	$scope.logged = false;
	sessionStorage.removeItem('fiche');

}

//Sfunc
$scope.goToMenu = function (id, idFiche) {

	$scope.menu = id;

	switch (id) {
		case "1":
			getToInfoPerso(idFiche);

		case "2":
			getToChangePassword(idFiche);

		case "3":
			getToInfoFidelite(idFiche);
	}

	
}

//Sfunc
$scope.goBack = function (menu) {

	if (menu === 0)
		history.back();
	else
		$scope.menu = 0;

}

//Sfunc
$scope.modifyFiche = function () {

	//Ivar
	var menuDetail = $scope.menuDetail; //obj

	if(JSON.stringify(menuDetail) != JSON.stringify(menuReference)) {
		
		//Ivar
  		var menuChange = {}; //obj
  		

		if (menuDetail.EMail === menuDetail.confirmEMail) {

			menuChange.EMail = menuDetail.EMail;
			menuChange.WebLogin = menuDetail.EMail;

		} else {

			menuChange.EMail = menuReference.EMail;
			menuChange.WebLogin = menuReference.WebLogin;

		}

		menuChange.DateNaissanceString = menuDetail.annee + menuDetail.mois + menuDetail.jour

		for (var key in menuDetail) {

			if (key != "EMail" && key != "confirmEMail" && key != "WebLogin" && key != "jour" && key != "mois" && key != "annee")
				menuChange[key] = menuDetail[key];

		}

		$.post( webServUrl + "UPDATE_FicheParIDFiche", {
		 	idFiche : menuChange.ID,
		 	WebLogin: menuChange.WebLogin,
		 	EMail : menuChange.EMail,
		 	Prenom : menuChange.Prenom, 
		 	NomFamille : menuChange.NomFamille,
		 	DateNaissanceString : menuChange.DateNaissanceString,
		 	Adresse2 : menuChange.Adresse2,
		 	Adresse0 : menuChange.Adresse0,
		 	Adresse1 : menuChange.Adresse1,
		 	Adresse3 : menuChange.Adresse3,
		 	CodePostal : menuChange.CodePostal,
		 	Ville : menuChange.Ville,
		 	Pays : menuChange.Pays,
		 	Telephone : menuChange.Telephone,
		 	Mobile : menuChange.Mobile,
		 	AutoriseContactMail : menuChange.AutoriseContactMail 
		})
  		.done(function(fiche) {

  			menuReference = JSON.parse(JSON.stringify(menuDetail));
  			$.prompt('Modification effectuée !');

  		});

	} else {

		$.prompt('Aucun changement détecté.');

	}

}

//Sfunc
$scope.modifyPassword = function (menuDetail) {

	if(menuDetail.webPasswordActuel === menuReferencePassword.WebPassword) {
		
		if (menuDetail.newWebPassword == menuDetail.confirmNewWebPassword) {
			
			$.post( webServUrl + "UPDATE_PasswordParIDFiche", { idFiche : menuReferencePassword.ID, WebPassword: menuDetail.newWebPassword })
	  		.done(function(fiche) {

	  			menuReferencePassword = JSON.parse(JSON.stringify(menuDetail));

	  			$.prompt('Modification effectuée !');

	  			$scope.goBack($scope.menu);

	  		});

	  	} else {

	  		$.prompt('Les deux mots de passes sont différents !');

	  	}

	} else {

		$.prompt('Mauvais mot de passe !');
		
	}

}

//Svar
$scope.menusAccount = [{
	"message" : "Informations personnelles",
	"id" : "1" 
},{
	"message" : "Changer le mot de passe",
	"id" : "2"
},{
	"message" : "Points fidélité",
	"id" : "3"
}]; //arr


//Sfunc
$scope.goToAccount = function () {

	document.location.hash='#/account';

}

//Ifunc
function getToInfoPerso (idFiche) {

	$.post( webServUrl + "GET_FicheParIDFiche", { IDFiche : idFiche })
  	.done(function(fiche) {

  		fiche.annee = fiche.DateNaissanceString.substr(0,4);
  		fiche.mois = fiche.DateNaissanceString.substr(4,2);
  		fiche.jour = fiche.DateNaissanceString.substr(6,2);

  		fiche.confirmEMail = fiche.EMail;

  		$scope.menuDetail = fiche;

  		menuReference = JSON.parse(JSON.stringify(fiche));

  	});

}

//Ifunc
function getToChangePassword (idFiche) {

	$.post( webServUrl + "GET_PasswordParIDFiche", { IDFiche : idFiche })
  	.done(function(fiche) {

  		$scope.menuDetail;

  		menuReferencePassword = JSON.parse(JSON.stringify(fiche));

  	});

}

//Ifunc
function getToInfoFidelite (idFiche) {

	$.post( webServUrl + "GET_FideliteParIDFiche", { idFiche : idFiche })
	.done(function(fiche) {

		$scope.ptFidelite = fiche.NbPoints;

		if (fiche.NbPoints == 0)
			$scope.hasPoint = false;
		else
			$scope.hasPoint = true;

	});

}

});