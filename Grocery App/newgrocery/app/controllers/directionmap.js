
import Ember from 'ember';


var DirectionMapController=Ember.Controller.extend({
   currLocLat:null,
   currLocLng:null,
   destinationAddress:null,

   init:function()
    {
        debugger;
        this._super();
        var indexcontroller=this.controllerFor('index');
        this.set('currLocLat', indexcontroller.get('latitude'));
        this.set('currLocLng', indexcontroller.get('longitude'));
        var shopcontroller=this.controllerFor('shoppinglist');
        this.set('destinationAddress', shopcontroller.get('destinationAddress'));
    }


});

export default DirectionMapController;