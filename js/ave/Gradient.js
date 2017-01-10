(function () {
"use strict";

ave.Gradient = class {

    constructor(param) {
		if (!grnch.checkParam(param, {
            scene: {
                class: ave.Scene,
            },
			type: {
				value: [ave.config.gradient.type.LINEAR, ave.config.gradient.type.RADIAL]
			},
			colors: {
				isArray: true
			}
        }, 'Gradient class') ) {
            return;
        }

		this.scene = param.scene;

		this.type = ave.config.type.GRADIENT;
		this.gradientType = param.type;

		let gradientTypeString;
		switch (this.gradientType) {
			case 0:
				gradientTypeString = 'linear';
				break;
			case 1:
				gradientTypeString = 'radial';
				break;
		}

		this.index = this.scene.newItemIndex.gradient;

		this.id = this.type+'-'+this.index;
		this.nodeId = 'ave+'+this.id;

		this.element = dom.create({
            type: gradientTypeString+'Gradient',
			id: this.nodeId,
			// cx: '50%',
			// cy: '50%',
			// r: '75%'
        });

		this.children = [];
		this.colors = param.colors;
		this.colors.forEach((color, ind) => {
			if ( !Array.isArray(color) )
				console.error('color('+ind+') is not array.');
			if (color.length !== 3)
				console.error('color('+ind+') length !== 3.');

			let stopNode = dom.create({
	            type: 'stop',
				offset: 100 / (this.colors.length-1) * ind,
				'stop-color': 'rgb(' + color.toString() + ')'
	        });
			this.element.appendChild(stopNode);
			this.children.push(stopNode);
		});

    }

}


})();
