define([
  "backbone",
  "css!app/stylesheets/pong.css"
], function(Backbone) {
  var GameView = Backbone.View.extend({
    initialize: function (options) {
      // In Backbone 1.1.0, if you want to access passed options in
      // your view, you will need to save them as follows:
      this.options = options || {};
      this.render();
    },

    // Re-render the title of the todo item.
    render: function() {
      this.$el.html('<canvas id="pongCanvas" width="800" height="600"></canvas>');
      return this;
    },
  });

  return GameView;

});
