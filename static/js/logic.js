var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// function createFeatures(earthquakeData)

// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 3
  });

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  function circleColor(mag){
      switch(mag){
        case mag > 1:
            return "green";
        case mag < 1 && mag >2:
            return "yellow"
        case mag >2 && mag <3:
            return "orange";
        case mag >3 && mag <4:
            return "red";
        case mag >4 && mag <5:
            return "purple"
        case mag >5:
            return "black"
      }
  }
  
// Perform a GET request to the query URL
d3.json(url, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data.features)
    // Get all earthquakes by lat + long
    for (i = 0; i < data.features.length; i++) {
        // if lat = 
        earthquakeData = data.features[i]
        var lat = earthquakeData.geometry.coordinates[1]
        var long = earthquakeData.geometry.coordinates[0]
        //Get magnitude of earthquakes
        var mag = earthquakeData.properties.mag
        var location = earthquakeData.properties.place

        L.circleMarker([lat, long],{
            radius: mag*5,
            fillColor: circleColor(mag)
        }).bindPopup(`<h1> MAGNITUDE: ${mag}</h1>
        <h2>NEAREST LOCATION: ${location}</h2>
        <h3>COORDINATES : [${long}, ${lat}] </h3>`)
        .addTo(myMap)
            
    }
 
    //Include popups that provide additional information about the earthquake 
    //when a marker is clicked




    //Create a legend that will provide context for your map data
    
  });
 
  