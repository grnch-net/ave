(function () {
"use strict";

ave.GraphicClone = class extends ave.Graphic {

    constructor(prefab) {
		if (!grnch.checkParam(prefab, {
            scene: {
                class: ave.Scene,
            }
        }) ) return;

		super();

		this.scene = prefab.scene;

		if (typeof(prefab.name) === 'string')
			this.name = prefab.name+'Clone';
		else
			this.name = 'newClone';

        this.index = this.scene.newItemIndex.graphic;
        this.id = this.type+'-'+this.index;
        this.nodeId = 'ave+'+this.id;

        this.element = dom.create({
            type: 'use',
            id: this.nodeId,
			href: '#'+prefab.nodeId
        });

        this.scene.items[this.id] = this;
    }
}


})();
