define([
  "backbone",
  "css!app/stylesheets/main.css"
], function(Backbone) {
  var HomeView = Backbone.View.extend({
    initialize: function (options) {
      // In Backbone 1.1.0, if you want to access passed options in
      // your view, you will need to save them as follows:
      this.options = options || {};
      this.render();
    },

    // Re-render the title of the todo item.
    render: function() {
      this.$el.html('Home page view');
      return this;
    }
  });

  return HomeView;

});
