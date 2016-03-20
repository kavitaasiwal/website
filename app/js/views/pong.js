var GameObject = function(){};
GameObject.prototype = {
	constructor: GameObject,

	getPosition: function () {
		return {x: this.x, y: this.y};
	},

	setAttrs: function (params) {
		this.x = params.x;
		this.y = params.y;
		this.color = params.color;
		this.type = params.type;
		this.subtype = params.subtype;
	},

	getType: function () {
		return this.type;
	}
};

var Game = function() {};

Game.prototype = {
	constructor: Game,
	canvas: document.getElementById("pongCanvas"),
	ctx: document.getElementById("pongCanvas").getContext("2d"),

	drawBar: function (params) {
		this.ctx.beginPath();
		this.ctx.rect(params.x, params.y, params.width, params.height);
		this.ctx.fillStyle = params.color;
		this.ctx.fill();
		this.ctx.closePath();
	},

	drawBall: function (params) {
		this.ctx.beginPath();
		this.ctx.arc(params.x, params.y, params.radius, params.startAngle, params.endAngle);
		this.ctx.fillStyle = params.color;
		this.ctx.fill();
		this.ctx.closePath();
	},


	createBallObject: function (params) {
		var ballObject = function (){};
		ballObject = Object.create(GameObject.prototype);
		ballObject.constructor = ballObject;
		ballObject.setCircleAttrs = function (params) {
			this.radius = params.radius;
			this.startAngle = params.startAngle;
			this.endAngle = params.endAngle;
		};

		ballObject.getRadius = function () {
			return this.radius;
		};

		ballObject.setAttrs(params);
		ballObject.setCircleAttrs({radius: params.radius, startAngle: params.startAngle, endAngle: params.endAngle});
		return ballObject;
	},

	createBarObject: function (params) {
		var barObject = function(){};
		barObject = Object.create(GameObject.prototype);
		barObject.setBarAttrs = function (params) {
			this.width = params.width;
			this.height = params.height;
		};
		barObject.setAttrs(params);
		barObject.setBarAttrs({width: params.width, height: params.height});
		return barObject;
	},

	createObjects: function (objectParams) {
		this.objects = [];
		objectParams.forEach(function (objectParam) {
			if (objectParam.type === "ball") {
				this.objects.push(this.createBallObject(objectParam));
			} else if (objectParam.type === "bar") {
				this.objects.push(this.createBarObject(objectParam));
			}
		}.bind(this));
	},

	drawGame: function () {
		this.objects.forEach(function(object) {
			if (object.type === "ball") {
				this.drawBall(object);
			} else if (object.type === "bar") {
				this.drawBar(object);
			}
		}.bind(this));
	},

	startGame: function () {
		var dx = 4, dy = -4, barDx = 10, ballx, bally, ballradius;
		this.setEventHandlers();
		setInterval(function () {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.drawGame();
			this.objects.forEach(function(object) {
				if (object.type === "ball") {
					object.x += dx;
					object.y += dy;
					if(object.x + dx > this.canvas.width-object.radius || object.x + dx < object.radius) {
						dx = -dx;
					}

					if (dy < 0 && object.y < object.radius) {
						dy = -dy;
					} else if(object.y + dy + object.radius > this.canvas.height) {
						dy = -dy;
					}

					ballx = object.x;
					bally = object.y;
					ballradius = object.radius;
				} else if (object.type === "bar") {
					if (object.subtype === "bar1" && this.bar1rightPressed && object.x + barDx < this.canvas.width - object.width) {
						object.x += barDx;
					} else if (object.subtype === "bar1" && this.bar1leftPressed && object.x - barDx > 0) {
						object.x -= barDx;
					} else if (object.subtype === "bar2" && this.bar2rightPressed && object.x + barDx < this.canvas.width - object.width) {
						object.x += barDx;
					} else if (object.subtype === "bar2" && this.bar2leftPressed && object.x - barDx > 0) {
						object.x -= barDx;
					}

					if (dy > 0) {
						if(ballx > object.x && ballx < object.x + object.width && bally + ballradius > object.y && bally < object.y + object.height) {
							dy = -dy;
						}
					} else {
						if(ballx > object.x && ballx < object.x + object.width && bally - ballradius > object.y && bally - ballradius < object.y + object.height) {
							dy = -dy;
						}
					}
					
				}
			}.bind(this));
			
			
		}.bind(this), 25);
	},

	setEventHandlers: function () {
		document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
		document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
	},

	keyDownHandler: function (e) {

		if(e.keyCode == 88) {
			this.bar1rightPressed = true;
		} else if(e.keyCode == 90) {
			this.bar1leftPressed = true;
		} else if(e.keyCode == 77) {
			this.bar2rightPressed = true;
		} else if(e.keyCode == 78) {
			this.bar2leftPressed = true;
		}
	},

	keyUpHandler: function (e) {
		if(e.keyCode == 88) {
			this.bar1rightPressed = false;
		} else if(e.keyCode == 90) {
			this.bar1leftPressed = false;
		} else if(e.keyCode == 77) {
			this.bar2rightPressed = false;
		} else if(e.keyCode == 78) {
			this.bar2leftPressed = false;
		}
	}
};

var game = function(){};
game = Object.create(Game.prototype);
var objectParams = [ {x: 20, y: 20, width: 80, height: 20, color: "#FF0000", type: "bar", subtype: "bar1"},
	{x: 20, y: 560, width: 80, height: 20, color: "green", type: "bar", subtype: "bar2"},
	{x: 400, y: 300, radius: 15, startAngle: 0, endAngle: Math.PI*2, color: "#FFFFFF", type: "ball"}
];
game.createObjects(objectParams);
game.drawGame();
game.startGame();
