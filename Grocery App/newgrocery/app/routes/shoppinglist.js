import Ember from 'ember';

var ShopRoute = Ember.Route.extend({
	
	self:this,

    model: function() {
		//alert("model");
        var self=this;
		self.controllerFor('cart').set('isSearchAvailable',false);
		self.store.find('shoplist')
		.then(function(shoplist)
		{
			shoplist.content.forEach(function(rec){
				Ember.run.once(self, function() {
				           rec.deleteRecord();
				           rec.save();
				        });
				
			}, self);
		});
		
		var zip_code=self.controllerFor("index").get('zip_code');

        var product_code=self.controllerFor("index").get('selectedproduct.value');

        var store_name = self.controllerFor("index").get('selectedstore.value');

        var params={product_name : product_code, zip_code : zip_code, store_name: store_name};
        return Ember.$.ajax({
            url: 'php_dataconnectivity_new.php',
            method: 'GET',
            dataType: 'json',
            data: params ? params : null
        }).then(function(result){
			var lowestFound;
			var lowestIndex=null;
			var shops;
			var outofstock=false;
 		   self.set('shopList',result);
            for(var i=0; i<result.length; i++) {
				lowestFound=self.get('lowestAvailPriceFound');
				if(lowestFound!==true)
				{
					if(result[i].availability==="In Stock"){
						self.set('lowestAvailPriceFound',true);	
						lowestIndex=i;			
					}
				}
				if(result[i].availability==="Out Of Stock"){
					outofstock = true;
			
				}
				else{
					outofstock = false;
				}
				if (i===lowestIndex)
				{
					shops= self.store.createRecord('shoplist',{
					id:i,
					store_name: result[i].store_name,
					availability: result[i].availability,
					price: result[i].price,
					product_name:result[i].product_name,
					zip_code: result[i].zip_code,
					lowestPrice:true,
					isOutofstock:outofstock,
					searchId:result[i].search_id,
					store_location:result[i].store_location,
                    store_distance:"0",
                    store_duration:0						
					});
				}
				else{					
					shops= self.store.createRecord('shoplist',{
					id:i,
					store_name: result[i].store_name,
					availability: result[i].availability,
					price: result[i].price,
					product_name:result[i].product_name,
					zip_code: result[i].zip_code,
					lowestPrice:false,
					isOutofstock:outofstock,
					searchId:result[i].search_id,
					store_location:result[i].store_location,
                    store_distance:"0",
                    store_duration:0						
					});
			
				}
				shops.save();

            }
					self.set('lowestAvailPriceFound',false);
					self.controllerFor('cart').set('isSearchAvailable',true);	
			        return self.store.find('shoplist');
        	
        },self.fail);


    },
	
	fail:function(){
		alert("Sorry this search is not available right now! Please try another zipcode/product/store.");

	},
	
    afterModel:function()
    {

       // alert("in after");
		var self=this;
        var store_data=self.store.find('shoplist').then(function(result) {
            var array = result.content;
		//	alert(array);
            array.forEach(function (item) {
                var store_location = item.get('store_location');
                self.calculate_distance(store_location,item);

            }, array);
        });
    },
    calculate_distance:function(destination,item)
    {

        var self=this;
        var origin=[];
        origin.push(new google.maps.LatLng(self.controllerFor('index').get('latitude'),self.controllerFor('index').get('longitude')));
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': destination}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var destination=[];
                destination.push(results[0].geometry.location);
                var service = new google.maps.DistanceMatrixService();
                service.getDistanceMatrix(
                    {
                        origins:origin ,
                        destinations:destination ,
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.IMPERIAL,
                        durationInTraffic: true,
                        avoidHighways: false,
                        avoidTolls: false
                    },function distance_callback(response, status){
                        var distance;
                        if (status === google.maps.DistanceMatrixStatus.OK) {
                            var origins = response.originAddresses;
                            for (var i = 0; i < origins.length; i++) {
                                var results = response.rows[i].elements;
                                for (var j = 0; j < results.length; j++) {
                                    var element = results[j];
                                    distance = parseInt(element.distance.value/1560);
                                    var duration = parseInt(element.duration.value/60);
                                    item.set('store_distance',distance);
                                    item.set('store_duration',duration);
                                    item.save();

                                }
                            }
                        }
                    });

                    

            }
        });
    }

});


export default ShopRoute;




