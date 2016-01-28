import Ember from 'ember';

var searchModel = Ember.Object.extend({
    store_name: '',
    username: '',
    password: '',
    product_name:'',
    zipcode:''
});

export default searchModel;
