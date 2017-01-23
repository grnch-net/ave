(function () {
"use strict";

ave.Text = class extends ave.Graphic {

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

        this.type = ave.config.type.GRAPHIC;
        this.name = param.name || 'newGraphic';
        this.index = this.scene.newItemIndex.graphic;
        this.id = this.type+'-'+this.index;
        this.nodeId = 'ave+'+this.id;

        this.element = dom.create({
            type: 'text',
            id: this.nodeId,
			innerHTML: 'Default text.',
			'font-size': 21,
			'font-family': 'Verdana',
			'font-weight': '',
			'text-anchor': ''
        })

		this.events = {};

		this._value = 'Default text.';
		this.value = param.value;

		this._fontSize = 21;
		this.fontSize = param.fontSize;

		this._fontFamily = 'Verdana';
		this.fontFamily = param.fontFamily;

		this._fontWeight = '';
		this.fontWeight = param.fontWeight;

		this._textAnchor = '';
		this.textAnchor = param.textAnchor;

        this.scene.items[this.id] = this;

		this.initGraphic(param);
    }

	get value () {
		return this._value;
	}
	set value(val) {
		if (typeof(val) !== 'string'
			&& typeof(val) !== 'number'
		) return;

		this._value = val;
		this.element.innerHTML = val;
	}

	get fontSize() {
		return this._fontSize;
	}
	set fontSize(val) {
		if (typeof(val) !== 'number') return;

		this._fontSize = val;
		this.element.setAttributeNS(null, 'font-size', val);
	}

	get fontFamily() {
		return this._fontFamily;
	}
	set fontFamily(val) {
		if (typeof(val) !== 'string') return;

		this._fontFamily = val;
		this.element.setAttributeNS(null, 'font-family', val);
	}

	get fontWeight() {
		return this._fontWeight;
	}
	set fontWeight(val) {
		if (typeof(val) !== 'string') return;

		this._fontWeight = val;
		this.element.setAttributeNS(null, 'font-weight', val);
	}

	get textAnchor() {
		return this._textAnchor;
	}
	set textAnchor(val) {
		if (typeof(val) !== 'string') return;

		this._textAnchor = val;
		this.element.setAttributeNS(null, 'text-anchor', val);
	}

}


})();
