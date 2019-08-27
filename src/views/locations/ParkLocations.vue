<template> 
  <div class="google-map" :id="mapName"></div>
</template>
<script>
export default {
  name: 'google-map',
  props: {
    parkName: String, 
    latitude: String,
    longitude: String,
    address: String,
    opening: String,
    closing: String 
  },
  data: function () {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [{
                          name: "Magic Kingdom",
                          address: "1180 Seven Seas Dr, Lake Buena Vista, FL 32830",
                          hours: "9AM - 10PM",
                          latitude: 28.4177,
                          longitude: -81.5812
                          }, {
                          name: "Animal Kingdom",
                          address: " 2901 Osceola Pkwy, Orlando, FL 32830",
                          hours: "9AM - 10PM",
                          latitude: 28.3597,
                          longitude: -81.5913
                          }, {
                          name: "Hollywood Studios",
                          address: "1180 Seven Seas Dr, Lake Buena Vista, FL 32830",
                          hours: "9AM - 10PM",
                          latitude: 28.3575,
                          longitude: -81.5583
                          }, {
                          name: "Epcot",
                          address: "200 Epcot Center Dr, Orlando, FL 32821",
                          hours: "9AM - 10PM",
                          latitude: 28.3747,
                          longitude: -81.5494
                        }],
      map: null,
      bounds: null,
      markers: [],
      infoWindow: null
    }
  },

  mounted: function () {
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName)
    const mapCentre = { lat: 28.3838229, lng: -81.5886027 }
    const middle = new google.maps.LatLng(mapCentre.lat, mapCentre.lng)    
    const infoWindow = new google.maps.InfoWindow();

    this.map = new google.maps.Map(element, { zoom: 13, center: middle });
    
    this.markerCoordinates.forEach((coord) => { 
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      var marker = new google.maps.Marker({
        position, 
        map: this.map,
        name: coord.name,
        hours: coord.hours,
        address: coord.address
      });

    (function (map, marker) {
      google.maps.event.addListener(marker, "click", function (e) {

      var contentString = '<div id="content">'+
                            '<div id="container">'+
                              `<h2 id="firstHeading" class="firstHeading" style='text-align:center; color: black;'>${marker.name}</h2>`+
                            '<div id="bodyContent">'+
                              `<p style='color:black;'>${marker.hours}</p>` +
                              `<p style='color:black;'>${marker.address}</p>` +
                            '</div>'+
                          '</div>'+
                        '</div>';

        infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + contentString + "</div>");
          infoWindow.open(this.map, marker);
        });
      })(this.map, marker); 

      this.markers.push(marker);
      this.map.fitBounds(this.bounds.extend(position));
    });
  }
};
</script>
<style scoped>
.google-map {
  width: 1100px;
  height: 500px;
  margin: 0 auto;
  background: gray;
}
</style>
