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

		if (item.parent)
			item.removeParent();

		this.items.push(item);
		this.element.appendChild(item.element); 

		if (item.type === ave.config.type.GRAPHIC)
			item.clone = ave.interface.cloneGraphic;
	}
}


})();
