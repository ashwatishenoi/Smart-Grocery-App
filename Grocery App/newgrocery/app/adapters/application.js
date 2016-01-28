import DS from'ember-data';

 
/*Local Storage Adapter to save user data locally*/
export default DS.LSAdapter.extend({

  namespace: 'newgrocery'

});