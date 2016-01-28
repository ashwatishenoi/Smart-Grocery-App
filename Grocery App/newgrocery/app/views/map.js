
import Ember from 'ember';

export default Ember.View.extend({
    id: 'map-canvas',
    tagName: 'div',
    attributeBindings: ['style'],
    style:"margin-left:5px;margin-right:5px;width:500px;height:800px; position:relative;margin-top:50px; float:left;",
    currLat:null,
    currLng:null,
    destination:null,
    map_db:null,

    didInsertElement: function() {


        var geocoder = new google.maps.Geocoder();
        var self=this;
        var latitude=this.get('currLat');
        var longitude=this.get('currLng');
        var address = this.get('destination');
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {

                var directionsDisplay = new google.maps.DirectionsRenderer();
                var directionsService = new google.maps.DirectionsService();
                var mapOptions = {
                    zoom: 18,
                    center:  new google.maps.LatLng(self.get('currLat'),self.get('currLng'))
                };

               var map = new google.maps.Map(self.$().get(0), mapOptions);
                directionsDisplay.setMap(map);
                var request = {
                    origin: new google.maps.LatLng(self.get('currLat'),self.get('currLng')),
                    destination: results[0].geometry.location,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                directionsService.route(request, function(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    }
                });
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }

        });


    }
});
