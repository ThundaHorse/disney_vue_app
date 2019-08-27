<template> 
  <div class="google-map" :id="mapName"></div>
</template>
<script>
export default {
  name: 'google-map',
  props: {
    rideName: String, 
    latitude: String,
    longitude: String,
    wait: String
  },
  data: function () {
    return {
      mapName: this.name + "-map",
      attractionCoord: [{
        latitude: this.latitude,
        longitude: this.longitude, 
        rideName: this.rideName,
        wait: this.wait
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

    const mapCentre = { lat: this.attractionCoord[0].latitude, lng: this.attractionCoord[0].longitude, rideName: this.attractionCoord[0].rideName, wait: this.attractionCoord[0].wait }

    const middle = new google.maps.LatLng(mapCentre.lat, mapCentre.lng)    

    
    this.map = new google.maps.Map(element, {zoom:10, center: middle});

    this.attractionCoord.forEach((coord) => { 

      const position = new google.maps.LatLng(coord.latitude, coord.longitude);

      const marker = new google.maps.Marker({ 
        position,
        map: this.map
      });

    console.log(coord.wait);
    console.log(coord.rideName);
    
    var contentString = '<div id="content">'+
                          '<div id="container">'+
                            `<h2 id="firstHeading" class="firstHeading" style='text-align:center;'>${coord.rideName}</h2>`+
                          '<div id="bodyContent">'+
                            `<p>Estimated Wait: ${coord.wait}</p>` +
                          '</div>'+
                        '</div>'+
                      '</div>';
      // var infoWindow = new google.maps.InfoWindow;
      var infoWindow = new google.maps.InfoWindow({
        size: new google.maps.Size(150, 100),
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
