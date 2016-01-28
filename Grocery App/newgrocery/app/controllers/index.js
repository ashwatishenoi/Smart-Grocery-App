import Ember from 'ember';

var IndexController = Ember.ArrayController.extend({
    isLogin:null,
    userName:null,
    product:null,
    store:null,
    latitude:null,
    longitude:null,
    productOptions: [

        {
            label: 'Milk',
            value: 'Milk'
        },
        {
            label: 'Bread',
            value: 'Bread'
        },
        {
            label: 'Tomatoes',
            value: 'Tomatoes'
        },
        {
            label: 'Potatoes',
            value: 'Potatoes'
        },
        {
            label: 'Chicken',
            value: 'Chicken'
        },
        {
            label: 'Pork',
            value: 'Pork'
        },
        {
            label: 'Cereal',
            value: 'Cereal'
        },
        {
            label: 'Broccoli',
            value: 'Broccoli'
        },
        {
            label: 'Apples',
            value: 'Apples'
        },
        {
            label: 'Vegetable Oil',
            value: 'Vegetable Oil'
        },
        {
            label: 'Onions',
            value: 'Onions'
        },
         {
            label: 'Garlic',
            value: 'Garlic'
        },
        {
            label: 'Kidney Beans',
            value: 'Kidney Beans'
        },
        {
            label: 'Ketchup',
            value: 'Ketchup'
        }

    ],

    storeOptions:[
        {
            label: 'All',
            value: 'all'
        },
        {
            label: 'Lucky',
            value: 'Lucky'
        },
        {
            label: 'Safeway',
            value: 'Safeway'
        },
        {
            label: 'Target',
            value: 'Target'
        },
        {
            label: 'Walmart',
            value: 'Walmart'
        },
        {
            label: 'Costco',
            value: 'Costco'
        },
        {
            label: 'Save Mart',
            value: 'Save Mart'
        }

    ],
    selectedstore : '',
    selectedproduct: '',
    str_name :'',
    prd_name :'',
    zip_code:'',
	isZipInvalid:false,
	isProdInvalid:false,
	isStoreInvalid:false,
	
    geoLocation:function(location){

       this.set('latitude', location.coords.latitude);
       this.set('longitude',location.coords.longitude);
      },
			
    actions:{

        findSavedSearches:function()
        {
            this.transitionTo('savedsearches');
        },
        savecurrentSearch: function () {
            
            var prd = this.get('product');
            var store = this.get('store');
            var zip = this.get('zip_code');
            var user_name=this.get('userName');
            var password=this.controllerFor('account').get('password');
            var self = this;
            var params = {user_name:user_name,password:password,prd_name: prd, store: store, zip: zip, operation: "save"};
            Ember.$.ajax({
                url: 'php_dataconnectivity_new.php',
                method: 'POST',
                dataType: 'json',
                data: params ? params : null
            }).then(function (result) {
                
                if (result) {
                    alert("Your search is saved successfully!!");
                }
            });
        },
		
        signOut:function(){
            
			var self=this;
			
           // self.set('isLogin',false);
           // self.controllerFor('application').set('isLogin',false);
			//self.controllerFor('shoppinglist').set('login',false);
			self.store.find('cartlist').then(function(cartlist)
			{

				cartlist.content.forEach(function(rec){
					Ember.run.once(self, function() {
					           rec.destroyRecord();
					           rec.save();
					        });
				
				}, self);
				self.controllerFor('application').set('cartCounter',0);
			
			});
        },
		
		search:function(){
			
			this.resetFlags();
			var zipcode=this.get('zip_code');
			//var b= zipcode.length;
			var isZipValid=this.isValidZip(zipcode);
			var prod=this.get('product');
			var store=this.get('store');
			var isInvalidSearch=false;
			
			if(isZipValid!==true)
			{
				this.set('isZipInvalid',true);
				isInvalidSearch=true;
			}
			if(prod===null )
			{
				this.set('isProdInvalid',true);
				isInvalidSearch=true;
			}
			if((store===null)||(store===undefined))
			{
				this.set('isStoreInvalid',true);
				isInvalidSearch=true;
			}
			
			if(isInvalidSearch===false)
			{
				this.transitionTo('shoppinglist');
			}
			
			
		},
    },
	
	 isValidZip:function(n) {

	  return !isNaN(parseFloat(n)) && isFinite(n) && (n.length===5);
	},
	
	resetFlags:function(){
		this.set('isZipInvalid',false);
		this.set('isProdInvalid',false);
		this.set('isStoreInvalid',false);
		
	}


});

export default IndexController;