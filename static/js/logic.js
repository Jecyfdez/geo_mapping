var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

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

//create a function to change the color of circle markers
  function circleColor(x){
    if(x < 1){
          return "green"}
    else if (x > 1 && x <2){
        return "yellow"
    } 
    else if (x >2 && x <3){
        return "orange"
      }
          
    else if (x >3 && x <4){
        return "red"
    }
          
    else if (x >4 && x <5){
        return "purple"
      }

    else {
        return "black"
    } 
    }
  
// Perform a GET request to the query URL
d3.json(url, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data.features)
    // Get all earthquakes by lat + long
    for (i = 0; i < data.features.length; i++) {
        earthquakeData = data.features[i]
        var lat = earthquakeData.geometry.coordinates[1]
        var long = earthquakeData.geometry.coordinates[0]
        //Get magnitude of earthquakes
        var mag = earthquakeData.properties.mag
        var location = earthquakeData.properties.place
        //Include popups that provide additional information about the earthquake 
        //when a marker is clicked
        L.circleMarker([lat, long],{
            radius: mag*5,
            color: circleColor(mag)
        }).bindPopup(`<h1> MAGNITUDE: ${mag} (mms)</h1>
        <h2>NEAREST LOCATION: ${location}</h2>
        <h3>COORDINATES : [${long}, ${lat}] </h3>`)
        .addTo(myMap)
            
    }
 
  });

  function getColor(d) {
    return d < 2 ? 'green' :
           d < 3  ? 'yellow' :
           d < 4  ? 'orange' :
           d < 5  ? 'red' :
           d < 6   ? 'purple' :
                      'black';
}
   
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'info legend'),
            mags = [0,1, 2, 3, 4, 5],
            labels = ["Magnitude"];
    
        // loop through our magnitude intervals and generate a label with a colored square for each interval
        for (var i = 0; i < mags.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(mags[i] + 1) + '"></i> ' +
                mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
    
    legend.addTo(myMap);
 
  