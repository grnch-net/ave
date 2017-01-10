(function () {
"use strict";

ave.Image = class {

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

	_initHref(param) {
		this._href = param.href;
		Object.defineProperty(this, "href", {
            get: function () {
                return this._href;
            },
            set: function (val) {
				this._href = val;
				this.element.setAttributeNS(grnch.xlink, 'href', val);
            }
        });
	}

    constructor(param) {
        if (!grnch.checkParam(param, {
            scene: {
                class: ave.Scene,
            },
			href: {
				type: 'string'
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
            type: 'image',
            id: this.nodeId,
			href: param.href,
			x: 0,
			y: 0,
			width: 50,
			height: 50
        });

		this.events = {};

		this._initSize(param);
		this._initHref(param);

        ave.interface.initPosition(this, param);
        ave.interface.initActiveChange(this, param);
        ave.interface.initParent(this, param);

		ave.interface.initOpacity(this, param);

        this.scene.items[this.id] = this;

		this.reDraw();

		this.element.setAttributeNS(null, 'width', this.size.width);
		this.element.setAttributeNS(null, 'height', this.size.height);
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
