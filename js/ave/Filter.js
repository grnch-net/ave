(function () {
"use strict";

ave.Filter = class {

    constructor(param) {
		if (!grnch.checkParam(param, {
            scene: {
                class: ave.Scene,
            },
			type: {
				value: [ave.config.filter.type.BLUR]
			},
			spread: {
				type: 'number'
			}
        }, 'Filter class') ) {
            return;
        }

		this.scene = param.scene;

		this.type = ave.config.type.FILTER;
		this.filterType = param.type;

		this.index = this.scene.newItemIndex.filter;
		this.id = this.type+'-'+this.index;
		this.nodeId = 'ave+'+this.id;

		this.element = dom.create({
            type: 'filter',
			id: this.nodeId
        });

		this.children = [];

		switch (this.filterType) {
			case ave.config.filter.type.BLUR:
				let blurNode = dom.create({
		            type: 'feGaussianBlur',
					stdDeviation: param.spread
		        });
				this.element.appendChild(blurNode);
				this.children.push(blurNode);
				break;
		}
    }
}


})();
