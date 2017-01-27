(function () {
"use strict";

ave.Circle = class extends ave.Graphic {
    constructor(param) {
        if (!grnch.checkParam(param, {
            scene: {
                class: ave.Scene,
            }
        }) ) {
            return;
        }

		super();

        this.scene = param.scene;

		if (typeof(param.name) === 'string')
			this.name = param.name;
		else
			this.name = 'newCircle';

        this.index = this.scene.newItemIndex.graphic;
        this.id = this.type+'-'+this.index;
		this.nodeId = 'ave+'+this.id;

        this.element = dom.create({
            type: 'circle',
            id: this.nodeId,
        });

        this.scene.items[this.id] = this;

		this.initGraphic(param);

		this.radius = ave.config.circle.radius;
		this.radius = param.radius;
    }

	get radius() {
		return this._radius;
	}
	set radius(val) {
		if (typeof(val) !== 'number') return;

		this._radius = val;
		this.element.setAttributeNS(null, 'r', val);
	}
}


})();
