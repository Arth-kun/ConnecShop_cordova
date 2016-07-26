//Gvar
var store = false; //bool
var sameId; //int
var newRayon = false; //bool

//Iclass
var beaconApp = (function()
{
    //Ivar
    var beaconApp = {}; //obj

    //DIfunc
    beaconApp.initialize = function()
    {
        // Watch for the mobile device to be ready to fire
        document.addEventListener(
            'deviceready',
            function() { evothings.scriptsLoaded(onDeviceReady) },
            false);
    }

    //DIfunc
    function onDeviceReady()
    {
        //Ifunc
        startScan();
    }

    //DIfunc
    function startScan()
    {   

        //DIfunc
        function onBeaconsRanged(beaconInfo)
        {
            
            // Fire if beacon is finded
            if (beaconInfo.beacons[0] != undefined) {

                //Ivar
                var minorChoosen = distanceCalculator(beaconInfo); //int
                
                if (minorChoosen != undefined && minorChoosen != NaN) {

                    //Ivar
                    var idChoosen = productChooser(minorChoosen); //int

                    if ((sameId == undefined) || ((sameId != idChoosen) && (!angular.element($("#beacon")).scope().showBeacon.doShow))) {
                        
                        //alert(sameId+''+idChoosen);//LOG

                        //Comment
                        angular.element($("#beacon")).scope().showDejaVu();

                        //Change the rayon in the beaconCtrl.js's scope
                        angular.element($("#beacon")).scope().selectRayon(idChoosen);
                        window.navigator.vibrate([600, 300, 600]);

                        if (document.location.hash==='#/home')
                            angular.element($("#beacon")).scope().showBeacon.show(); //open the beacon view
                        else
                            newRayon = true; //The view will be open when returning into the home page (see headerDispenser.js)
                        
                        sameId = idChoosen; 

                    } else if ((sameId == undefined) || (sameId != idChoosen)) {

                        //vibrations are firing in any situations
                        window.navigator.vibrate([600, 300, 600]);

                    }
                }


                if (!store) {

                    $('#beacon').removeClass('displayNone');
                    //$.prompt('Bienvenue dans le magasin !', {top: '20%'}); //HISTO
                    store = true;

                }
            }
            else if (store) {

                //$.prompt('Vous êtes sortie du magasin.', {top: '20%'});

                //Hide all the beacon view stuffs
                if (angular.element($("#beacon")).scope().showBeacon.doShow)
                    angular.element($("#beacon")).scope().showBeacon.show();
                
                $('#beacon').addClass('displayNone');

                store = false;

            }
        }

        //DIfunc
        //Actually never fire
        function onError(errorMessage)
        {
            alert('Ranging beacons did fail: ' + errorMessage);
        }


        // Request permission from user to access location info.
        // This is needed on iOS 8.
        estimote.beacons.requestAlwaysAuthorization();

        // Start ranging beacons.
        // The scan is returning true even if the condition are false but beacon are undefined then.
        estimote.beacons.startRangingBeaconsInRegion(
        {
            identifier: 'Octave',
            uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
            major: 200
                //minor: 37996
            }, 
            onBeaconsRanged,
            onError);
        }

        return beaconApp;
    })();

    //Ifunc
    beaconApp.initialize();