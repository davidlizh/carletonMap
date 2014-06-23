//Function to find closest Node Object. 
/**************************************
*This function does this
*@param
*return
*/
function FindClosestAssociatedPoint(loc, mainArr){		
	var closestPt = mainArr[0];
	var Inf = 10000;//finite number to represent infinite distance								
	var shortDist;
	var curr = mainArr.length;
	var count = 0;
	
	for(var i=0; i < curr-1;i++){		
		shortDist = closest_pt_mark2(loc, mainArr[i]);		//shortDist is the distance calculated
		if(shortDist<Inf){			//if its less than INF 
			Inf=shortDist;				//update INF to shortest, so next loop it will compare to shortest
			closestPt=mainArr[i];		//update our point, so it finds the closest		
		}
		count++;

	}
	
	return closestPt;			//return the closest point of our object from the current location
}

function closest_pt_mark2(desti , loca){
	
		var length = loca.surr.length;	
		var dist = 100000;		// initialise dist to high arbitrary number
		var closest = desti; 	// set closest point to the destination
		
		//for loop to make marker only for closest point to destination
		
		for(var w = 0; w < length ; w++)
		{
			var getX = (loca.surr[w].lat);
			var getY = (loca.surr[w].lng);
			var destX = (desti.lat);
			var destY = (desti.lng);
			
			//code segment to find dist between destination and point
			
			// latitudes
			var lats = destX - getX;
			lats = lats * lats;
			
			// longitudes
			var lngs = destY - getY;
			lngs = lngs * lngs;
			
			// distance from point
			var pt_distance = Math.sqrt(lats + lngs);
			
			// if the pt_distance is less than dist then update dist and closest point
			if(pt_distance < dist)
			{
				dist = pt_distance;		//update the distance
				//closest = loca.surr[w]; // reset the closest point
			}	
		}
		return dist;	//CHANGED THIS TO return dist, because distance is needed to calculate closest point in the other function
	}	
	  



function FindClosestAssociatedPoint4(desti , loca){		
		var length = loca.surr.length;	
		var dist = 100000;		// initialise dist to high arbitrary number
		var closest; 	// set closest point to the destination
		
		//for loop to make marker only for closest point to destination
		
		for(var w = 0; w < length ; w++)
		{
			var getX = (loca.surr[w].lat);
			var getY = (loca.surr[w].lng);
			var destX = (desti.lat);
			var destY = (desti.lng);
			
			//code segment to find dist between destination and point
			
			// latitudes
			var lats = destX - getX;
			lats = lats * lats;
			
			// longitudes
			var lngs = destY - getY;
			lngs = lngs * lngs;
			
			// distance from point
			var pt_distance = Math.sqrt(lats + lngs);
			
			// if the pt_distance is less than dist then update dist and closest point
			if(pt_distance < dist)
			{
				dist = pt_distance;		//update the distance
				closest = loca.surr[w]; // reset the closest point
			}	
		}
		
	   return closest;			//return the closest point of our object from the current location
}
