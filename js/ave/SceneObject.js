(function () {
"use strict";

ave.SceneObject = class {

    constructor() {
		let sceneObject = this;

        this.type = ave.config.type.SCENEOBJECT;
        this.name = 'newSceneObject';

		this._parent = null;

		this.events = {};

		this.anchor = {
			_x: 0,
			get x() { return this._x; },
			set x(val) {
				if (typeof(val) !== 'number') return;

				this._x = val;
				sceneObject.transformRefresh();
			},

			_y: 0,
			get y() { return this._y; },
			set y(val) {
				if (typeof(val) !== 'number') return;

				this._y = val;
				sceneObject.transformRefresh();
			},

			_z: 0,
			get z() { return this._z; },
			set z(val) {
				if (typeof(val) !== 'number') return;

				this._z = val;
				sceneObject.transformRefresh();
			},

			set(_x, _y, _z) {
				if (typeof(_x) === 'number')
                    this._x = _x;

                if (typeof(_y) === 'number')
                    this._y = _y;

                if (typeof(_z) === 'number')
                    this._z = _z;

				sceneObject.transformRefresh();

				return sceneObject;
			}
		}

		this.relativeScale = {
			_x: 1,
			get x() { return this._x; },

			_y: 1,
			get y() { return this._y },

			refresh() {
				this._x = sceneObject.scale._x * (globalPosition._z / 100);
				this._y = sceneObject.scale._y * (globalPosition._z / 100);

				return sceneObject;
			}
		}

		this.scale = {
			_x: 1,
			get x() { return this._x; },
			set x(val) {
                if (typeof(val) !== 'number') return;

                this._x = val;
				sceneObject.transformRefresh();
			},

			_y: 1,
			get y() { return this._y; },
			set y(val) {
                if (typeof(val) !== 'number') return;

                this._y = val;
				sceneObject.transformRefresh();
			},

			_z: 1,
			get z() { return this._z; },
			set z(val) {
                if (typeof(val) !== 'number') return;

                this._z = val;
				sceneObject.transformRefresh();
			},

			set(_x, _y, _z) {
                if (typeof(_x) === 'number')
                    this._x = _x;

                if (typeof(_y) === 'number')
                    this._y = _y;

                if (typeof(_z) === 'number')
                    this._z = _z;

				sceneObject.transformRefresh();
				return sceneObject;
            }
		};

		this.globalPosition = {
			_x: 0,
			get x() { return this._x; },
			_y: 0,
			get y() { return this._y; },
			_z: 0,
			get z() { return this._z; },

			refresh() {
				let newPos = {};
				if (sceneObject.parent) {
					newPos.x = sceneObject.parent.globalPosition.x + sceneObject.position.x;
                    newPos.y = sceneObject.parent.globalPosition.y + sceneObject.position.y;
                    newPos.z = sceneObject.parent.globalPosition.z + sceneObject.position.z;
				} else {
					newPos.x = sceneObject.position.x;
                    newPos.y = sceneObject.position.y;
                    newPos.z = sceneObject.position.z;
				}

				// if (newPos.x !== this.x
				// 	|| newPos.y !== this.y
				// 	|| newPos.z !== this.z
				// ) {
					this._x = newPos.x;
					this._y = newPos.y;
					this._z = newPos.z;
				// }

				sceneObject.transformRefresh();
				return sceneObject;
			}

		};

		this.position = {
			_x: 0,
			get x() { return this._x; },
			set x(val) {
                if (typeof(val) !== 'number') return;

                this._x = val;
				sceneObject.globalPosition.refresh();
			},

			_y: 0,
			get y() { return this._y; },
			set y(val) {
                if (typeof(val) !== 'number') return;

                this._y = val;
				sceneObject.globalPosition.refresh();
			},

			_z: 0,
			get z() { return this._z; },
			set z(val) {
                if (typeof(val) !== 'number') return;

                this._z = val;
				sceneObject.globalPosition.refresh();
			},

			set(_x, _y, _z) {
                if (typeof(_x) === 'number')
                    this._x = _x;

                if (typeof(_y) === 'number')
                    this._y = _y;

                if (typeof(_z) === 'number')
                    this._z = _z;

				sceneObject.globalPosition.refresh();
				return sceneObject;
            }
		};

		this._active = true;

		this._opacity = 1;
    }

	initSceneObject(param) {
		if (typeof(param.position) !== 'object' )
            param.position = {};
		if (typeof(param.scale) !== 'object' )
			param.scale = {};

		this.position.set(param.position.x, param.position.y, param.position.z);
		this.scale.set(param.scale.x, param.scale.y, param.scale.z);
		this.active = param.active;
		this.opacity = param.opacity;
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
	}

	get active() {
		return this.active;
	}
	set active(val) {
		if (typeof(val) !== 'boolean') return;
		if (val == this._active) return;

		this._active = val;
		this.element.style.display = (val)? '' : 'none';
	}

	get opacity() {
		return this._opacity;
	}
	set opacity(val) {
		if (typeof(val) !== 'number') return;
		if (val == this._opacity) return;

		this._opacity = val;
		this.element.setAttributeNS(null, 'opacity', val);
	}

	transformRefresh() {
		// matrix(scaleX, skewY, skewX, scaleY, posX, posY)
		this.element.setAttributeNS(null, 'transform', `matrix(${this.scale._x}, 0, 0, ${this.scale._y}, ${this.position._x-this.anchor._x*this.scale._x}, ${this.position._y-this.anchor._y*this.scale._y})`);
	}

	removeParent() {
		this.element.remove();

		if (this.parent) {
			let ind = this.parent.children.indexOf(this);
			if (ind !== -1) {
				this.parent.children.splice(ind, 1);
			} else {
				console.error('deleteGraphic: index of -1', this);
			}
			this.parent = undefined;
		}
	}

	delete() {
		this.element.remove();

		if (this.parent) {
			let parent = this.parent;
			let ind = parent.children.indexOf(this);
			if (ind !== -1) {
				parent.children.splice(ind, 1);
			} else {
				console.error('deleteGraphic: index of -1', this);
			}
		}

		if (this.scene)
			delete this.scene.items[this.id];

		return this;
	}

	clone() {
		let newClone = new ave.GraphicClone(this);
		this.parent.addChild(newClone);
        return newClone;
	}

}


})();
