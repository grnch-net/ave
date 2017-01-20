(function () {
"use strict";

ave.SceneObject = class {

    constructor() {
		let sceneObject = this;

        this.type = ave.config.type.SCENEOBJECT;
        this.name = 'newSceneObject';

		this._parent = null;

		this.events = {};

		this.relativeScale = {
			_x: 1,
			get x() {
				return this._x;
			},

			_y: 1,
			get y() {
				return this._y
			},

			refresh() {
				this._x = sceneObject.scale._x * (globalPosition._z / 100);
				this._y = sceneObject.scale._y * (globalPosition._z / 100);

				return sceneObject;
			}
		}

		this.size = {
			_width: 0,
			get width() {
				return this._width;
			},
			set width(val) {
				if (typeof(val) !== 'number') return;

				this._width = val;
				this._refreshWidth();
			},

			_height: 0,
			get height() {
				return this._height;
			},
			set height(val) {
				if (typeof(val) !== 'number') return;

				this._height = val;
				this._refreshHeight();
			},

			_refreshWidth() {},
			_refreshHeight() {}
		};

		this.scale = {
			_x: 1,
			_y: 1
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
					this.x = newPos.x;
					this.y = newPos.y;
					this.z = newPos.z;
				// }

				return sceneObject;
			}

		};

		this.position = {
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
		};

		this._active = true;

		this._opacity = 1;
    }

	initSceneObject(param) {
		this.position.set(param.position.x, param.position.y, param.position.z);
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

	transformRefresh() {
		// matrix(scaleX, skewY, skewX, scaleY, posX, posY)
		this.element.setAttributeNS(null, 'transform', `matrix(
			${this.scale._x}, 0, 0, ${this.scale._y}, ${this.position._x}, ${this.position._y}
		)`);
	}

	removeParent() {
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


}


})();
