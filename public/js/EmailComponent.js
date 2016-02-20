processText = function () {
	var emailInput = document.getElementById('emailInput');
	if (event.keyCode === 32 || event.keyCode === 13) {
		valiadteAndCreateTag(emailInput.textContent);
	} else if (emailInput.textContent=== '' &&(event.keyCode === 8 && emailInput.previousSibling)) {
		highlightOrDeleteLastTag(emailInput.previousSibling);
	}
};

valiadteAndCreateTag = function (text) {
	var emailAddresses = text.split(",");
	emailAddresses.forEach( function(emailAddr) {
		if (valiadte(emailAddr)) {
			createTag(emailAddr);
		} else {
			showErrorPrompt(emailAddr);
		}
	});
};

valiadte = function (emailAddr) {
	var emailRegex = /\S+@\S+\.\S+/;
	return emailRegex.test(emailAddr);
};

createTag = function (emailAddr) {
	var emailBox = document.getElementById("emailBox"),
		emailInput = document.getElementById('emailInput');
		tagDiv = document.createElement("div"),
		deleteButton = document.createElement("div");

	emailInput.textContent = "";
	tagDiv.className = "emailTag";
	deleteButton.className = "deleteButton";
	deleteButton.innerHTML = "x";
	tagDiv.innerHTML = emailAddr;
	tagDiv.appendChild(deleteButton);
	deleteButton.addEventListener("click", function(){
		emailBox.removeChild(tagDiv);
	});

	emailBox.insertBefore(tagDiv, emailInput);
};

showErrorPrompt = function (emailAddr) {
	alert(emailAddr + "is not a valid email address.");
};

highlightOrDeleteLastTag = function (tag) {
	if (tag) {
		if (tag.classList.contains('highlight')) {
			document.getElementById("emailBox").removeChild(tag);
		} else {
			tag.classList.add('highlight');
		}
	}
};