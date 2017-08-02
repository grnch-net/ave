(function () {
"use strict";

ave.Image = class extends ave.SceneObject {
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

		super();

        this.scene = param.scene;

		if (typeof(param.name) === 'string')
			this.name = param.name;
		else
			this.name = 'newImage';

		this.index = this.scene.newItemIndex.graphic;
        this.id = this.type+'-'+this.index;
		this.nodeId = 'ave+'+this.id;
		this.type = ave.config.type.GRAPHIC;

        this.element = dom.create({
            type: 'image',
            id: this.nodeId,
			href: param.href
        });

		this.initSceneObject(param);

		this.scene.items[this.id] = this;

		this.href = param.href;

		let sceneObject = this;
		this.size = {
			get width() {
				return this._width;
			},
			set width(val) {
				if (typeof(val) !== 'number') return;

				this._width = val;
				sceneObject.element.setAttributeNS(null, 'width', val);
			},

			get height() {
				return this._height;
			},
			set height(val) {
				if (typeof(val) !== 'number') return;

				this._height = val;
				sceneObject.element.setAttributeNS(null, 'height', val);
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

		this.size.width = param.size.width || 0;
		this.size.height = param.size.height || 0;
	}

	get href() {
		return this._href;
	}
	set href(val) {
		this._href = val;
		this.element.setAttributeNS(grnch.xlink, 'href', val);
	}
}


})();
