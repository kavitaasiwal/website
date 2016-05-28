require.config({
  paths: {
    "jquery": "lib/jquery/dist/jquery",
    "backbone": "lib/backbone-amd/backbone",
    "underscore": "lib/underscore-amd/underscore"
  },

  map: {
  '*': {
      'css': 'lib/require-css/css',
      'text': 'lib/text/text',
      'app': "../../"
    }
  }
});

require(["views/app"], function(AppView) {
  new AppView;
});
