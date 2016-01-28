import DS from'ember-data';

var ShoplistModel = DS.Model.extend({
    store_name: DS.attr('string'),
    availability: DS.attr('string'),
    price: DS.attr('string'),
    product_name:DS.attr('string'),
    zip_code:DS.attr('string'),
	lowestPrice:DS.attr('boolean',{defaultValue:false}),
	isOutofstock:DS.attr('boolean',{defaultValue:false}),
	searchId:DS.attr('string'),
	store_location:DS.attr('string'),
    store_distance:DS.attr('number'),
    store_duration: DS.attr('number')

});

export default ShoplistModel;
