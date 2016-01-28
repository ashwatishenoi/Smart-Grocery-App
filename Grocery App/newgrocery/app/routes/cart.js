import Ember from 'ember';


var cartroute = Ember.Route.extend({

	model:function()
		{

			return this.store.find('cartlist');
		},


	
});
export default cartroute;