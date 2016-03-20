// log reference to a DOM element that corresponds to the view instance
var AppRouter = Backbone.Router.extend({
    routes: {
        "home": "showHomeView",
        "game": "showGameView"
        // matches http://example.com/#anything-here
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
        new HomepageView({el: this.$("#content")});
    }.bind(this));

    appRouter.on('route:showGameView', function(actions) {
        new GameView({el: this.$("#content")});
    }.bind(this));
  },

  // Re-render the title of the todo item.
  render: function() {
    this.$el.html('<nav class="nav">'+
                      '<button class="navItem" data-navigate-to="#home">home</button>'+
                      '<button class="navItem" data-navigate-to="#game">Game</button>'+
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

var HomepageView = Backbone.View.extend({
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

// var homepageView = new HomepageView({el: $('#_rootNode')});
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
  }
});