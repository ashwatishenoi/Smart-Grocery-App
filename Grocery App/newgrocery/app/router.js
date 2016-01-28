import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('menu');
    this.route('cart');
    this.route('shoppinglist');
    this.route('help');
    this.route('account');
    this.route('support');
    this.route('register');
    this.route('resetdetails');
    this.route('/');
    this.route('map');
    this.route('sucessreg');
    this.route('savedsearches');
    this.route('directionmap');
});

export default Router;
