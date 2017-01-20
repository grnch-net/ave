(function () {
"use strict";

ave.Graphic = class extends ave.Graphic {

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
        	this.name = 'newGraphic';

        this.index = this.scene.newItemIndex.graphic;
        this.id = this.type+'-'+this.index;
        this.nodeId = 'ave+'+this.id;

        this.element = dom.create({
            type: 'path',
            id: this.nodeId
        });

		this._path = 'M 0 0';
		this.path = param.path;

		this.size._refreshWidth() {
			console.warn('resize width method is null');
		}
		this.size._refreshHeight() {
			console.warn('resize height method is null');
		}

        this.scene.items[this.id] = this;

		this.initGraphic(param);
    }

	get path() {
		return this._path;
	}
	set path(val) {
		if (typeof(val) !== 'string') return;

		let newPath = '';
		// let parsePath = val.split(' ');
		//
		// let isX = true;
		// let isGlobal = true;
		// parsePath.forEach((line) => {
		// 	if (line === '') {
		// 		return;
		// 	} else
		// 	if ( isNaN(+line) ) {
		// 		newPath += line + ' ';
		// 		if (line.toUpperCase() === 'A' || line === 'c' || line === 'l' || line === 's')
		// 			isGlobal = false
		// 		else
		// 			isGlobal = true;
		// 	} else {
		// 		if (isX)
		// 			if (isGlobal)
		// 				newPath += (+line + this.globalPosition.x) + ' ';
		// 			else
		// 				newPath += (+line) + ' ';
		// 		else
		// 			if (isGlobal)
		// 				newPath += (+line + this.globalPosition.y) + ' ';
		// 			else
		// 				newPath += (+line) + ' ';
		//
		// 		isX = !isX;
		// 	}
		// });

		newPath = val;
		this._path = newPath;
		this.element.setAttributeNS(null, 'd', newPath);
	}

}


})();
