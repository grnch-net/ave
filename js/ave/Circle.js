(function () {
"use strict";

ave.Circle = class {

	initRadius(param) {
		this._radius = 10;
        Object.defineProperty(this, "radius", {
            get: function () {
                return this._radius;
            },
            set: function (val) {
				if (typeof(val) !== 'number') return;

                this._radius = val;
				this.element.setAttributeNS(null, 'r', val);
            }
        });

		if (typeof(param.radius) === 'number')
			this._radius = param.radius;
	}

	initFilter(param) {
		if (param.filter === undefined
			|| !(param.filter instanceof ave.Filter)
		) return;

		this.filter = param.filter;
		this.element.setAttributeNS(null, 'filter', 'url(#'+ this.filter.nodeId +')');
	}

    constructor(param) {
        if (!grnch.checkParam(param, {
            scene: {
                class: ave.Scene,
            }
        }) ) {
            return;
        }

        this.scene = param.scene;

        this.type = ave.config.type.GRAPHIC;
        this.name = param.name || 'newCircle';
        this.index = this.scene.newItemIndex.graphic;
        this.id = this.type+'-'+this.index;
		this.nodeId = 'ave+'+this.id;

        this.element = dom.create({
            type: 'circle',
            id: this.nodeId,
			cx: 0,
			cy: 0,
			r: 10
        });

		this.events = {};

		this.initRadius(param);
		this.initFilter(param);

        ave.interface.initPosition(this, param);
        ave.interface.initActiveChange(this, param);
        ave.interface.initParent(this, param);

		ave.interface.initOpacity(this, param);
        ave.interface.initFill(this, param);
		ave.interface.initFillOpacity(this, param);
        ave.interface.initStroke(this, param);
        ave.interface.initStrokeOpacity(this, param);
        ave.interface.initStrokeWidth(this, param);

        this.scene.items[this.id] = this;

		this.reDraw();
    }

    reDrawChildren() {
        this.reDraw();
    }

    reDraw() {
		this.element.setAttributeNS(null, 'cx', this.globalPosition.x);
		this.element.setAttributeNS(null, 'cy', this.globalPosition.y);
		this.element.setAttributeNS(null, 'r', this.radius);
    }


	delete() {
		ave.interface.deleteGraphic(this);
	}
}


})();
