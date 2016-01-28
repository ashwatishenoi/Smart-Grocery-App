/**
 * Created by anurag_vz on 2/19/2015.
 */
import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
	
	model:function()
	{
	/*var self=this;
	self.store.find('cartlist').then(function(cartlist){
		self.controllerFor('application').set('cartCounter',cartlist.get("length"));
	});*/
	
	},
	

    init:function(){


        this._super();
        if (navigator.geolocation) {

            var self = this;

            return new Ember.RSVP.Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    self.controllerFor('index').geoLocation(position);
                });
            });

        }


    },

});


export default IndexRoute;
