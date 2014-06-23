
function getMyPos() {
	//Checks to see if users phone or browser supports GPS.  
    if (navigator.geolocation) {	
      navigator.geolocation.getCurrentPosition(success, error);	
    } else {
      console.log('Geolocation is not supported. Please select a Current Location in the Menu as your start point.');	
    }
}
 //function to display error when GPS is not available
function error(){
  	alert("The GPS cannot find your location at the moment. Please check if your GPS is on or select a Current Location in the Menu as your start point.");
 }	
  //Sets current location to the recently gathered GPS location from browser or phone.
function success(position){	
	
	var obj = new Object();	
	obj.lat = position.coords.latitude; 
	obj.lng = position.coords.longitude;	
	gpsPosition = obj;
	//alert(gpsPosition.lat + "; " + gpsPosition.lng);
	 
/*	 
	  if(OvsT == "O") {
	   		LOCATION = FindClosestPointToGPSPoint(gpsPosition, ALLPOINTS);
	       DESTINATION = BuildingDataInfo[DESTINATION_building].entr;
	  } else if(OvsT == "T") {
			LOCATION = FindClosestPointToGPSPoint(gpsPosition, ALLPOINTS_tunnel);
	       DESTINATION = BuildingDataInfo[DESTINATION_building].tunnelEntr;
	  }
	
	*/
	//reinitializeWithGPS();
}      




function FindClosestPointToGPSPoint(gpsPoint, mainArr){		
	var closestPt = mainArr[0];		
				
	var shortDist = getDistance(gpsPoint, mainArr[0]);
	
	var tempDist;

	for(var i=1; i < mainArr.length-1; i++){		
		tempDist = getDistance(gpsPoint, mainArr[i]);		
		if(tempDist < shortDist){			
			shortDist = tempDist;		//update shortDist to shortest
			closestPt = mainArr[i];		//update our point, so it finds the closest		
		}
	}
	
	return closestPt;			//return the closest point of our object from the GPS location
}