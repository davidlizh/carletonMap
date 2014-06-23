var map;
var flightPath = null;
var gpsPosition = {lat : null, lng : null};
var DESTINATION;//This is the global destination object
var DESTINATION_building;
var LOCATION; // This is the global start positon 
var LOCATION_building = null;
var START =A10;//FIXME, remove this unnecessary and poorly placed global
var OvsT = "O";//This is the variabe that decides outside versus tunnels
var icons = 1;//icons toggle


var marker = null;
var infowindow = null;
	
var flightPath1 = null;
var flightPath2 = null;
var flightPath3 = null;
var flightPath4 = null;
var zoomLevel1 = null;
var zoomLevel2 = null;
var zoomLevel3 = null;
var zoomLevel4 = null;