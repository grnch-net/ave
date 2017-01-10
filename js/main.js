var init;

var scene;
var gameAnimate;

(function () {
	"use strict";

	init = function () {
		grnch.keyboard.init();

	    scene = new ave.Scene({
			width: 560,
			height: 700
		});

		gameAnimate = scene.animator.createGroup();


	};


})();
