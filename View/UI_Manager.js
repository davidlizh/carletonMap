/* 
* Written by Varun and Eric Lanteigne and Luke Morrison March 1st 2014
*/ 


/*
 * Create a generic marker and return it 
 */
function CreateGenericMarker (Map, LatLngObject, Title) {
	
	var marker = new google.maps.Marker({
		position: LatLngObject,
		map: Map,
		title: Title,
		animation: google.maps.Animation.DROP
	    });
	
	return marker;
}

/*
 * Create a generic Information Window and return it 
 */
function CreateGenericInfoWindow (FinalLocation, Width) {
	//Information box format
	var directions = '<button id="test" >Click here to get directions</button>';
	var contentString =  '<div id="content">'+
	  '<div id="siteNotice">'+
	  '</div>'+ //'<button>' + '</button>'+
	  '<h2>' + FinalLocation.Name + '</h2>'+
	  '<div id="bodyContent">'+
	  '<p>'+ FinalLocation.Info + '</p>'+ "<input type='button' onclick='alert(\"Width\")'>"+ 
	  '</div>'+ 
	  '</div>';
	'editPreference("+preference+")'
	//maxWidth sets size of info box
	var infowindow = new google.maps.InfoWindow({
	  content: contentString,
	  maxWidth: 700
	});
	
	return infowindow;
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
 * This will place a marker on that given point and put an event on it 
 */
function DisplayLocationInformation(FinalLocation, Map) {
	//First give it a Lat Long place
	var FinalLatLng = new google.maps.LatLng(FinalLocation.Lat, FinalLocation.Long);
	var marker = CreateGenericMarker(Map, FinalLatLng, FinalLocation.Name);	
	var infowindow = CreateGenericInfoWindow(FinalLocation, FinalLocation.Name, 700);
	google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(Map, marker);
				});
	return marker;
}
/*
 * Initialize and lay down the map
 */
function initialize() {
	var mapOptions = {
	zoom: 15,
	center: myLatlng
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	google.maps.event.addListener(marker, 'click', toggleBounce);
	
	function toggleBounce() {
		  if (marker.getAnimation() != null) {
			marker.setAnimation(null);
			infowindow.close(map,marker);
		  } else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		  }
		}
}


