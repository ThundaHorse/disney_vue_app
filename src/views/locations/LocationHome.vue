<template>
  <div class="home">
    <div class="container">
      <div id="map" style='border-radius: 5%'></div>
    </div>
  </div>
</template>

<style>
  #map {
    height: 700px;
    width: 1000px;
  }
</style>

<script>
export default {
  data: function() {
    return {
      map: null,
      markers: [],
      parks: [{
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
      infoWindow: null,
      bounds: null
    };
  },
  created: function() {},
  methods: {
    
  },
  mounted: function() {
    this.bounds = new google.maps.LatLngBounds();

    var element = document.getElementById('map')
    var center = { lat: 28.3838229, lng: -81.5886027 }
    
    var centered = new google.maps.LatLng(center.lat, center.lng)
    this.map = new google.maps.Map(element, {zoom: 13, center: centered});


    var infoWindow = new google.maps.InfoWindow();

    this.parks.forEach((park) => {
      var position = new google.maps.LatLng(park.latitude, park.longitude);
      
      var marker = new google.maps.Marker({
        position, 
        map: this.map,
        name: park.name,
        address: park.address
      });


    (function (map, marker) {
      google.maps.event.addListener(marker, "click", function (e) {

      var contentString = '<div id="content">'+
                            '<div id="container">'+
                              `<h2 id="firstHeading" class="firstHeading" style='text-align:center;'>${marker.name}</h2>`+
                            '<div id="bodyContent">'+
                              `<p>${marker.address}</p>` +
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