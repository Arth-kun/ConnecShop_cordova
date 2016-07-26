//Gvar
var array = []; //arr
var maxValues = 20; //int
var minValues = 5; //int
var moyennes = []; //arr
var minor; //int

//DGfunc
function distanceCalculator (beaconInfo) {

	//HISTO LOG
	//beaconInfo.beacons[0].name
    //beaconInfo.beacons[0].proximity
    //beaconInfo.beacons[0].distance
    //$("body").html(beaconInfo.beacons[0].name + " - " + beaconInfo.beacons[0].proximity + "<br/>" + beaconInfo.beacons[0].distance);

    array = decalVal(array); //Ifunc
    moyennes = decalVal(moyennes); //Ifunc

    for (var index = 0; index < beaconInfo.beacons.length; index++) {
    	//Ivar
    	var beacon = beaconInfo.beacons[index]; //obj


        //create if not exists
        if (!array[beacon.minor]) {
        	array[beacon.minor] = [];
        	for (var i = 0; i < maxValues; i++) {
        		array[beacon.minor][i] = -1;
        	}
        }


        //On remplace la valeur 0 par la valeur actuelle
        array[beacon.minor][0] = beacon.distance;
    }

    //Ivar
    var allowed = false; //bool

    for (var key in array) {

    	//Ivar
    	var total = 0; //int
    	var count = 0; //int

    	//Calcul of total
    	for (var i = 0; i < maxValues; i++) {
    		if (array[key][i] != -1) {
    			total = total + array[key][i];
    			count++;
    		}
    	}

    	//if doesn't exists
    	if (!moyennes[key]) {
        	moyennes[key] = [];
        	for (var i = 0; i < maxValues; i++) {
        		moyennes[key][i] = 1000;
        	}
        }

        //Calcul of moyennes
    	if (count > minValues)
    		moyennes[key][0] = total / count;
    	else
    		moyennes[key][0] = 1000;

    }


    // LOG
    //$("body").html(JSON.stringify(beaconInfo.beacons[0]));
    //$('#header, #ribbon, #menu-toggle-button, #beacon').addClass('displayNone');
    //$("body").html("");


    //Verif that the n°1 minor is the same in the last 3 moyenne calculs
    if (sortBy(moyennes, 0, true) === sortBy(moyennes, 1, true) && sortBy(moyennes, 0) === sortBy(moyennes, 2, true) && sortBy(moyennes, 2) === sortBy(moyennes, 3, true))
		minor = sortBy(moyennes, 0);
	
	//$("body").append(nomRayon(minor)); //LOG
	return parseInt(minor);
	

}


//Dfunc
function decalVal (array) {
	//decalage of values
    for (var key in array) {
      	for (var i = maxValues - 1; i > 0; i--) {
            array[key][i] = array[key][i - 1];
        }
        array[key][0] = -1;
    }
    return array;
}


//Dfunc
function sortBy (array, x, debug) {
	//Sort by the bigest moyenne value at an index x
	var tuples = [];

    for (var key in array)
    	tuples.push([key, array[key][x]]);

    tuples.sort(function(a, b) {
    	a = a[1];
    	b = b[1];

    	return a < b ? -1 : (a > b ? 1 : 0);
    });

    for (var i = 0; i < tuples.length; i++) {
    	var key = tuples[i][0];
    	var value = tuples[i][1];

    	// LOG
        //if (debug)
        //	$("body").append(x + " " + nomRayon(key) + " - " + value + "<br/>");
    }

    return tuples[0][0];
}

//Ifunc LOG use only
function nomRayon (minor) {
	switch (parseInt(minor)) {
		case 46204 :
		return 'Hotline';
		case 35520 :
		return 'Projets';
		case 8227 :
		return 'Privilèges';
		case 21493 :
		return 'Marketing';
		case 37996 :
		return 'Produit';
		case 45531 :
		return 'Web';
		case 9777 :
		return 'Infra';
		case 43737 :
		return 'Accueil';
		case 23810 :
		return 'Commercial';
	}
}