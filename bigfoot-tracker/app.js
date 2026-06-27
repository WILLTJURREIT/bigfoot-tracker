"use strict";


// INITIALIZE LEAFLET MAP AND BASE SETTINGS  ============================================

//Earthquake Visualization application with leaflet.js and d3.js
//This codes from the Demo - "Part 2: Implementing the Map"


// Initialize the Leaflet map
var map = L.map('map').setView([39.8283, -98.5795], 3); // North America View

// Full Screen Option on Map
// L.control.fullscreen({ position: 'topleft' }).addTo(map);

// Set map boundaries to prevent too much zooming out and repeating
var bounds = [
    [5, -170], // Southwest coordinates   (Left side of canada)
    [83, -30]    // Northeast coordinates (Right side of canada)
];

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    noWrap: true // Prevent the map from repeating
}).addTo(map);

// Set max bounds to prevent panning outside the world view
map.setMaxBounds(bounds);


//  GLOBAL STATE VARIABLES  ========================================

let selectedState = "all";
let selectedDecade = "all";

  // BUILD DYNAMIC QUERY FUNCTION
  //  Combines decade and state filters ========================================
function buildQuery() {
  let query = "1=1";
//If the all option is selected then 1=1 will show all the data ont he map. Else if for every 10 years selected year plus 9 more = 10years (decade) we will show the decade. resources used to help understand: https://developers.arcgis.com/rest/services-reference/enterprise/query-date-bins-fsl
  if (selectedDecade !== "all") {
    const start = parseInt(selectedDecade);
    const end = start + 9;
    query = `Year >= '${start}' AND Year <= '${end}'`;
  }

  if (selectedState !== "all") {
    query = query === "1=1"
      ? `STATE_NAME='${selectedState}'`
      : `${query} AND STATE_NAME='${selectedState}'`;
  }

  return query;
}


//  FETCH DATA FROM BIGFOOT API USING ASYNC FUNCTION ===================================================



//fetch API data function (currentState argument is for the filter dropdown selected state 1=1 means show all initially, I can use just the one function by adding to this function reducing the redundancy)
async function getBigFootData(currentState = "1=1") {
  const originalUrl = "https://services2.arcgis.com/sJvSsHKKEOKRemAr/arcgis/rest/services/Bigfoot Locations/FeatureServer/0/query";
// Builds a dynamic query string for the API using URLSearchParams() which is a built in function. This replaces hardcoded parameters and ensures the REST GET request is properly formatted for the selected current State.
 const parameter = new URLSearchParams({
    where: currentState,  
    outFields: "*",        
    outSR: "4326",         
    f: "json",    
    // attempt to fix issue with not displaying all data (wont work 2000 is hard coded)
    // resultRecordCount: 5000,
    // returnGeometry: true,   
    // returnExceededLimitFeatures: true
  });


  const url = `${originalUrl}?${parameter.toString()}`; 
  
  console.log("Fetching from:", url); 

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);  
    }

    const result = await response.json();
    console.log("Bigfoot test feature call:", result.features[0, 20, 40, 60]);


// Add variables as references to the data extracted from the API
    const sightings = result.features;
    console.log("Number of sightings loaded:", sightings.length);


    sightings.forEach((sighting) => {
    const coordinates = sighting.geometry;
    const info = sighting.attributes;
// Add circle for map location - https://leafletjs.com/examples/quick-start/
if (coordinates && coordinates.y && coordinates.x ) {
    const circle = L.circle([coordinates.y, coordinates.x], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 1000
    }).addTo(map);
 // bindPopup is a built in function, that binds a pop up that can display some text or info when the object, in this case is a red dot, is clicked. the temperate literals in the object are adding the information from the query to the pop up so the user can view it.  https://leafletjs.com/reference.html#layer-bindpopup
    circle.bindPopup(`
      <b>${info.name}</b><br>
      ${info.descriptio || "Does not have description."}<br>
      <i>${info.STATE_NAME || "No location."}, ${info.Year || "No Year noted."}</i>
    `);
  }
})
  } catch (error) {
    console.error("Error fetching Bigfoot data:", error.message);
 
  }
}
//helper function that uses the ternary operator to 
function resetToAllStates(currentState) {
  return currentState === "all" ? "1=1" : `STATE_NAME='${currentState}'`;
}




// STATE FILTER DROPDOWN EVENT LISTENER ============================================



//Get the value from from the stateSelect drop down menu (listener)
document.getElementById("stateSelect").addEventListener("change", (event) => {
   selectedState = event.target.value; 
  // alert("The selected state is: " + selectedState); // check for value (value is true)

  

  // Map eachLayer() is a built in function which loops over all layers that have been added to the map, in this case it would be the current red marker circles. 

  //How this is being used the code begins with a single map layer (tiles), and then red markers are added to locations on top of that layer and so they become a new layer. This checks the if the layer is the circle markers layer, if true it removes the current layer from on top of the map tile layer. now we have nothing on the map and we can update the map with the new chosen state. 
   map.eachLayer((layer) => {
    if (layer instanceof L.Circle) {
      map.removeLayer(layer);
    }
  });
  //alert("Current State chosen: "+currentState); check when I choose from drop down if I get the value, (is working)
  // getBigFootData(currentState);


  // Added to this using the buildQuery helper function to combine queries
  const query = buildQuery(); 
  console.log("Query:", query);
  getBigFootData(query);
});


//  DECADE FILTER DROPDOWN EVENT LISTENER ==========================================


document.getElementById("selectDecade").addEventListener("change", (event) => {
   selectedDecade = event.target.value;

  map.eachLayer((layer) => {
    if (layer instanceof L.Circle) map.removeLayer(layer);
  });
  
// alert("INFORMATION: " + query);
//   getBigFootData(query);
 // Added to this using the buildQuery helper function to combine queries


  const query = buildQuery(); 
  console.log("Query:", query);
  getBigFootData(query);
});

  //  INITIAL MAP LOAD THAT SHOWS ALL DATA ===============================================

// This should be the first initial loading of the page. 
getBigFootData("1=1");
