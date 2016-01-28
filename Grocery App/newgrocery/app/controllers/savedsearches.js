import Ember from 'ember';

var SavedSearchesController = Ember.ArrayController.extend({
actions: {

    loadSearch: function (prd_name, zip, store) {
        this.controllerFor('index').set('product', prd_name);
        this.controllerFor('index').set('store', store);
        this.controllerFor('index').set('zip_code', zip);
        this.transitionTo('index');
    }

}
});

export default SavedSearchesController;