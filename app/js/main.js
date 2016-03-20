require.config({
  paths: {
    "jquery": "lib/jquery/dist/jquery",
    "backbone": "lib/backbone-amd/backbone",
    "underscore": "lib/underscore-amd/underscore"
  },

  map: {
  '*': {
      'css': 'lib/require-css/css',
      'app': "../../"
    }
  }
});

require(["views/app"], function(AppView) {
  new AppView;
});
