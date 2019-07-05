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

    const mapCentre = { lat: this.markerCoordinates[0].latitude, lng: this.markerCoordinates[0].longitude, rideName: this.markerCoordinates[0].rideName, wait: this.markerCoordinates[0].wait }

    const middle = new google.maps.LatLng(mapCentre.lat, mapCentre.lng)    

    this.map = new google.maps.Map(element, {zoom:10, center: middle});

    this.markerCoordinates.forEach((coord) => { 
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({ 
        position,
        map: this.map
      });
    console.log(coord.wait);
    console.log(coord.rideName);
    var contentString = '<div id="content">'+
                          '<div id="container">'+
                            `<h2 id="firstHeading" class="firstHeading" style='text-align:center;'>${coord.parkName}</h2>`+
                          '<div id="bodyContent">'+
                            `<p>${coord.address}</p>` +
                          '</div>'+
                        '</div>'+
                      '</div>';
      // var infoWindow = new google.maps.InfoWindow;
      var infoWindow = new google.maps.InfoWindow({
        // size: new google.maps.Size(150, 100)
        content: contentString
      });
      marker.addListener('click', function() {
        if (this.infoWindow != null) {
          infoWindow.close();
        } 
        // infoWindow.setContent(`${coord.name} \n ${coord.address}`);
        this.infoWindow = infoWindow;
        infoWindow.open(this.map, marker);
      })

      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
    });
  }
};
</script>
<style scoped>
.google-map {
  width: 1000px;
  height: 700px;
  margin: 0 auto;
  background: gray;
}
</style>
