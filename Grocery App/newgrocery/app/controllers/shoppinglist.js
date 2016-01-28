/**
 * Created by anurag_vz on 3/7/2015.
 */
import Ember from 'ember';

var ShoppingListController = Ember.ArrayController.extend({

	lowestAvailPriceFound:false,
    destinationAddress:null,
	login:false,
	isDistance:true,
    sortOptions: [
      {
        label: 'Price:Low to High',
        value: 'lowToHigh'
      },
      {
        label: 'Price:High to Low',
        value: 'highToLow'
      },
      {
        label: 'Shortest Distance',
        value: 'shortestDist'
      },
      {
        label: 'Availability',
        value: 'availability'
      },
  	 {
        label: 'By Time',
        value: 'Bytime'
      }
    ],
  // Selected sort by option.
  selectedSortOption: null,
	
  sortProperties: ['price'],
  sortAscending: true,
  sortedList: Ember.computed.sort('content', 'sortProperties'),

  selectedItems: Ember.computed.filterBy('', 'isSelected', true),
  selectedCount: Ember.computed.alias('selectedItems.length'),
  
	
    sortOptionsDidChange: function() {
		var sortOption   = this.get('selectedSortOption');
		if(sortOption.value==='lowToHigh')
		{
			this.set('sortProperties',['price']);
			this.set('sortAscending',true);
	    }
		if(sortOption.value==='highToLow')
		{
			this.set('sortProperties',['price']);
			this.set('sortAscending',false);
	    }
		if(sortOption.value==='availability')
		{
			this.set('sortProperties',['availability']);
			this.set('sortAscending',true);
	    }
	    if(sortOption.value==='shortestDist'){
	    	this.set('sortProperties',['store_distance']);
	    	this.set('sortAscending',true);
	    	this.set('isDistance', true);
	    }
	    if(sortOption.value==='Bytime'){
	    	this.set('sortProperties',['store_duration']);
	    	this.set('sortAscending',true);
	    	this.set('isDistance', false);
	    }
    }.observes('selectedSortOption'),
	
  
   
	  

	    actions: {
	       toggle_map: function()
	       {
               this.set('isDistance',!this.get('isDistance'));
	       },	
	       showMap:function(storeLocation)
	        {
	        	 debugger;
                 this.set('destinationAddress',storeLocation);
	             this.transitionToRoute('directionmap');

	        },

	      addToCart: function() {
			  
			  var self=this;
			  var store=[];
			  var price=[];
			  var availability=[];
			  var product=[];
			  var ids=[];
			  var len;
			  var cartcount=self.controllerFor('application').get('cartCounter');
			//  alert(cartcount);

		   self.get('selectedItems').forEach(function(item) {
			   store.pushObject(Ember.get(item, "store_name"));
			   price.pushObject(Ember.get(item, "price"));
			   availability.pushObject(Ember.get(item, "availability"));
			   product.pushObject(Ember.get(item, "product_name"));
			   ids.pushObject(Ember.get(item, "searchId"));
			   //item.set('isSelected',false);
		   		   
   			
		   });
		   
		   

		  len =self.get('selectedCount');
		for(var i=0; i<len;i++)
		{
			

		var cartItems=self.store.createRecord('cartlist',{
			id:ids[i],
			store_name: store[i],
			availability: availability[i],
			price: price[i],
			product_name:product[i].capitalize()
		});
		cartItems.save().then(function(){


						   cartcount++;	
						   self.controllerFor('application').set('cartCounter',cartcount);
		});
		}
		
		  
			//this.transitionToRoute('cart');
	
	      }
	    }	,
		
		init:function(){
			this._super();
			var login=this.controllerFor('index').get('isLogin');
			this.set('login',login);
			
		}  


});
var CheckboxableItemController = Ember.ObjectController.extend({
  isSelected: false
});

export default ShoppingListController;
