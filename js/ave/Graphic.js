(function () {
"use strict";

ave.Graphic = class extends ave.SceneObject {

    constructor() {
		super();

		let graphic = this;

        this.type = ave.config.type.GRAPHIC;
        this.name = 'newGraphic';

		this._fill = '';

		this._fillOpacity = 1;

		this._stroke = '';

		this._strokeOpacity = '';

		this._strokeWidth = 0;

    }

	initGraphic(param) {
		this.initSceneObject(param);

        this.fill = param.fill;
		this.fillOpacity = param.fillOpacity;
		this.stroke = param.stroke;
		this.strokeOpacity = param.strokeOpacity;
	}

	get fill() {
		return this._fill;
	}
	set fill(val) {
		if (val === this._fill) return;

		if (typeof(val) === 'string')
			this.element.setAttributeNS(null, 'fill', val);
		else {
			if (this._fill.length == 0) return;
			this.element.setAttributeNS(null, 'fill', '');
		}

		this._fill = val;
	}

	get fillOpacity() {
		return this._fillOpacity;
	}
	set fillOpacity(val) {
		if (typeof(val) !== 'number') return;
		if (val == this._fillOpacity) return;

		this._fillOpacity = val;
		this.element.setAttributeNS(null, 'fill-opacity', val);
	}

	get stroke() {
		return this._stroke;
	}
	set stroke(val) {
		if (val === this._stroke) return;

		if (typeof(val) === 'string')
			this.element.setAttributeNS(null, 'stroke', val);
		else {
			if (this._stroke.length == 0) return;
			this.element.setAttributeNS(null, 'stroke', '');
		}

		this._stroke = val;
	}

	get strokeOpacity() {
		return this._strokeOpacity;
	}
	set strokeOpacity(val) {
		if (typeof(val) !== 'number') return;
		if (val == this._strokeOpacity) return;

		this._strokeOpacity = val;
		this.element.setAttributeNS(null, 'stroke-opacity', val);
	}

	get strokeWidth() {
		return this._strokeWidth;
	}
	set strokeWidth(val) {
		if (typeof(val) !== 'number') return

		obj.element.setAttributeNS(null, 'stroke-width', val);
		obj._strokeWidth = val;
	}

}


})();
