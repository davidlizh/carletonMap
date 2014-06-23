function reinitialize() {
	//Style Array removes all pre existing google maps Labels that are undesirable 
	/*
	var styleArray = [{featureType: "all",elementType: "labels",stylers: [ { visibility: "off" } ]},
					  {featureType: "road", elementType: "labels", stylers: [ { visibility: "on"} ]},
					  {featureType: "landscape", elementType: "labels", stylers: [ { visibility: "on" } ]}
	                 ]
	
	//initializes the map so it is centered around the destination.
	var mapOptions = {
          center: new google.maps.LatLng(DESTINATION.lat, DESTINATION.lng),
          zoom: 17,
          disableDefaultUI: true,
          styles: styleArray
        };
		
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);	
    */
   

    			
		  if(LOCATION_building == null) {
		  	 //  getMyPos();
		  	// alert(gpsPosition);
		  	   
		  	   //alert("reload: " + gpsPosition.lat + " ; " + gpsPosition.lng);
		  	     
		  	//while(gpsPosition.lat == null && gpsPosition.lng == null){}
		
		  //alert(gpsPosition.lat + "; " + gpsPosition.lng);
		
		   
		  /*	   
		  	   var intvl = setInterval(function() {
				    if (gpsPosition.lat != null && gpsPosition.lng != null) { 
				        clearInterval(intvl);
				       // console.log(data);
				    }
				}, 1000);
				
				alert(gpsPosition.lat);
			*/	
		      if(OvsT == "O") {
		  	   	LOCATION = FindClosestPointToGPSPoint(gpsPosition, ALLPOINTS);
		           DESTINATION = BuildingDataInfo[DESTINATION_building].entr;
		      } else if(OvsT == "T") {
		  		LOCATION = FindClosestPointToGPSPoint(gpsPosition, ALLPOINTS_tunnel);
		           DESTINATION = BuildingDataInfo[DESTINATION_building].tunnelEntr;
		  	   }
		  	   
		  	  
		  
		  } else {
	          if(OvsT == "O") {
		  	   		LOCATION = BuildingDataInfo[LOCATION_building].entr;
		           DESTINATION = BuildingDataInfo[DESTINATION_building].entr;
		  
		      } else if(OvsT == "T") {
		  			LOCATION = BuildingDataInfo[LOCATION_building].tunnelEntr;
		           DESTINATION = BuildingDataInfo[DESTINATION_building].tunnelEntr;
		  	   }
		  	   
		  	   
		  														 
		  	   
		  
		  	  
		  }		 
		 
	
    
    //Make a step by step trail of custom point objects that use the graph to get from location to destination
    //if (LOCATION.hasNo
    
    //alert( LOCATION.name); 
    /*
	if (typeof c !== "undefined") {
    	alert("Please choose a location");
	}
	*/
	
   	   
		  	   var pathArray = pathFinder(LOCATION,DESTINATION);  
    
			    //alert(""+pathArray[0].name);
			   // alert(""+LOCATION.name);
			    //var startPoint = BuildingDataInfo[sel.value];
			   //pathArray.push(LOCATION);
			    
			    //Array to make them LatLng objects.
			    var walkPath = new Array();
			    for(var i=0;i<pathArray.length;i++){
			    	walkPath.push(new google.maps.LatLng(pathArray[i].lat,pathArray[i].lng));
			    }
			    //Initializes the Polyline using the newly created array that holds our google maps latlng objects.	
				flightPath = new google.maps.Polyline({
					path: walkPath,
					geodesic: true,
					strokeColor: 'blue',
					strokeOpacity: 1.0,
					strokeWeight: 5,
					zIndex: 100
					});
				
				//sets polyline on the map.	
				flightPath.setMap(map);
				
				var centreLat = (LOCATION.lat + DESTINATION.lat) / 2;
				var centreLng = (LOCATION.lng + DESTINATION.lng) / 2;
				map.panTo(new google.maps.LatLng(centreLat, centreLng));
				
				
				//var height = $(window).height()/$(window).width();
				
				
				if(zoomLevel1 == null && zoomLevel2 == null && zoomLevel3 == null && zoomLevel4 == null) {	
					var tempPoint1 = new Object();
					    tempPoint1.lat = 45.38303;
					    tempPoint1.lng = -75.69904;
					var tempPoint2 = new Object();
					    tempPoint2.lat = 45.38214;
					    tempPoint2.lng = -75.69895;
					zoomLevel1 = getDistance(tempPoint1, tempPoint2);
					
					var tempPoint3 = new Object();
					    tempPoint3.lat = 45.38329;
					    tempPoint3.lng = -75.69831;
					var tempPoint4 = new Object();
					    tempPoint4.lat = 45.38200;
					    tempPoint4.lng = -75.69829;
					zoomLevel2 = getDistance(tempPoint3, tempPoint4);
					
					var tempPoint5 = new Object();
					    tempPoint5.lat = 45.38250;
					    tempPoint5.lng = -75.69581;
					var tempPoint6 = new Object();
					    tempPoint6.lat = 45.38240;
					    tempPoint6.lng = -75.69942;
					zoomLevel3 = getDistance(tempPoint5, tempPoint6);
					
					/*
					var tempPoint7 = new Object();
					    tempPoint7.lat = 45.38825;
					    tempPoint7.lng = -75.69650;
					var tempPoint8 = new Object();
					    tempPoint8.lat = 45.38185;
					    tempPoint8.lng = -75.69613;
					var zoomLevel4 = getDistance(tempPoint7, tempPoint8);	
					*/
				     
				    zoomLevel4 = getDistance(T85, T68);	
				 	//console.log ({a: zoomLevel1, b: zoomLevel2, c: zoomLevel3, d: zoomLevel4});
				 	//debugger;
					
				}
				
				var distance = getDistance(LOCATION, DESTINATION);
				//alert(distance);
				/*
				if(distance < zoomLevel1) {
					map.setZoom(19);
				} else 
				*/
				if(distance < zoomLevel2) {
					map.setZoom(18);
			    } else if(distance > zoomLevel2 && distance < zoomLevel3) {
					map.setZoom(17);
				} else if(distance > zoomLevel3 && distance <= zoomLevel4) {
					map.setZoom(16);	
			    }else {
					map.setZoom(15);
			    }
			
			//map.setZoom(16);
			
			
					if((icons%2) == 0){
						layIconsBuilding(DESTINATION, map);
					}
					layIcons(map);		
		

}



function reinitializeWithGPS() {
	//Style Array removes all pre existing google maps Labels that are undesirable 
	/*
	var styleArray = [{featureType: "all",elementType: "labels",stylers: [ { visibility: "off" } ]},
					  {featureType: "road", elementType: "labels", stylers: [ { visibility: "on"} ]},
					  {featureType: "landscape", elementType: "labels", stylers: [ { visibility: "on" } ]}
	                 ]
	
	//initializes the map so it is centered around the destination.
	var mapOptions = {
          center: new google.maps.LatLng(DESTINATION.lat, DESTINATION.lng),
          zoom: 17,
          disableDefaultUI: true,
          styles: styleArray
        };
		
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);	
    */
   

 /*   			
		  if(LOCATION_building == null) {
		  	   getMyPos();
		  	   //alert(gpsPosition);
		  	   //alert("reload: " + gpsPosition.lat + " ; " + gpsPosition.lng);
		  	   //while(gpsPosition.lat = null && gpsPosition.lng = null){}
		  	   
		  	   
		  	   var intvl = setInterval(function() {
				    if (LOCATION != null) { 
				        clearInterval(intvl);
				       // console.log(data);
				    }
				}, 100);
				
				alert(LOCATION);
				
		      if(OvsT == "O") {
		  	   	//	LOCATION = FindClosestPointToGPSPoint(gpsPosition, ALLPOINTS);
		           DESTINATION = BuildingDataInfo[DESTINATION_building].entr;
		      } else if(OvsT == "T") {
		  		//	LOCATION = FindClosestPointToGPSPoint(gpsPosition, ALLPOINTS_tunnel);
		           DESTINATION = BuildingDataInfo[DESTINATION_building].tunnelEntr;
		  	   }
		  
		  } else {
	          if(OvsT == "O") {
		  	   		LOCATION = BuildingDataInfo[LOCATION_building].entr;
		           DESTINATION = BuildingDataInfo[DESTINATION_building].entr;
		  
		      } else if(OvsT == "T") {
		  			LOCATION = BuildingDataInfo[LOCATION_building].tunnelEntr;
		           DESTINATION = BuildingDataInfo[DESTINATION_building].tunnelEntr;
		  	   }
		  
		  	  
		  }		 
		 
	*/
    
    //Make a step by step trail of custom point objects that use the graph to get from location to destination
    //if (LOCATION.hasNo
    
    //alert( LOCATION.name); 
    /*
	if (typeof c !== "undefined") {
    	alert("Please choose a location");
	}
	*/
	
    var pathArray = pathFinder(LOCATION,DESTINATION);  
    
    //alert(""+pathArray[0].name);
   // alert(""+LOCATION.name);
    //var startPoint = BuildingDataInfo[sel.value];
   //pathArray.push(LOCATION);
    
    //Array to make them LatLng objects.
    var walkPath = new Array();
    for(var i=0;i<pathArray.length;i++){
    	walkPath.push(new google.maps.LatLng(pathArray[i].lat,pathArray[i].lng));
    }
    //Initializes the Polyline using the newly created array that holds our google maps latlng objects.	
	flightPath = new google.maps.Polyline({
		path: walkPath,
		geodesic: true,
		strokeColor: 'blue',
		strokeOpacity: 1.0,
		strokeWeight: 5,
		zIndex: 100
		});
	
	//sets polyline on the map.	
	flightPath.setMap(map);
	
	var centreLat = (LOCATION.lat + DESTINATION.lat) / 2;
	var centreLng = (LOCATION.lng + DESTINATION.lng) / 2;
	map.panTo(new google.maps.LatLng(centreLat, centreLng));
	
	
	//var height = $(window).height()/$(window).width();
	
	
	if(zoomLevel1 == null && zoomLevel2 == null && zoomLevel3 == null && zoomLevel4 == null) {	
		var tempPoint1 = new Object();
		    tempPoint1.lat = 45.38303;
		    tempPoint1.lng = -75.69904;
		var tempPoint2 = new Object();
		    tempPoint2.lat = 45.38214;
		    tempPoint2.lng = -75.69895;
		zoomLevel1 = getDistance(tempPoint1, tempPoint2);
		
		var tempPoint3 = new Object();
		    tempPoint3.lat = 45.38329;
		    tempPoint3.lng = -75.69831;
		var tempPoint4 = new Object();
		    tempPoint4.lat = 45.38200;
		    tempPoint4.lng = -75.69829;
		zoomLevel2 = getDistance(tempPoint3, tempPoint4);
		
		var tempPoint5 = new Object();
		    tempPoint5.lat = 45.38250;
		    tempPoint5.lng = -75.69581;
		var tempPoint6 = new Object();
		    tempPoint6.lat = 45.38240;
		    tempPoint6.lng = -75.69942;
		zoomLevel3 = getDistance(tempPoint5, tempPoint6);
		
		/*
		var tempPoint7 = new Object();
		    tempPoint7.lat = 45.38825;
		    tempPoint7.lng = -75.69650;
		var tempPoint8 = new Object();
		    tempPoint8.lat = 45.38185;
		    tempPoint8.lng = -75.69613;
		var zoomLevel4 = getDistance(tempPoint7, tempPoint8);	
		*/
	     
	    zoomLevel4 = getDistance(T85, T68);	
	 	//console.log ({a: zoomLevel1, b: zoomLevel2, c: zoomLevel3, d: zoomLevel4});
	 	//debugger;
		
	}
	
	var distance = getDistance(LOCATION, DESTINATION);
	//alert(distance);
	/*
	if(distance < zoomLevel1) {
		map.setZoom(19);
	} else 
	*/
	if(distance < zoomLevel2) {
		map.setZoom(18);
    } else if(distance > zoomLevel2 && distance < zoomLevel3) {
		map.setZoom(17);
	} else if(distance > zoomLevel3 && distance <= zoomLevel4) {
		map.setZoom(16);	
    }else {
		map.setZoom(15);
    }

//map.setZoom(16);


		if((icons%2) == 0){
			layIconsBuilding(DESTINATION, map);
		}
		layIcons(map);
		


}

