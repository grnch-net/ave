(function () {
"use strict";

ave.Rect = class extends ave.Graphic {

    constructor(param) {
        if (!grnch.checkParam(param, {
            scene: {
                class: ave.Scene,
            }
        }) ) return;

		super();

        this.scene = param.scene;

		if (typeof(param.name) === 'string')
			this.name = param.name;
		else
			this.name = 'newRect';

        this.index = this.scene.newItemIndex.graphic;
        this.id = this.type+'-'+this.index;
        this.nodeId = 'ave+'+this.id;

        this.element = dom.create({
            type: 'rect',
            id: this.nodeId,
			width: 50,
			height: 50
        });

		this._initSize(param);

        this.scene.items[this.id] = this;

		this.initGraphic(param);
    }

	_initSize(param) {
		let rect = this;

		this.size = {
			_width: 50,
			get width() {
				return this._width;
			},
			set width(val) {
				if (typeof(val) !== 'number') return;

				this._width = val;
				rect.element.setAttributeNS(null, 'width', val);
			},

			_height: 50,
			get height() {
				return this._height;
			},
			set height(val) {
				if (typeof(val) !== 'number') return;

				this._height = val;
				rect.element.setAttributeNS(null, 'height', val);
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

		this.size.width = param.size.width;
		this.size.height = param.size.height;
	}
}


})();
