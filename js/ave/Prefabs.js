(function () {
"use strict";

ave.Prefabs = class {

    constructor(param) {
		if (!grnch.checkParam(param, {
            scene: {
                class: ave.Scene,
            }
        }, 'Prefabs class') ) {
            return;
        }

		this.scene = param.scene;

		this.element = dom.create({
			type: 'defs',
			parent: this.scene.element
		});

		this.items = [];
    }

	add(item) {
		if (item === undefined) return;

		if (item.parent) {
			let ind = item.parent.children.indexOf(item);
			if (ind !== -1)
				item.parent.children.splice(ind, 1);
			else
				console.error('deleteGraphic: index of -1', this);
		}

		this.items.push(item);
		this.element.appendChild(item.element);
	}
}


})();
