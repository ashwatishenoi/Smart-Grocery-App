
import Ember from 'ember';


var SuccessRegController=Ember.Controller.extend({

    isSuccess:true,
    init:function()
    {
        
        this._super();
        this.set('isSuccess', this.controllerFor('register').get('Sucess'));
    }


});

export default SuccessRegController;