var main;

var scene;
var creatorAnimate;

var graph = {
	verticalVal: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
	horizontalVal: [2013, 2014, 2015, 2016],
	data: [{
			color: 'red',
			path: [0, 3, -2, 5]
		},{
			color: 'blue',
			path: [-2, 1, 5, -1]
		},{
			color: 'green',
			path: [4, -3, 2, -5]
		}
	]
};

var qq = {};

(function () {
	"use strict";

	main = {
		init: function () {
			// grnch.keyboard.init();

			this.createGraph();
		},

		createGraph: function() {
			scene = new ave.Scene({
				width: 500,
				height: 500
			});

			scene.element.style.backgroundColor = 'white';
			scene.world.position.x = 0;
			scene.world.position.y = 0;

			qq.graphGroup = scene.world.createGraphicGroup({
				scene: scene,
				position: {
					x: 30,
					y: scene.height - 30
				}
			});

			graph.width = scene.width -30;
			graph.height = scene.height -30;
			qq.graphGroup.createGraphicPath({
				path: `M 0 ${graph.height *-1} L 0 0 L ${graph.width} 0`,
				fillOpacity: 0,
				stroke: 'black',
				strokeWidth: 2
			});

			this.generateVerticalAttr();
			this.generateHorizonAttr();
			this.generateData();
		},

		generateVerticalAttr: function() {
			graph.verticalStep = (graph.height +10) / (graph.verticalVal.length-1) -4;

			graph.verticalVal.forEach((val, ind) => {
				qq.graphGroup.createText({
					position: {
		                x: -5,
		                y: ind * graph.verticalStep *-1 +4
		            },
					value: val,
					fontSize: 14,
		            fill: 'black',
					textAnchor: 'end'
				});

				if (ind > 0) {
					qq.graphGroup.createGraphicPath({
						path: `M 1 ${ind * graph.verticalStep *-1} L ${graph.width-1} ${ind * graph.verticalStep *-1}`,
						fillOpacity: 0,
						stroke: '#8b8b8b',
						strokeWidth: 1,
						// strokeDasharray: '5'
					});
				}
			});
		},

		generateHorizonAttr: function() {
			graph.horizontalStep = (graph.width -50) / (graph.horizontalVal.length-1);

			graph.horizontalVal.forEach((val, ind) => {
				qq.graphGroup.createText({
					position: {
						x: ind * graph.horizontalStep,
						y: 20
					},
					value: val,
					fontSize: 14,
					fill: 'black',
					textAnchor: 'center'
				});

				if (ind > 0) {
					qq.graphGroup.createGraphicPath({
						// active: false,
						path: `M ${ind * graph.horizontalStep} -1 L ${ind * graph.horizontalStep} ${graph.height *-1 -1}`,
						fillOpacity: 0,
						stroke: '#8b8b8b',
						strokeWidth: 1,
						strokeDasharray: '5'
					});
				}
			});
		},

		generateData: function() {
			graph.data.forEach(data=>{
				var path = 'M ';
				var _lastPoint;
				data.path.forEach((line, ind)=>{
					if (ind > 0) {
						path += 'C ';
						path += (graph.horizontalStep * (ind-0.5))+' ';
						path += _lastPoint+' ';

						path += (graph.horizontalStep * (ind-0.5))+' ';
						path += (graph.verticalStep * graph.verticalVal.indexOf(line) *-1)+' ';
					}

					path += (graph.horizontalStep * ind +1)+' ';
					path += (graph.verticalStep * graph.verticalVal.indexOf(line) *-1)+' ';

					_lastPoint = (graph.verticalStep * graph.verticalVal.indexOf(line) *-1);
				});

				qq.graphGroup.createGraphicPath({
					path: path,
					fillOpacity: 0,
					stroke: data.color,
					strokeWidth: 1
				});
			});
		}
	};



})();
main.init();
