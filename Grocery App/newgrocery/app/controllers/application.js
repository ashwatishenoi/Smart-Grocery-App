
import Ember from 'ember';


var ApplictionController=Ember.Controller.extend({
isShowMenu: false,
isLogin:false,
cartCounter:0,
actions: {
    toggleMenu: function() {
		this.set('isShowMenu',!this.get('isShowMenu'));
		if(this.get('isShowMenu')===true)
		{
            Ember.$('.main').addClass('pushright');
		}
		else{
            Ember.$('.main').removeClass('pushright');
			
		}

    },
    logout:function()
    {
        var self=this;
		//debugger;
		self.set('isLogin',false);
        self.controllerFor('index').set('isLogin',false);
		self.controllerFor('shoppinglist').set('login',false);
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
			Ember.$('.main').removeClass('pushright');	
			self.transitionTo("index");
			
		});
		
		
    },
	goHome:function(){
		Ember.$('.main').removeClass('pushright');	
		this.transitionTo("index");
	}
	

}
});

export default ApplictionController;