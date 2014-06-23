/* 
* Written by Varun and Eric Lanteigne and Luke Morrison March 1st 2014
*/ 


/*
 * Create a generic marker and return it 
 */
function CreateGenericMarker (Map, LatLngObject, Title) {
	var markerTemp = new google.maps.Marker({
		position: LatLngObject,
		map: Map,
		title: Title,
		animation: google.maps.Animation.DROP
	});
	return markerTemp;
}
/*
 * Create a generic Information Window and return it 
 */

function CreateGenericInfoWindow (FinalLocation, Width) {
	//Information box format
	var contentString =  '<div id="content" >'+
	  '<div id="siteNotice" >'+
	  //'</div>'+ //'<button>' + '</button>'+
	  '<div id="title" style="margin:0 auto; width:auto">' +
	  '<h3 style="background:black;  text-align:center; font-weight:bold"> <font color=white >' + FinalLocation.Name + '</font></h3>'+
	  '</div>' +
	  '<div align="right" style="text-align:right">' +
	  '<center><button  id ='+FinalLocation.Acr+' onclick="buttonClick(this.id);">Click To Go Here</button></center>' +
	  '</div>' +
	  '<div id="bodyContent" >'+
	  '<p>'+ FinalLocation.Info + '</p>'+ 
	  '</div>'+ 	
	  '</div>'+   
	  '</div>';
	
	//maxWidth sets size of info box
	var infowindowTemp = new google.maps.InfoWindow({
	  content: contentString,
	  maxWidth: Width
	});
	return infowindowTemp;
	
}
/*
 * Button functionality 
 */
function buttonClick(id)
{//Call this function here 
	MapFromBuildingClick(id);
}

/*
 *  Prompt the user and force them to give you a valid destination point 
 */
function PromptLocationString() {
	var finalLocationAcr = prompt("Please input the exact name of the building you would like to go to : ");                
	finalLocationFull = BuildingDataInfo[finalLocationAcr];
		while (!finalLocationFull) {
			alert("Please enter a valid building acronym.");
			var finalLocationAcr = prompt("Where would you like to go ?");
			finalLocationFull = BuildingDataInfo[finalLocationAcr];
	}
	return finalLocationFull;		
}


/*
 * This will place a marker on that given point and put an event on it to open the infowindow 
 */
function DisplayLocationInformation (FinalLocation, Map) {
	//First give it a Lat Long place
	var FinalLatLng = new google.maps.LatLng(FinalLocation.lat, FinalLocation.lng);
	marker = CreateGenericMarker(Map, FinalLatLng, FinalLocation.Name);	
	infowindow = CreateGenericInfoWindow(FinalLocation, 1000);
	google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(Map, marker);
				});
}

/*
 * This function displays the information box without a pin
 */
function DisplayLocationInformationNoPin (FinalLocation, Map) {
	if(infowindow !== null) {
    	marker.setMap(null);
    	infowindow.close();
    }
	//First give it a Lat Long place
	var FinalLatLng = new google.maps.LatLng(FinalLocation.lat, FinalLocation.lng);
	marker = CreateGenericMarker(Map, FinalLatLng, FinalLocation.Name);	
	infowindow = CreateGenericInfoWindow(FinalLocation, 1000);

	infowindow.open(Map, marker);
	marker.setVisible(false);
}

/*
 * This function lays down all the polygons on the map
 */
function layPolygons(map)
{
	//Array of Strings holding ever building symbols
	  var LocationSymbols=["AH","AA","AC","AP","AT","IH","TT","CB","CC","DT","FH","FR","GH","GR","GY","HP","HC","LH","LE","LS","LA","LX","ME","ML"
						   ,"MB","MC","NB","NW","PA","PH","RB","RH","CO","RO","RU","SP","SR","SA","SC","SD","TC","TB","UC","VS","PG","TC"];
	
	 //for loop to traverse the locations array
	 for(var i =0;i<LocationSymbols.length;i++){
		 //Get the object associate with the location symbol 
		  var BuildLocations = BuildingDataInfo[LocationSymbols[i]];		 
		  var PolygonLatLng = new Array();
		  for(var j =0;j<BuildLocations.PolyLat.length;j++){
			  var currentLatLng = new google.maps.LatLng(BuildLocations.PolyLat[j],BuildLocations.PolyLng[j]);
			  PolygonLatLng.push(currentLatLng);
		  }		  
		  var buildingPolygon = new google.maps.Polygon({
			    paths: PolygonLatLng,
			    strokeColor: '#FFFFFF',
			    //For see-through make opacity 0
			    strokeOpacity: 0.0,
			    strokeWeight: 2,
			    fillColor: '#000000',
			    fillOpacity: 0.0,
			    indexID: i
			  });		  
		  buildingPolygon.setMap(map);
	    google.maps.event.addListener( buildingPolygon, 'click', function (event) {
			  refreshPage(BuildingDataInfo[ LocationSymbols[ this.indexID ] ], map);			 // here using "this" because you can find buildingPolygon from the context.
		  });	
	 }
}

function layIcons(map){
	layPolygons(map);
	layIconsBusStops(map);
	layIconsTrain(map);
	layIconsParking(map);
}
function layIconsBuilding(building, map){
	
	var LocationSymbols=["AH","AA","AC","AP","AT","IH","TT","CB","CC","DT","FH","FR","GH","GR","GY","HP","HC","LH","LE","LS","LA","LX","ME","ML"
						   ,"MB","MC","NB","NW","PA","PH","RB","RH","CO","RO","RU","SP","SR","SA","SC","SD","TC","TB","UC","VS"];
	  //var holding the custom image name
	  var image = 'info_icons/pin_blue.png';
	  //for loop to traverse the locations array
	for (var m =0; m<LocationSymbols.length;m++){
		var BuildLocations = BuildingDataInfo[LocationSymbols[m]];//gets element from hashtable based on symbol input.
		if(!(BuildLocations.Acr == building.Acr)){
	
			  var myLatLng = new google.maps.LatLng(BuildLocations.lat,BuildLocations.lng);//creates a latlng 
			  marker = new google.maps.Marker({//creates a new marker
				  position: myLatLng,//sets position
				  map: map,//sets which map to mark on
				  icon: image//sets what icon image to use.
				  //title: BuildLocations.Name
			  });
			  
		}
	}
}

function layIconsNoBuilding(map){
	
	var LocationSymbols=["AH","AA","AC","AP","AT","IH","TT","CB","CC","DT","FH","FR","GH","GR","GY","HP","HC","LH","LE","LS","LA","LX","ME","ML"
						   ,"MB","MC","NB","NW","PA","PH","RB","RH","CO","RO","RU","SP","SR","SA","SC","SD","TC","TB","UC","VS"];
	  //var holding the custom image name
	  var image = 'info_icons/pin_blue.png';
	  
	  
	  //for loop to traverse the locations array
	for (var k =0; k<LocationSymbols.length;k++){

		var BuildLocations = BuildingDataInfo[LocationSymbols[k]];//gets element from hashtable based on symbol input.
		  var myLatLng = new google.maps.LatLng(BuildLocations.lat,BuildLocations.lng);//creates a latlng 
		  
		  //TODO Take out the part that lays the icons 
		  marker = new google.maps.Marker({//creates a new marker
			  position: myLatLng,//sets position
			  map: map,//sets which map to mark on
			  icon: image//sets what icon image to use.
			  //title: BuildLocations.Name
		  });

	}
}

function layIconsBusStops(map){
	
	var LocationSymbols=["MainBusStop","SteacieBusStop","GymBusStop"];
	  //var holding the custom image name
	  var image = 'info_icons/bus.png';
	  //for loop to traverse the locations array
	
	for (var k =0; k<LocationSymbols.length;k++){

		var BuildLocations = BuildingDataInfo[LocationSymbols[k]];//gets element from hashtable based on symbol input.
		  var myLatLng = new google.maps.LatLng(BuildLocations.lat,BuildLocations.lng);//creates a latlng 
		  marker = new google.maps.Marker({//creates a new marker
			  position: myLatLng,//sets position
			  map: map,//sets which map to mark on
			  icon: image//sets what icon image to use.
			  //title: BuildLocations.Name
		  });

	}
}

function layIconsTrain(map){
	
	var LocationSymbols=["Otrain"];
	  //var holding the custom image name
	  var image = 'info_icons/tram.png';
	  //for loop to traverse the locations array
	
	for (var k =0; k<LocationSymbols.length;k++){

		var BuildLocations = BuildingDataInfo[LocationSymbols[k]];//gets element from hashtable based on symbol input.
		  var myLatLng = new google.maps.LatLng(BuildLocations.lat,BuildLocations.lng);//creates a latlng 
		  marker = new google.maps.Marker({//creates a new marker
			  position: myLatLng,//sets position
			  map: map,//sets which map to mark on
			  icon: image//sets what icon image to use.
			  //title: BuildLocations.Name
		  });

	}
}

function layIconsParking(map){
	
	var LocationSymbols=["P1","P2","P3","P4","P5","P6","P7","PG"];
	  //var holding the custom image name
	  var image = 'info_icons/parking.png';
	  //for loop to traverse the locations array
	
	for (var k =0; k<LocationSymbols.length;k++){

		var BuildLocations = BuildingDataInfo[LocationSymbols[k]];//gets element from hashtable based on symbol input.
		  var myLatLng = new google.maps.LatLng(BuildLocations.lat,BuildLocations.lng);//creates a latlng 
		  marker = new google.maps.Marker({//creates a new marker
			  position: myLatLng,//sets position
			  map: map,//sets which map to mark on
			  icon: image//sets what icon image to use.
			  //title: BuildLocations.Name
		  });

	}
}


function dropdownMenu() {
	var styleArray = [
	                  {
					    featureType: "all",
					    elementType: "labels",
					    stylers: [
					      { visibility: "off" }
					    ]
					  },{
					    featureType: "road",
					    elementType: "labels",
					    stylers: [
					      { visibility: "on" }
					    ]
					  },{
					    featureType: "landscape",
					    elementType: "labels",
					    stylers: [
					      { visibility: "on" }
					    ]
					  }

	                 ]
	
	var myLatlng = new google.maps.LatLng(45.385081, -75.69602);
	  var mapOptions = {
		zoom: 17,
		center: myLatlng,
	    disableDefaultUI: true,
	    styles: styleArray
	  };
	  
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	layPolygons(map);
	var mylist = document.getElementById("myList");
	var finalLocationAcr = mylist.value;
	var building = BuildingDataInfo[finalLocationAcr];
	DisplayLocationInformation(building, map);
	//layIconsBuilding(building, map);
	layIcons(map);
}

/*
 * This function imitates the initialize function to run the clickable polygons
 */
function refreshPage(building, map){
	/*
	var styleArray = [
	                  {
					    featureType: "all",
					    elementType: "labels",
					    stylers: [
					      { visibility: "off" }
					    ]
					  },{
					    featureType: "road",
					    elementType: "labels",
					    stylers: [
					      { visibility: "on" }
					    ]
					  },{
					    featureType: "landscape",
					    elementType: "labels",
					    stylers: [
					      { visibility: "on" }
					    ]
					  }

	                 ]
	
	var myLatlng = map.getCenter();
	//var myLatlng = new google.maps.LatLng(45.385081, -75.69602);
  var mapOptions = {
		zoom: 17,
		center: myLatlng,
    disableDefaultUI: true,
    styles: styleArray
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  */
  DisplayLocationInformationNoPin(building, map);
  if((icons%2) == 0){
		layIconsNoBuilding(map);
  }
 layIcons(map);
}

function initialize() {
	var styleArray = [
	                  {
					    featureType: "all",
					    elementType: "labels",
					    stylers: [
					      { visibility: "off" }
					    ]
					  },{
					    featureType: "road",
					    elementType: "labels",
					    stylers: [
					      { visibility: "on" }
					    ]
					  },{
					    featureType: "landscape",
					    elementType: "labels",
					    stylers: [
					      { visibility: "on" }
					    ]
					  }

	                 ]
	      
	var myLatlng = new google.maps.LatLng(45.385081, -75.69602);
	  var mapOptions = {
		zoom: 17,
		center: myLatlng,
	    disableDefaultUI: true,
	    styles: styleArray
	  };
	  
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	if((icons%2) == 0){
		layIconsNoBuilding(map);
	}
	
	getMyPos();
	//layPolygons(map);
	layIcons(map);
	
	/*
	for(var i = 0; i < ALLPOINTS_tunnel.length; i++){	    
    	var myLatlng2 = new google.maps.LatLng(ALLPOINTS_tunnel[i].lat,ALLPOINTS_tunnel[i].lng);       	
    	var marker = new google.maps.Marker({
				    position: myLatlng2,	
				    title: ALLPOINTS_tunnel[i].name				
						});						
	    // To add the marker to the map, call setMap();
		  marker.setMap(map);
  }	
	
	*/
	
  
	
}



