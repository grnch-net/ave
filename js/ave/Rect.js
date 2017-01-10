(function () {
"use strict";

ave.Rect = class {

	_initSize(param) {
		let _this = this;

		this.size = {
			_width: 50,
			get width() {
				return this._width;
			},
			set width(val) {
				if (typeof(val) !== 'number') return;

				this._width = val;
				_this.element.setAttributeNS(null, 'width', val);
			},

			_height: 50,
			get height() {
				return this._height;
			},
			set height(val) {
				if (typeof(val) !== 'number') return;

				this._height = val;
				_this.element.setAttributeNS(null, 'height', val);
			},

			set: function (_width, _height) {
				let width, height;
                if (typeof(_width) === 'number')
                    width = _width;

                if (typeof(_height) === 'number')
                    height = _height;

                if (width === undefined && height === undefined)
                    return;

                if (width !== undefined) {
                    this.width = width;
                    if (height === undefined)
                        this.height = width;
                }

                if (height !== undefined) {
                    this.height = height;
                    if (width === undefined)
                        this.width = height;
                }
			}
		};

		if (typeof(param.size.width) === 'number')
			this.size._width = param.size.width;

		if (typeof(param.size.height) === 'number')
			this.size._height = param.size.height;
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
        this.name = param.name || 'newRect';
        this.index = this.scene.newItemIndex.graphic;
        this.id = this.type+'-'+this.index;
        this.nodeId = 'ave+'+this.id;

        this.element = dom.create({
            type: 'rect',
            id: this.nodeId,
			x: 0,
			y: 0,
			width: 50,
			height: 50
        })

		this.events = {};

		this._initSize(param);

        ave.interface.initPosition(this, param);
        ave.interface.initActiveChange(this, param);
        ave.interface.initParent(this, param);

		ave.interface.initOpacity(this, param);
        ave.interface.initFill(this, param);
		ave.interface.initFillOpacity(this, param);
        ave.interface.initStroke(this, param);
        ave.interface.initStrokeWidth(this, param);


        this.scene.items[this.id] = this;

		this.reDraw();

		this.element.setAttributeNS(null, 'width', this.size.width);
		this.element.setAttributeNS(null, 'height', this.size.height);
		this.element.setAttributeNS(null, 'fill-opacity', this.fillOpacity);
    }

    reDrawChildren() {
        this.reDraw();
    }

    reDraw() {
		this.element.setAttributeNS(null, 'x', this.globalPosition.x);
		this.element.setAttributeNS(null, 'y', this.globalPosition.y);
    }


	delete() {
		ave.interface.deleteGraphic(this);
	}
}


})();
