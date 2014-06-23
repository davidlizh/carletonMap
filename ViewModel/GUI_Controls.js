 //Function that is called when you click something in the dropdown
	function MapFromDropDown(sel) {
        //var building = BuildingDataInfo[sel.value];
        DESTINATION_building = sel.value;  
	    /*
	    if(OvsT == "O") {
	    	DESTINATION = building.entr;   
	    } else if(OvsT == "T") {
	    	DESTINATION = building.tunnelEntr; 
	    }	
	    */	
	           // debugger;
	   // var $menu_primary =  $('#menu-primary')
      //  $menu_primary.click();
        	$('#menu-primary').click();
       
        if(flightPath !== null) {
        	flightPath.setMap(null);
        }
   		
   		
        reinitialize();	
      
      /*
    	DESTINATION.building = sel.value;    	
    	var temp = new Object ();//Temporary Node to store lat and lng info
    	temp.lat = DESTINATION.lat;
    	temp.lng = DESTINATION.lng;
    	DESTINATION = FindClosestAssociatedPoint(temp, ALLPOINTS);//overwrite our starting location with our closest associated point.
    */   	
    	
    }
//Function that is called when you click the "go here" button in the infowindows	
  function MapFromBuildingClick(sel) {
        //building1 = BuildingDataInfo[sel];
        DESTINATION_building = sel;  



  		/*
  		if(OvsT == "O") {
	    	DESTINATION = building1.entr;   
	    } else if(OvsT == "T") {
	    	DESTINATION = building1.tunnelEntr; 
	    }	
  	    */
  	/*
  	
  	DESTINATION.building = sel;
  	
  		var temp = new Object ();//Temporary Node to store lat and lng info
    	temp.lat = DESTINATION.lat;
    	temp.lng = DESTINATION.lng;
    	DESTINATION = FindClosestAssociatedPoint(temp, ALLPOINTS);//overwrite our starting location with our closest associated point.
    */	
        if(flightPath !== null) {
        	flightPath.setMap(null);
        }
        if(infowindow !== null) {
        	marker.setMap(null);
        	infowindow.close();
        }
  		reinitialize();	
  }
//Function that is called when you toggle the Tunnels and Otrain.    
function OvsTclick(value){
  	
  	
  	//$menu_primary.trigger('touchend');
  		$('#menu-primary').click();
  	
  	OvsT = value;
  	
  	//var building = BuildingDataInfo[sel.value];//sets START general Building Location    	
  	if(value == "O") {
  		if(flightPath !== null) {
        	flightPath.setMap(null);
        }
        flightPath1.setMap(null);
        flightPath2.setMap(null);
        flightPath3.setMap(null);
        flightPath4.setMap(null);
        
  		reinitialize();	
      
  		//LOCATION = building.entr; 
  		//DESTINATION = building.entr;
  	} else {
  	    if(flightPath !== null) {
        	flightPath.setMap(null);
        }
        
        if(flightPath1 == null && flightPath2 == null && flightPath3 == null && flightPath4 == null) {
			var flightPlanCoordinates = [new google.maps.LatLng(T1.lat, T1.lng),
									     new google.maps.LatLng(T2.lat, T2.lng),
									     new google.maps.LatLng(T3.lat, T3.lng),
								         new google.maps.LatLng(T4.lat, T4.lng),
								         new google.maps.LatLng(T5.lat, T5.lng),
								         new google.maps.LatLng(T6.lat, T6.lng),
								         new google.maps.LatLng(T3.lat, T3.lng),
								         new google.maps.LatLng(T7.lat, T7.lng),
								         new google.maps.LatLng(T8.lat, T8.lng),
								         new google.maps.LatLng(T9.lat, T9.lng),
								         new google.maps.LatLng(T1.lat, T1.lng),
								         new google.maps.LatLng(T9.lat, T9.lng),
								         new google.maps.LatLng(T8.lat, T8.lng),
								         new google.maps.LatLng(T10.lat, T10.lng),             
								         new google.maps.LatLng(T11.lat, T11.lng),
								         new google.maps.LatLng(T12.lat, T12.lng),
								         new google.maps.LatLng(T11.lat, T11.lng),
								         new google.maps.LatLng(T13.lat, T13.lng),
								         new google.maps.LatLng(T11.lat, T11.lng),
								         new google.maps.LatLng(T14.lat, T14.lng),
								         new google.maps.LatLng(T15.lat, T15.lng),
								         new google.maps.LatLng(T16.lat, T16.lng), ];
			flightPath1 = new google.maps.Polyline({
			    path: flightPlanCoordinates,
			    geodesic: true,
			    strokeColor: '#FF0000',
			    strokeOpacity: 1.0,
			    strokeWeight: 5
			});
			  
			var flightPlanCoordinates2 = [new google.maps.LatLng(T5.lat, T5.lng),
							              new google.maps.LatLng(T18.lat, T18.lng),             
							              new google.maps.LatLng(T19.lat, T19.lng),
							              new google.maps.LatLng(T18.lat, T18.lng),
							              new google.maps.LatLng(T17.lat, T17.lng),
							              new google.maps.LatLng(T20.lat, T20.lng),];
			flightPath2 = new google.maps.Polyline({
			    path: flightPlanCoordinates2,
			    geodesic: true,
			    strokeColor: '#FF0000',
			    strokeOpacity: 1.0,
			    strokeWeight: 5
			});
			  
			var flightPlanCoordinates3 = [new google.maps.LatLng(T16.lat, T16.lng),
						                    new google.maps.LatLng(T25.lat, T25.lng),
						                    new google.maps.LatLng(T23.lat, T23.lng),             
						                    new google.maps.LatLng(T24.lat, T24.lng),
						                    new google.maps.LatLng(T23.lat, T23.lng),  
										    new google.maps.LatLng(T25.lat, T25.lng),
						            		new google.maps.LatLng(T21.lat, T21.lng),             
						             		new google.maps.LatLng(T27.lat, T27.lng),
						            		new google.maps.LatLng(T26.lat, T26.lng),  
							                new google.maps.LatLng(T27.lat, T27.lng),            
							                new google.maps.LatLng(T22.lat, T22.lng),
							                new google.maps.LatLng(T28.lat, T28.lng),
							                new google.maps.LatLng(T29.lat, T29.lng),
						                    new google.maps.LatLng(T30.lat, T30.lng),
						                    new google.maps.LatLng(T31.lat, T31.lng),
						                    new google.maps.LatLng(T32.lat, T32.lng),
						                    new google.maps.LatLng(T31.lat, T31.lng),
						                    new google.maps.LatLng(T29.lat, T29.lng),
						                    new google.maps.LatLng(T28.lat, T28.lng),
						                    new google.maps.LatLng(T98.lat, T98.lng),
					                        new google.maps.LatLng(T73.lat, T73.lng),
							                new google.maps.LatLng(T98.lat, T98.lng),
						                    new google.maps.LatLng(T33.lat, T33.lng),
						                    new google.maps.LatLng(T34.lat, T34.lng),
					                        new google.maps.LatLng(T35.lat, T35.lng),
					                        new google.maps.LatLng(T33.lat, T33.lng),
					                        new google.maps.LatLng(T36.lat, T36.lng),
					                        new google.maps.LatLng(T37.lat, T37.lng),
					                        new google.maps.LatLng(T38.lat, T38.lng),
					                        new google.maps.LatLng(T36.lat, T36.lng),
					                        new google.maps.LatLng(T39.lat, T39.lng),
					                        new google.maps.LatLng(T40.lat, T40.lng),
					                        ];
					                        
			flightPath3 = new google.maps.Polyline({
			    path: flightPlanCoordinates3,
			    geodesic: true,
			    strokeColor: '#FF0000',
			    strokeOpacity: 1.0,
			    strokeWeight: 5
			});
			  
			var flightPlanCoordinates4 = [new google.maps.LatLng(T21.lat, T21.lng),  
						                  new google.maps.LatLng(T41.lat, T41.lng),
						                  new google.maps.LatLng(T42.lat, T42.lng),
						                  new google.maps.LatLng(T43.lat, T43.lng),
						                  new google.maps.LatLng(T44.lat, T44.lng),
						                  new google.maps.LatLng(T45.lat, T45.lng),
						                  new google.maps.LatLng(T46.lat, T46.lng),
						                  new google.maps.LatLng(T45.lat, T45.lng),
						                  new google.maps.LatLng(T44.lat, T44.lng),
						                  new google.maps.LatLng(T43.lat, T43.lng),
						                  new google.maps.LatLng(T42.lat, T42.lng),
						                  new google.maps.LatLng(T47.lat, T47.lng),
						                  new google.maps.LatLng(T61.lat, T61.lng),
						                  new google.maps.LatLng(T47.lat, T47.lng), 
						                  new google.maps.LatLng(T48.lat, T48.lng),                  
						                  new google.maps.LatLng(T50.lat, T50.lng),
						                  new google.maps.LatLng(T48.lat, T48.lng), 
						                  new google.maps.LatLng(T49.lat, T49.lng),                
						                  new google.maps.LatLng(T51.lat, T51.lng),                  
						                  new google.maps.LatLng(T52.lat, T52.lng),
						                  new google.maps.LatLng(T53.lat, T53.lng),
						                  new google.maps.LatLng(T52.lat, T52.lng),                 
						                  new google.maps.LatLng(T54.lat, T54.lng),
						                  new google.maps.LatLng(T55.lat, T55.lng),];
		    flightPath4 = new google.maps.Polyline({
			    path: flightPlanCoordinates4,
			    geodesic: true,
			    strokeColor: '#FF0000',
			    strokeOpacity: 1.0,
			    strokeWeight: 5
			});
				
 		}       
        
        flightPath1.setMap(map);
	    flightPath2.setMap(map);
        flightPath3.setMap(map);
	    flightPath4.setMap(map);   
	    reinitialize();
  	}  		  

}


//Function that is called when you click the building icons radio button.    
  function iconsToggle(){
  	icons += 1;
  	initialize();
  }