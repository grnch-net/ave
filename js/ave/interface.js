(function () {
"use strict";

ave.interface = {

	// initParent: function (obj, param) {
	// 	obj._parent = undefined;
    //     Object.defineProperty(obj, "parent", {
    //         get: function () {
    //             return this._parent;
    //         },
    //         set: function (val) {
    //             if (!grnch.checkParam({ val }, {
    //                 val: {
    //                     class: [ave.GraphicGroup, ave.SpriteSheet]
    //                 }
    //             }, 'ave.GraphicGroup: cunstructor') ) {
    //                 return;
    //             }
	//
    //             this._parent = val;
    //             this.globalPosition.reWrite();
    //         }
    //     });
	// },

    // initPosition: function(obj, param) {
    //     obj.globalPosition = {
    //         x: 0,
    //         y: 0,
	//
    //         reWrite: function() {
    //             let newX, newY;
	//
    //             if (obj.parent) {
    //                 newX = obj.parent.globalPosition.x + obj.position.x;
    //                 newY = obj.parent.globalPosition.y + obj.position.y;
    //             } else {
    //                 newX = obj.position.x;
    //                 newY = obj.position.y;
    //             }
	//
    //             if (newX !== this.x || newY !== this.y) {
    //                 this.x = newX;
    //                 this.y = newY;
	//
    //                 obj.reDrawChildren();
    //             }
	//
    //         }
    //     };
	//
    //     obj.position = {
    //         _x: 0,
    //         get x() { return this._x; },
    //         set x(val) {
    //             if (typeof(val) !== 'number') return;
	//
    //             this._x = val;
    //             obj.globalPosition.reWrite();
    //         },
	//
    //         _y: 0,
    //         get y() { return this._y; },
    //         set y(val) {
    //             if (typeof(val) !== 'number') return;
	//
    //             this._y = val;
    //             obj.globalPosition.reWrite();
    //         },
	//
    //         set: function(_x, _y) {
    //             let x, y;
    //             if (typeof(_x) === 'number')
    //                 x = _x;
	//
    //             if (typeof(_y) === 'number')
    //                 y = _y;
	//
    //             if (x === undefined && y === undefined)
    //                 return;
	//
    //             if (x !== undefined) {
    //                 this._x = x;
    //                 if (y === undefined)
    //                     this._y = x;
    //             }
	//
    //             if (y !== undefined) {
    //                 this._y = y;
    //                 if (x === undefined)
    //                     this._x = y;
    //             }
	//
    //             obj.globalPosition.reWrite();
    //         }
    //     };
	//
	// 	if (typeof(param.position.x) === 'number')
	// 		obj.position._x = param.position.x;
	//
	// 	if (typeof(param.position.y) === 'number')
	// 		obj.position._y = param.position.y;
    // },

	// initOpacity: function (obj, param) {
	// 	obj._opacity = 1;
	// 	Object.defineProperty(obj, "opacity", {
    //         get: function () {
    //             return this._opacity;
    //         },
    //         set: function (val) {
	// 			if (typeof(val) !== 'number') return;
	//
    //             this._opacity = val;
	// 			this.element.setAttributeNS(null, 'opacity', val);
    //         }
    //     });
	//
	// 	if (typeof(param.opacity) === 'number')
	// 		obj.opacity = param.opacity;
	// },

    // initFill: function (obj, param) {
    //     obj._fill = undefined;
    //     Object.defineProperty(obj, "fill", {
    //         get: function () {
    //             return this._fill;
    //         },
    //         set: function (val) {
	// 			if (val === this._fill) return;
    //             if (typeof(val) !== 'string' && val !== undefined) return;
	//
    //             if (val === undefined)
    //                 this.element.setAttributeNS(null, 'fill', '');
    //             else
    //                 this.element.setAttributeNS(null, 'fill', val);
	//
    //             this._fill = val;
    //         }
    //     });
	//
    //     if (param.fill)
    //         obj.fill = param.fill;
	//
	//
    // },

	// initFillOpacity: function (obj, param) {
	// 	obj._fillOpacity = 1;
	// 	Object.defineProperty(obj, "fillOpacity", {
    //         get: function () {
    //             return this._fillOpacity;
    //         },
    //         set: function (val) {
	// 			if (typeof(val) !== 'number') return;
	//
    //             this._fillOpacity = val;
	// 			this.element.setAttributeNS(null, 'fill-opacity', val);
    //         }
    //     });
	//
	// 	if (typeof(param.fillOpacity) === 'number')
	// 		obj.fillOpacity = param.fillOpacity;
	// },

    // initStroke: function (obj, param) {
    //     obj._stroke = undefined;
    //     Object.defineProperty(obj, "stroke", {
    //         get: function () {
    //             return obj._stroke;
    //         },
    //         set: function (val) {
    //             if (typeof(val) !== 'string' && val !== undefined) return;
	//
    //             if (val === undefined)
    //                 obj.element.setAttributeNS(null, 'stroke', '');
    //             else
    //                 obj.element.setAttributeNS(null, 'stroke', val);
	//
    //             obj._stroke = val;
    //         }
    //     });
	//
    //     if (param.stroke)
    //         obj.stroke = param.stroke;
    // },

	// initStrokeOpacity: function (obj, param) {
	// 	obj._strokeOpacity = 1;
	// 	Object.defineProperty(obj, "strokeOpacity", {
    //         get: function () {
    //             return this._strokeOpacity;
    //         },
    //         set: function (val) {
	// 			if (typeof(val) !== 'number') return;
	//
    //             this._strokeOpacity = val;
	// 			this.element.setAttributeNS(null, 'stroke-opacity', val);
    //         }
    //     });
	//
	// 	if (typeof(param.strokeOpacity) === 'number')
	// 		obj.strokeOpacity = param.strokeOpacity;
	// },

    // initStrokeWidth: function (obj, param) {
    //     obj._strokeWidth = undefined;
    //     Object.defineProperty(obj, "strokeWidth", {
    //         get: function () {
    //             return obj._strokeWidth;
    //         },
    //         set: function (val) {
    //             if (typeof(val) !== 'number' && val !== undefined) return;
	//
    //             if (val === undefined)
    //                 obj.element.setAttributeNS(null, 'stroke-width', '');
    //             else
    //                 obj.element.setAttributeNS(null, 'stroke-width', val);
	//
    //             obj._strokeWidth = val;
    //         }
    //     });
	//
    //     if (param.strokeWidth)
    //         obj.strokeWidth = param.strokeWidth;
    // },

    // initActiveChange: function (obj, param) {
    //     obj._isActive = true;
    //     Object.defineProperty(obj, "isActive", {
    //         get: function () {
	// 			console.warn('isActive API removed!');
    //             return obj._isActive;
    //         },
    //         set: function (val) {
	// 			console.warn('isActive API removed!');
    //             if (typeof(val) !== 'boolean') return;
	//
    //             if (val)
    //                 obj.element.style.display = '';
    //             else
    //                 obj.element.style.display = 'none';
	//
    //             obj._isActive = val;
    //         }
    //     });
	//
    //     obj._active = true;
    //     Object.defineProperty(obj, "active", {
    //         get: function () {
    //             return obj._active;
    //         },
    //         set: function (val) {
    //             if (typeof(val) !== 'boolean') return;
	//
    //             if (val)
    //                 obj.element.style.display = '';
    //             else
    //                 obj.element.style.display = 'none';
	//
    //             obj._active = val;
    //         }
    //     });
	//
	// 	if (param.active === false)
	// 		obj.active = false;
    // },

	// deleteGraphic(obj) {
	// 	if (obj === undefined)
	// 		obj = this;
	// 	if (obj === ave.interface) {
	// 		console.error('deleteGroup: this obj is undefined.');
	// 		return;
	// 	}
	//
	// 	obj.element.remove();
	//
	// 	if (obj.parent) {
	// 		let parent = obj.parent;
	// 		let ind = parent.children.indexOf(obj);
	// 		if (ind !== -1) {
	// 			parent.children.splice(ind, 1);
	// 			if (parent.children.indexOf(obj) !== -1)
	// 				console.error('deleteGraphic: child delete, but ind: ' + ind);
	// 		} else {
	// 			console.error('deleteGraphic: index of -1', obj);
	// 		}
	// 	}
	//
	// 	if (obj.scene)
	// 		delete obj.scene.items[obj.id];
	// },

    createGraphicGroup: function (scene, param = {}) {
        if (typeof(param.position) !== 'object' )
            param.position = {};

        let newGroup = new ave.GraphicGroup({
            scene: scene,
			active: param.active,
            name: param.name,
            position: {
                x: param.position.x,
                y: param.position.y
            },
            opacity: param.opacity,
            fill: param.fill,
            stroke: param.stroke,
            strokeWidth: param.strokeWidth
        });

        return newGroup;
    },

    createGraphic(scene, param = {}) {
        if (typeof(param.position) !== 'object' )
            param.position = {};

        let newGraphic = new ave.Graphic({
            scene: scene,
			active: param.active,
            name: param.name,
            path: param.path,
            position: {
                x: param.position.x,
                y: param.position.y
            },
			opacity: param.opacity,
            fill: param.fill,
            fillOpacity: param.fillOpacity,
            stroke: param.stroke,
            strokeWidth: param.strokeWidth
        });

        return newGraphic;
    },

    createCircle(scene, param = {}) {
        if (typeof(param.position) !== 'object' )
            param.position = {};

        let newGraphic = new ave.Circle({
            scene: scene,
			active: param.active,
            name: param.name,
            radius: param.radius,
            position: {
                x: param.position.x,
                y: param.position.y
            },
			opacity: param.opacity,
            fill: param.fill,
            fillOpacity: param.fillOpacity,
            stroke: param.stroke,
			strokeOpacity: param.strokeOpacity,
            strokeWidth: param.strokeWidth,
			filter: param.filter
        });

        return newGraphic;
    },

    createRect(scene, param = {}) {
        if (typeof(param.position) !== 'object' )
            param.position = {};
        if (typeof(param.size) !== 'object' )
            param.size = {};

        let newRect = new ave.Rect({
            scene: scene,
			active: param.active,
            name: param.name,
            position: {
                x: param.position.x,
                y: param.position.y
            },
			size: {
				width: param.size.width,
				height: param.size.height
			},
			opacity: param.opacity,
            fill: param.fill,
            fillOpacity: param.fillOpacity,
            stroke: param.stroke,
            strokeWidth: param.strokeWidth
        });

        return newRect;
    },

	createForeignObject(scene, param = {}) {
        if (typeof(param.position) !== 'object' )
            param.position = {};
        if (typeof(param.size) !== 'object' )
            param.size = {};

        let newForeignObject = new ave.ForeignObject({
            scene: scene,
			active: param.active,
            name: param.name,
            position: {
                x: param.position.x,
                y: param.position.y
            },
			size: {
				width: param.size.width,
				height: param.size.height
			},
			opacity: param.opacity,
			html: param.html
        });

        return newForeignObject;
    },

    createText(scene, param = {}) {
        if (typeof(param.position) !== 'object' )
            param.position = {};

        let newText = new ave.Text({
            scene: scene,
			active: param.active,
            name: param.name,
            position: {
                x: param.position.x,
                y: param.position.y
            },
			value: param.value,
			fontSize: param.fontSize,
			fontFamily: param.fontFamily,
			fontWeight: param.fontWeight,
			opacity: param.opacity,
            fill: param.fill,
            fillOpacity: param.fillOpacity,
            stroke: param.stroke,
            strokeWidth: param.strokeWidth,
			textAnchor: param.textAnchor
        });

        return newText;
    },

    createImage(scene, param = {}) {
        if (typeof(param.position) !== 'object' )
            param.position = {};
        if (typeof(param.size) !== 'object' )
            param.size = {};

        let newImage = new ave.Image({
            scene: scene,
			active: param.active,
            name: param.name,
			href: param.href,
            position: {
                x: param.position.x,
                y: param.position.y
            },
			size: {
				width: param.size.width,
				height: param.size.height
			},
			opacity: param.opacity
        });

        return newImage;
    },

    createSpriteSheet(scene, param = {}) {
        if (typeof(param.position) !== 'object' )
            param.position = {};
        if (typeof(param.size) !== 'object' )
            param.size = {};

        let newImage = new ave.SpriteSheet({
            scene: scene,
			active: param.active,
            name: param.name,
			hrefs: param.hrefs,
			frameRate: param.frameRate,
			currentFrame: param.currentFrame,
            position: {
                x: param.position.x,
                y: param.position.y
            },
			size: {
				width: param.size.width,
				height: param.size.height
			},
			opacity: param.opacity
        });

        return newImage;
    },

	// TODO: write cloneGraphic
	cloneGraphic() {},

};


})();
