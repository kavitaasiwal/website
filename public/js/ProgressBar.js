var ProgressBar = function (process) {
	var progressBarWrapper = document.createElement("div");
	progressBarWrapper.className = "progressBarWrapper";

	var progressBar = document.createElement("div");
	progressBar.className = "progressBar";
	progressBar.id = "progressBar";

	var titleDiv = document.createElement("div");
	titleDiv.className = "title";
	titleDiv.innerHTML = process.title;

	var percentageIndicator = document.createElement("div");
	percentageIndicator.className = "percentageIndicator";

	progressBarWrapper.appendChild(titleDiv);
	progressBarWrapper.appendChild(percentageIndicator);
	progressBarWrapper.appendChild(progressBar);

	this.domNode = progressBarWrapper;
	this.steps = process.steps;

};

ProgressBar.prototype = {
	constructor: ProgressBar,

	appendTo: function (containerNode) {
		containerNode.appendChild(this.domNode);
	},

	startProgress: function () {
		var progress = 0;
		if (this.steps) {
			var progressHandler = setInterval(function() {
				if (progress <= 100) {
					this.updateProgress(progress);
					progress++;
				}else {
					clearInterval(progressHandler);
				}
			}.bind(this), 100);
		}
		// this.updateProgress(1);
	},

	updateProgress: function (progress) {
		this.domNode.getElementsByClassName("progressBar")[0].style.width = progress + "%";
		this.domNode.getElementsByClassName("percentageIndicator")[0].innerHTML = progress + "%";
	},

	completeProgress: function () {
		this.updateProgress(100);
	}
};

var sampleProgressBar = new ProgressBar({title: "loading...", steps: 100});
sampleProgressBar.appendTo(document.getElementById("progressBarContainer"));
sampleProgressBar.startProgress();
// progress = 0;
// setInterval(function(){
// 	if (progress <= 100) {
// 		sampleProgressBar.updateProgress(progress);
// 		progress += 1;
// 	}else if (progress === 100) {
// 		clearInterval(sampleProgressBar.updateProgress);
// 	}
// }, 10);