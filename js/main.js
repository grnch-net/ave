var init;

var scene;
var creatorAnimate;

var qq = {};

(function () {
	"use strict";

	init = function () {
		grnch.keyboard.init();

	    scene = new ave.Scene({
			width: document.body.clientWidth,
			height: document.body.clientHeight
		});

		creatorAnimate = scene.animator.createGroup();

		qq.creatorText = scene.world.createText({
            scene: scene,
            position: {
                x: 0,
                y: 0
            },
			value: 'Created by grnch',
			fontSize: 20,
			// fontFamily: param.fontFamily,
            fill: 'black',
			textAnchor: 'middle'
        });
		qq.creatorText.position.y = qq.creatorText.element.getBBox().height/3;

		let long = Math.ceil(scene.width / 100);
		let lat = Math.ceil(scene.height / 100);

		qq.creatorBG = scene.world.createGraphicGroup({
            scene: scene,
            position: {
				x: -scene.width/2 + 50 - (long*100 - scene.width)/2,
				y: -scene.height/2 + 50 - (lat*100 - scene.height)/2
            },
            opacity: 1,
            fill: '#232627'
        });


		qq.prefab = qq.creatorBG.createRect({
			scene: scene,
			size: {
				width: 100,
				height: 100
			}
		});
		scene.prefabs.add(qq.prefab);

		qq.cloneCube = [];
		for(let i=0; i<lat; i++) {
			for(let j=0; j<long; j++) {
				let clone = qq.prefab.clone();
				clone.position.set(j*100, i*100);
				clone.anchor.set(50, 50);
				clone.scale.set(0, 0);
				clone.opacity = 0;
				qq.cloneCube.push(clone);
			}
		}

		function shuffle(arr) {
			let b = arr.slice(0);;
			var i = b.length, j, t;
			while( i ) {
				j = Math.floor( ( i-- ) * Math.random() );
				t = b[i];
				b[i] = b[j];
				b[j] = t;
			}
			return b;
		};

		shuffle(qq.cloneCube).forEach((item, ind) => {
			setTimeout(() => {
				creatorAnimate.add({
					time: 500,
					process: function (progress) {
						item.scale.set(progress, progress);
						item.opacity = progress;
					}
				});
			}, ind*20);
		});

		setTimeout(() => {
			let timer = 0;
			let polLong = +(long/2).toFixed();
			for(let j=0; j<polLong; j++) {
				for(let i=lat-1; i>-1; i--) {
					setTimeout(() => {
						creatorAnimate.add({
							time: 1000,
							process: function (progress) {
									let itemLeft = qq.cloneCube[i*long+(polLong-j-1)];
									itemLeft.opacity = 1-progress;
									itemLeft.scale.set(1-progress, 1-progress);

									let itemRight = qq.cloneCube[i*long+j+polLong];
									itemRight.opacity = 1-progress;
									itemRight.scale.set(1-progress, 1-progress);
							}
						});
					}, 20*timer++);
				}
			}
		}, 30*qq.cloneCube.length);

		setTimeout(() => {
			qq.cloneCube.forEach((item, ind) => {
				setTimeout(() => {
					creatorAnimate.add({
						time: 500,
						process: function (progress) {
							item.scale.set(1-progress, 1-progress);
							item.opacity = 1-progress;
						}
					});

					var i = ind;
					creatorAnimate.add({
						time: 500,
						process: function (progress) {
							let itemBack = qq.cloneCube[qq.cloneCube.length-1-i];
							itemBack.scale.set(1-progress, 1-progress);
							itemBack.opacity = 1-progress;
						}
					});
				}, ind*20);
			});
		}, 60*qq.cloneCube.length);
	};



})();
