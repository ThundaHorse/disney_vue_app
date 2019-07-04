<template>
  <div class="google-maps" :id="mapName"></div>
</template>
<script>
export default {
  name: 'google-maps',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [{
        name: "Magic Kingdom",
        latitude: 28.4177,
        longitude: -81.5812
      }, {
        name: "Animal Kingdom",
        latitude: 28.3597,
        longitude: -81.5913
      }, {
        name: "Hollywood Studios",
        latitude: 28.3575,
        longitude: -81.5583
      }, {
        name: "Epcot",
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
    const mapCentre = this.markerCoordinates[0]
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    }
    this.map = new google.maps.Map(element, options);
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({ 
        position,
        map: this.map
      });
      // var infoWindow = new google.maps.InfoWindow;
      var infoWindow = new google.maps.InfoWindow({
        size: new google.maps.Size(150, 50)
      });
      marker.addListener('click', function() {
        if (this.infoWindow != null) {
          infoWindow.close();
        }
        infoWindow.setContent(`${coord.name}`);
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