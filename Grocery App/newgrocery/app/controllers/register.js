
import Ember from 'ember';


var registerController=Ember.Controller.extend({
   user_id:null,
   password:null,
   Sucess:false,
	usrNotMatch:false,
	pswdNotMatch:false,	
	isEmailInvalid:false,
	
   actions:{
       AddUser:function(){
		 
		 this.set('usrNotMatch',false);
		 this.set('pswdNotMatch',false);
		 this.set('isEmailInvalid',false);

           var user_name=this.get('user_id');
		   var confirm_username=this.get('confirm_id');
           var password=this.get('password');
		   var confirm_pswd=this.get('confirm_pswd');
		   var isDetailsInvalid=false;
		   
		   if((user_name.indexOf("@")=== -1)||(user_name.indexOf(".")=== -1))
		   {
			   this.set('isEmailInvalid',true);
			   isDetailsInvalid=true;
		   }
		   
		   if((user_name)!==(confirm_username)){
			   this.set('usrNotMatch',true);
			   isDetailsInvalid=true;
		   }
		   if((password)!== (confirm_pswd)){
			   this.set('pswdNotMatch',true);
			   isDetailsInvalid=true;
		   }
		   if(isDetailsInvalid!==true)
		   {
	          
              var self=this;
	           var params={user_name : user_name, operation: "search" };
	           Ember.$.ajax({
	               url: 'php_dataconnectivity_new.php',
	               method: 'GET',
	               dataType: 'json',
	               data: params ? params : null
	           }).then(function(result) {
	           	debugger;
	            if(result.length===0){
	           	alert("This user already exists, please try some other Login Name!");
	           	self.set('user_id','');
	           	self.set('confirm_id','');
	           	self.set('password','');
	           	self.set('confirm_pswd','');
	           }
	           else
	           {

	           	   var params={user_name : user_name, password : password, operation: "insert" };
	           		Ember.$.ajax({
	               url: 'php_dataconnectivity_new.php',
	               method: 'POST',
	               dataType: 'json',
	               data: params ? params : null
	           		}).then(function(result) {
	              
	               if(result) {
	                   self.set('Sucess', true);
	                   self.transitionTo('sucessreg');
	               }
	          		 });
	           }

				});
	          
	  		}
       }
   }
});

export default registerController;