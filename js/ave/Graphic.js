(function () {
"use strict";

ave.Graphic = class {

    constructor() {
		let _this = this;

        this.type = ave.config.type.GRAPHIC;
        this.name = 'newGraphic';

		this._parent = null;

		this.events = {};

		this.globalPosition = {
			x: 0,
			y: 0,
			z: 0,

			refresh() {
				let newPos = {};
				if (_this.parent) {
					newPos.x = _this.parent.globalPosition.x + _this.position.x;
                    newPos.y = _this.parent.globalPosition.y + _this.position.y;
                    newPos.z = _this.parent.globalPosition.z + _this.position.z;
				} else {
					newPos.x = _this.position.x;
                    newPos.y = _this.position.y;
                    newPos.z = _this.position.z;
				}

				if (newPos.x !== this.x
					|| newPos.y !== this.y
					|| newPos.z !== this.z
				) {
					this.x = newPos.x;
					this.y = newPos.y;
					this.z = newPos.z;

					// _this.reDrawChildren();
				}
			}

		};

		this.position = {
			_x: 0,
			get x() { return this._x; },
			set x(val) {
                if (typeof(val) !== 'number') return;

                this._x = val;
                // obj.globalPosition.refresh();
				this.element.setAttributeNS(null, 'x', this.globalPosition.x);
			},

			_y: 0,
			get y() { return this._y; },
			set y(val) {
                if (typeof(val) !== 'number') return;

                this._y = val;
                // obj.globalPosition.refresh();
				this.element.setAttributeNS(null, 'y', this.globalPosition.y);
			},

			_z: 0,
			get z() { return this._z; },
			set z(val) {
                if (typeof(val) !== 'number') return;

                this._z = val;
                // obj.globalPosition.refresh();
				// this.element.setAttributeNS(null, 'x', this.globalPosition.x);
				// this.element.setAttributeNS(null, 'y', this.globalPosition.y);
			},

			set(_x, _y, _z) {
                if (typeof(_x) === 'number')
                    this._x = _x;

                if (typeof(_y) === 'number')
                    this._y = _y;

                if (typeof(_z) === 'number')
                    this._z = _z;

				this.element.setAttributeNS(null, 'x', _x);
				this.element.setAttributeNS(null, 'y', _y);


                // obj.globalPosition.refresh();
            }
		};

		this._active = true;

		this._opacity = 1;

		this._fill = '';

		this._fillOpacity = 1;

		this._stroke = '';

		this._strokeOpacity = '';

		this._strokeWidth = 0;

        this.scene.items[this.id] = this;

		this.reDraw();
    }

	initGraphic(param) {
		this.position.set(param.position.x, param.position.y, param.position.z);
		this.active = param.active;
		this.opacity = param.opacity;
        this.fill = param.fill;
		this.fillOpacity = param.fillOpacity;
		this.stroke = param.stroke;
		this.strokeOpacity = param.strokeOpacity;
	}

	get parent() {
		return this._parent;
	}
	set parent(val) {
		if (!grnch.checkParam({ val }, {
			val: {
				class: [ave.GraphicGroup, ave.SpriteSheet]
			}
		}, 'ave.Graphic: set parent') ) return;

		this._parent = val;
		this.globalPosition.reWrite();
	}

	get active() {
		return this.active;
	}
	set active(val) {
		if (typeof(val) !== 'boolean') return;
		if (val == this._active) return;

		obj.element.style.display = (val)? '' : 'none';
		obj._active = val;
	}

	get opacity() {
		return this._opacity;
	}
	set opacity(val) {
		if (typeof(val) !== 'number') return;
		if (val == this._opacity) return;

		this.element.setAttributeNS(null, 'opacity', val);
		this._opacity = val;
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
