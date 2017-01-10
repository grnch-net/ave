(function () {
"use strict";

ave.Text = class {

	_initValue(param) {
		this._value = 'Default text.';
		Object.defineProperty(this, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
				if (typeof(val) !== 'string'
					&& typeof(val) !== 'number'
				) return;

                this._value = val;
				this.element.innerHTML = val;
            }
        });

		if (typeof(param.value) === 'string'
			|| typeof(param.value) === 'number'
		) this._value = param.value;
	}

	_initFontSize(param) {
		this._fontSize = 21;
		Object.defineProperty(this, "fontSize", {
            get: function () {
                return this._fontSize;
            },
            set: function (val) {
				if (typeof(val) !== 'number') return;

                this._fontSize = val;
				this.element.setAttributeNS(null, 'font-size', val);
            }
        });

		if (typeof(param.fontSize) === 'number')
			this._fontSize = param.fontSize;
	}

	_initFontFamily(param) {
		this._fontFamily = 'Verdana';
		Object.defineProperty(this, "fontFamily", {
            get: function () {
                return this._fontFamily;
            },
            set: function (val) {
				if (typeof(val) !== 'string') return;

                this._fontFamily = val;
				this.element.setAttributeNS(null, 'font-family', val);
            }
        });

		if (typeof(param.fontFamily) === 'string')
			this._fontFamily = param.fontFamily;
	}

	_initFontWeight(param) {
		this._fontWeight = '';
		Object.defineProperty(this, "fontWeight", {
            get: function () {
                return this._fontWeight;
            },
            set: function (val) {
				if (typeof(val) !== 'string') return;

                this._fontWeight = val;
				this.element.setAttributeNS(null, 'font-weight', val);
            }
        });

		if (typeof(param.fontWeight) === 'string')
			this._fontWeight = param.fontWeight;
	}

	_initTextAnchor(param) {
		this._textAnchor = '';
		Object.defineProperty(this, "textAnchor", {
            get: function () {
                return this._textAnchor;
            },
            set: function (val) {
				if (typeof(val) !== 'string') return;

                this._textAnchor = val;
				this.element.setAttributeNS(null, 'text-anchor', val);
            }
        });

		if (typeof(param.textAnchor) === 'string')
			this._textAnchor = param.textAnchor;
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
        this.name = param.name || 'newGraphic';
        this.index = this.scene.newItemIndex.graphic;
        this.id = this.type+'-'+this.index;
        this.nodeId = 'ave+'+this.id;

        this.element = dom.create({
            type: 'text',
            id: this.nodeId,
			x: 0,
			y: 0,
			innerHTML: 'Default text.',
			'font-size': 21
        })

		this.events = {};

		this._initValue(param);
		this._initFontSize(param);
		this._initFontFamily(param);
		this._initFontWeight(param);
		this._initTextAnchor(param);

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

		this.element.innerHTML = this.value;
		this.element.setAttributeNS(null, 'font-size', this.fontSize);
		this.element.setAttributeNS(null, 'font-family', this.fontFamily);
		this.element.setAttributeNS(null, 'font-weight', this.fontWeight);
		this.element.setAttributeNS(null, 'text-anchor', this.textAnchor);
    }

    reDrawChildren() {
        this.reDraw();
    }

    reDraw() {
		setTimeout(() => {
			this.element.setAttributeNS(null, 'x', this.globalPosition.x);
			this.element.setAttributeNS(null, 'y', this.globalPosition.y);
		}, 0);
    }

	delete() {
		ave.interface.deleteGraphic(this);
	}

}


})();
