/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'newgrocery',
    environment: environment,
    baseURL: '',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
	contentSecurityPolicy : {
	  'default-src': "'none'",
	  // Allow scripts
	  'script-src': "'self' 'unsafe-eval'  https://maps.gstatic.com/maps-api-v3/api/js/20/2/ http://*.googleapis.com http://maps.gstatic.com https://maps.googleapis.com https://maps.gstatic.com https://maps.gstatic.com/maps-api-v3/api/js/20/2/main.js https://maps.gstatic.com/maps-api-v3/api/js/20/2/common.js https://maps.gstatic.com/maps-api-v3/api/js/20/2/map.js https://maps.gstatic.com/maps-api-v3/api/js/20/2/util.js https://maps.gstatic.com/maps-api-v3/api/js/20/2/controls.js https://maps.googleapis.com/maps/api/js https://maps.googleapis.com/maps/api/js/ViewportInfoService https://maps.googleapis.com/maps/api/js/QuotaService https://mts0.googleapis.com/vt https://mts1.googleapis.com/vt http://maps.google.com/maps/api/js",
	  'font-src': "'self' http://fonts.gstatic.com https://fonts.googleapis.com/css https://fonts.gstatic.com/s/roboto/v15/ ", // Allow fonts
	  'connect-src': "'self' http://maps.gstatic.com", // Allow data (ajax/websocket)
	  'img-src': "'self' http://*.googleapis.com http://maps.gstatic.com https://maps.gstatic.com/mapfiles/openhand_8_8.cur https://maps.gstatic.com/mapfiles/ https://mts1.google.com/ https://mts0.google.com/ https://maps.googleapis.com/maps/gen_204 https://khms1.google.com/kh https://khms0.google.com/kh https://maps.googleapis.com/maps/api/js/AuthenticationService https://csi.gstatic.com/csi http://csi.gstatic.com/csi https://maps.googleapis.com/maps/api/js/StaticMapService.GetMapImage https://*.googleapis.com/vt https://mts1.googleapis.com/vt https://mts0.googleapis.com/vt",
	  // Allow inline styles and loaded CSS
	  'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com http://maps.gstatic.com https://fonts.googleapis.com/css",
	  'report-uri': "http://localhost:4200",
	  'frame-src':"https://www.google.com/maps/api/js/master https://www.google.com/maps/api/js/widget"
	},

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
