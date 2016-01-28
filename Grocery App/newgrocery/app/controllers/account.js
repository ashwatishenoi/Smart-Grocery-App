
/*Controller to handle operations like Login.
Checking User's credentials against My SQL Database.*/

import Ember from 'ember';


var registerController=Ember.Controller.extend({
   user_id:null,
   password:null,
   isLogin:false,
	isLoginInvalid:false,
   actions:{
       Login:function(){
          var user_name=this.get('user_id');
           var password=this.get('password');
           var self=this;
           var params={user_name : user_name, password : password, operation: "login" };
           Ember.$.ajax({
               url: 'php_dataconnectivity_new.php',
               method: 'GET',
               dataType: 'json',
               data: params ? params : null
           }).then(function(result) {
			   self.set('isLoginInvalid',false);
               if(result.users===null) {
				   self.set('isLoginInvalid',true);
			   }
			   else{
			   	
			   
                   self.set('isLogin', true);
                   var index=self.controllerFor('index');
                   index.set('isLogin',true);
                   index.set('userName',user_name);
                   self.controllerFor('application').set('isLogin',true);
				           self.controllerFor('shoppinglist').set('login',true);
                   self.transitionTo('index');
               }
           });
       }
   }

});

export default registerController;