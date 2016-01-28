import DS from'ember-data';

var CartlistModel = DS.Model.extend({
    store_name: DS.attr('string'),
    availability: DS.attr('string'),
    price: DS.attr('string'),
    product_name:DS.attr('string'),

});

export default CartlistModel;