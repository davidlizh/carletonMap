   //Contains function that will take in a location and a destination and return an array of Node Objects marking the path.

	function pathFinder1(location,destination){
	  var LocalDestination = new Object();
		LocalDestination.building = destination.building;
		LocalDestination.lat = destination.lat;
		LocalDestination.lng = destination.lng;
		
		var dest=LocalDestination;	// destination
		var loc =location;   //current Location. 
    	var pathArray=new Array();
		pathArray.push(loc);
		//Path finding loop while we are not at out destination
		while ( loc.building != dest.building ) {
			//finds the Closest SURR nearest to the destination
			var closest_pt= closest_pt_mark(dest,loc, pathArray);
			//Pushes Node object to our Array 
			pathArray.push(closest_pt);
			//Location is now the nearest point.
			loc=closest_pt;
		}
		//return array of object Nodes.
		return pathArray;
    }



function pathFinder2(location, destination) { 
		var openList   = [];
		var closedList = [];
		openList.push(location);
		//alert("am I here? ");
		for(var i = 0; i < ALLPOINTS.length; i++){	    
 				ALLPOINTS[i].g = 0;
 				ALLPOINTS[i].h = 0;
 				ALLPOINTS[i].f = 0;
    }	
 
		while(openList.length > 0) { 
			// Grab the lowest f(x) to process next
			var lowInd = 0;
			for(var i=0; i<openList.length; i++) {
				if(openList[i].f < openList[lowInd].f) { lowInd = i; }
			}
			var currentNode = openList[lowInd];			
 
			// End case -- result has been found, return the traced path
			if(currentNode.lat == destination.lat && currentNode.lng == destination.lng) {
				var curr = currentNode;
				var ret = [];
				while(curr.parent) {
					ret.push(curr);
					curr = curr.parent;
				}
				 alert("I want ot be here. ");
				return ret;
			}
 
			// Normal case -- move currentNode from open to closed, process each of its neighbors
			removeArrayItem(openList, currentNode);			
			closedList.push(currentNode);
			//var neighbors = astar.neighbors(grid, currentNode);
 
			for(var i=0; i<currentNode.surr.length;i++) {
				var neighbor = currentNode.surr[i];
				if(findArrayItem(closedList, neighbor)) {
					// not a valid node to process, skip to next neighbor
					continue;
				}
 
				// g score is the shortest distance from start to current node, we need to check if
				//	 the path we have arrived at this neighbor is the shortest one we have seen yet
				var gScore = currentNode.g + getDistance(currentNode, neighbor); // 1 is the distance from a node to it's neighbor
				var gScoreIsBest = false;
 
 
				if(!findArrayItem(openList, neighbor)) {
					// This the the first time we have arrived at this node, it must be the best
					// Also, we need to take the h (heuristic) score since we haven't done so yet

					gScoreIsBest = true;
					neighbor.h = getDistance(neighbor, destination); 
					openList.push(neighbor);
				}
				else if(gScore < neighbor.g) {
					// We have already seen the node, but last time it had a worse g (distance from start)
					gScoreIsBest = true;
					
					 
				}
 
				if(gScoreIsBest) {
					// Found an optimal (so far) path to this node.	 Store info on how we got here and
					//	just how good it really is...
					neighbor.parent = currentNode;
					neighbor.g = gScore;
					neighbor.f = neighbor.g + neighbor.h;
					//neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
					
					
				}
			}

		}
 
 		
		// No result was found -- empty array signifies failure to find path
		return [];
	}



function removeArrayItem(arr, item){
		var removeCounter = 0;
		for(var i = 0; i < arr.length; i++){
				if(arr[i].lat == item.lat && arr[i].lng == item.lng){
						arr.splice(i, 1);
						removeCounter++;
						i--;	
				}
		}
		return removeCounter;	
}

function findArrayItem(arr, item){
		for(var i = 0; i < arr.length; i++){
				if(arr[i].lat == item.lat && arr[i].lng == item.lng){
						return true;
				}
		}
		return false;
}


function getDistance(x, y){
	  var getX=(x.lat);
		var getY=(x.lng);
		var destX=(y.lat);
		var destY=(y.lng);
		//code segment to find dist between destination and point
		//var lats=Math.pow(destX-getX,2);
		var lats= (destX-getX) * 100;
		lats= lats*lats;
		//var lngs=Math.pow(destY-getY,2);
		var lngs= (destY-getY) * 100;
		lngs= lngs*lngs;
		var pt_distance=Math.sqrt(lats+lngs);
		return pt_distance;
}



function pathFinder(location, destination) {
    
    if(location.lat == destination.lat && location.lng == destination.lng) {
    	alert("You are in the same location. ");
    }
    if(OvsT == "O") {
	    for(var i = 0; i < ALLPOINTS.length; i++){	    
			ALLPOINTS[i].g = 0;
			ALLPOINTS[i].h = 0;
			ALLPOINTS[i].f = 0;
 				
     	    ALLPOINTS[i].visited = false;
	        ALLPOINTS[i].closed = false;
	        ALLPOINTS[i].parent = null;
    	}
    	
    } else if(OvsT == "T") {
    	for(var i = 0; i < ALLPOINTS_tunnel.length; i++){	    
			ALLPOINTS_tunnel[i].g = 0;
			ALLPOINTS_tunnel[i].h = 0;
			ALLPOINTS_tunnel[i].f = 0;
 				
     	    ALLPOINTS_tunnel[i].visited = false;
	        ALLPOINTS_tunnel[i].closed = false;
	        ALLPOINTS_tunnel[i].parent = null;
    	}
    }
	
     
/*
        options = options || {};
        var heuristic = options.heuristic || astar.manhattan;
        var diagonal = !!options.diagonal;
        var closest = options.closest || false;
*/
        var openHeap =  new BinaryHeap(function(node) {
            return node.f;
        });

        // set the start node to be the closest if required
     //   var closestNode = start;

     //   start.h = heuristic(start.pos, end.pos);

        function pathTo(node){
            var curr = node;
            var path = [];
            while(curr.parent) {
                path.push(curr);
                curr = curr.parent;
            }
            path.push(curr);
            return path;
        }


        openHeap.push(location);

        while(openHeap.size() > 0) {

            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            var currentNode = openHeap.pop();

            // End case -- result has been found, return the traced path.
            if(currentNode.lat == destination.lat && currentNode.lng == destination.lng) {
                return pathTo(currentNode);
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors.
            currentNode.closed = true;
            var str = currentNode.name;
            var len = currentNode.surr.length;
		//alert("" + currentNode.surr.length);
            for(var i=0; i<currentNode.surr.length;i++) {
                var neighbor = currentNode.surr[i];

                if(neighbor.closed) {
                    // Not a valid node to process, skip to next neighbor.
                    continue;
                }

                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                var gScore = currentNode.g + getDistance(currentNode, neighbor);
                var beenVisited = neighbor.visited;

                if(!beenVisited || gScore < neighbor.g) {

                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                    neighbor.visited = true;
                    neighbor.parent = currentNode;
                    neighbor.h = getDistance(neighbor, destination);
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
/*
                    if (closest) {
                        // If the neighbour is closer than the current closestNode or if it's equally close but has
                        // a cheaper path than the current closest node then it becomes the closest node
                        if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
                            closestNode = neighbor;
                        }
                    }
*/


                    if (!beenVisited) {
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        openHeap.push(neighbor);
                    }
                    else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        openHeap.rescoreElement(neighbor);
                    }
                }
            }
        }
/*
        if (closest) {
            return pathTo(closestNode);
        }
*/
        // No result was found - empty array signifies failure to find path.
        return [];
    }
   


function BinaryHeap(scoreFunction){
    this.content = [];
    this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
    push: function(element) {
        // Add the new element to the end of the array.
        this.content.push(element);

        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    },
    pop: function() {
        // Store the first element so we can return it later.
        var result = this.content[0];
        // Get the element at the end of the array.
        var end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.bubbleUp(0);
        }
        return result;
    },
    remove: function(node) {
        var i = this.content.indexOf(node);

        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();

        if (i !== this.content.length - 1) {
            this.content[i] = end;

            if (this.scoreFunction(end) < this.scoreFunction(node)) {
                this.sinkDown(i);
            }
            else {
                this.bubbleUp(i);
            }
        }
    },
    size: function() {
        return this.content.length;
    },
    rescoreElement: function(node) {
        this.sinkDown(this.content.indexOf(node));
    },
    sinkDown: function(n) {
        // Fetch the element that has to be sunk.
        var element = this.content[n];

        // When at 0, an element can not sink any further.
        while (n > 0) {

            // Compute the parent element's index, and fetch it.
            var parentN = ((n + 1) >> 1) - 1,
                parent = this.content[parentN];
            // Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element;
                this.content[n] = parent;
                // Update 'n' to continue at the new position.
                n = parentN;
            }

            // Found a parent that is less, no need to sink any further.
            else {
                break;
            }
        }
    },
    bubbleUp: function(n) {
        // Look up the target element and its score.
        var length = this.content.length,
            element = this.content[n],
            elemScore = this.scoreFunction(element);

        while(true) {
            // Compute the indices of the child elements.
            var child2N = (n + 1) << 1, child1N = child2N - 1;
            // This is used to store the new position of the element,
            // if any.
            var swap = null;
            var child1Score;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);

                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore){
                    swap = child1N;
                }
            }

            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N],
                    child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score)) {
                    swap = child2N;
                }
            }

            // If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }

            // Otherwise, we are done.
            else {
                break;
            }
        }
    }
};
