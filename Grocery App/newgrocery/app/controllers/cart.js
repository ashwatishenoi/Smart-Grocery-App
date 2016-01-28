/*Controller Handling all the Cart operations like Add to Cart, Remove specific data from Cart, Remove everything
from cart etc. 
It's also checking for any duplicate entry creation.*/

import Ember from 'ember';

var CartController = Ember.ArrayController.extend({
	
  selectedItems: Ember.computed.filterBy('', 'isSelected', true),
  selectedCount: Ember.computed.alias('selectedItems.length'),
  isSearchAvailable:false,
		
	actions:{
			removeAllItems:function()
			{
				
				var self=this;
				self.store.find('cartlist')
				.then(function(cartlist)
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
			removeSelectedItems:function()
			{
				var self=this;
				var ids;
				var cartcount=self.controllerFor('application').get('cartCounter');
	 		   self.get('selectedItems').forEach(function(item) {
				   ids=Ember.get(item, "id");
				   cartcount--;
				   self.store.find('cartlist',ids).then(function(cartlist)
			   {
				   cartlist.destroyRecord();
				   cartlist.save();
			   });
			   });
			   self.controllerFor('application').set('cartCounter',cartcount);	

			},
			
			savePDF:function(){
				//
				var doc = new jsPDF();     
				var elementHandler = {
				  '#ignorePDF': function (element, renderer) {
				    return true;
				  }
				};     
				var source = Ember.$('.main').get(0);
				doc.fromHTML( source,
				    5,
				    5,
				    {
						'width': 1000,'elementHandlers': elementHandler
				    });
					doc.save('Shopping_List.pdf');
				doc.output("dataurlnewwindow");
			}
		},
		


});
export default CartController;