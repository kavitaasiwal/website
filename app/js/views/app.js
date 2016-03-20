define([
  "backbone",
  "css!app/stylesheets/main.css"
], function(Backbone) {
  var AppRouter = Backbone.Router.extend({
      routes: {
          "home": "showHomeView",
          "projects": "showProjectsView"
      }
  });
  // Initiate the router
  var appRouter = new AppRouter();

  // Start Backbone history a necessary step for bookmarkable URL's
  Backbone.history.start();



  var BaseView = Backbone.View.extend({
    events: {
      'click button': 'navigate'
    },


    initialize: function (options) {
      // In Backbone 1.1.0, if you want to access passed options in
      // your view, you will need to save them as follows:
      this.options = options || {};
      this.initializeRoutes();
      this.render();
    },

    initializeRoutes: function () {
      appRouter.on('route:showHomeView', function(actions) {
          require(['views/homeView'], function(HomeView) {
              new HomeView({el: this.$("#content")});
          }.bind(this));
      }.bind(this));

      appRouter.on('route:showProjectsView', function(actions) {
        require(['views/projectsView'], function(ProjectsView) {
            new ProjectsView({el: this.$("#content")});
        }.bind(this));
      }.bind(this));
    },

    // Re-render the title of the todo item.
    render: function() {
      this.$el.html('<nav class="nav">'+
                        '<button class="navItem" data-navigate-to="#home">Home1</button>'+
                        '<button class="navItem" data-navigate-to="#projects">Projects</button>'+
                      '</nav>'    +
                      '<main class="content" id="content">Base View</main>'   +
                      '<footer class="footer">Footer</footer>');
      return this;
    },

    navigate: function (e) {
      appRouter.navigate(e.target.dataset.navigateTo, {trigger: true});
    }
  });

  new BaseView({el: $('#_rootNode')});
  return BaseView;
});
