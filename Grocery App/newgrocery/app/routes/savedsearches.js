import Ember from 'ember';
import searchModel from 'newgrocery/models/search';
var ShopRoute = Ember.Route.extend({

    model: function() {

        var user_name=this.controllerFor("index").get('userName');
        var params={user_name : user_name, operation:"search"};
        return Ember.$.ajax({
            url: 'php_dataconnectivity_new.php',
            method: 'GET',
            dataType: 'json',
            data: params ? params : null
        }).then(function(result) {
            var searches = [];
			if(result.length>5)
			{
				var i =result.length-1;
				var count=0;
				for(count=0;count<5;count++)
				{
					if(result[i].product_name!==null)
					{
	                	searches.push(searchModel.create(result[i]));
						i--;
					}
				}
			}
			else
			{
	            for(var i=0; i<result.length; i++) 
				{
					if(result[i].product_name)
					{
	                	searches.push(searchModel.create(result[i]));
					}
	            }
			}
     return searches;

        });
    },

});


export default ShopRoute;




