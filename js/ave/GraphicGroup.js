(function () {
"use strict";

ave.GraphicGroup = class {

    constructor(param) {
        if (!grnch.checkParam(param, {
            scene: {
                class: ave.Scene
            }
        }, 'ave.GraphicGroup: cunstructor') ) {
            return;
        }

        this.scene = param.scene;

        if (param._type === undefined)
            this.type = ave.config.type.GROUP;
        else
            this.type = param._type;

        this.name = param.name || 'newGroup';

        if (this.type === ave.config.type.WORLD)
            this.index = 0;
        else
            this.index = this.scene.newItemIndex.group;

		this.id = this.type+'-'+this.index;
		this.nodeId = 'ave+'+this.id;

        this.element = dom.create({
            type: 'g',
            id: this.nodeId
        });

        this.children = [];

        ave.interface.initPosition(this, param);
        ave.interface.initActiveChange(this, param);
        ave.interface.initParent(this, param);

		ave.interface.initOpacity(this, param);
        ave.interface.initFill(this, param);
        ave.interface.initStroke(this, param);
        ave.interface.initStrokeWidth(this, param);

        this.scene.items[this.id] = this;

		this.reDraw();
    }

    reDraw() {
        this.globalPosition.reWrite();
    }

    reDrawChildren() {
        this.children.forEach((child) => {
            child.globalPosition.reWrite();
        });
    }

    addChild(child, ind) {
        if (!grnch.checkParam({ child }, {
            child: {
                // class: [ave.GraphicGroup, ave.Graphic],
				attr: {
					type: [ave.config.type.GROUP, ave.config.type.GRAPHIC, ave.config.type.SPRITESHEET]
				}
            }
        }, 'graphicGroup: addChild') ) return;

        if (typeof(ind) === 'number'
            && ind > -1
            && ind < this.children.length
        ) {
            this.children.splice(ind, 0, child);
            this.element.insertBefore(child.element, this.element.childNodes[ind]);
        } else {
            this.children.push(child);
            this.element.appendChild(child.element);
        }

        child.parent = this;
    }

    createGraphicGroup(param = {}) {
        let newGroup = ave.interface.createGraphicGroup(this.scene, param);
        this.addChild(newGroup);
        return newGroup;
    }

    createGraphic(param = {}) {
        let newGraphic = ave.interface.createGraphic(this.scene, param);
        this.addChild(newGraphic);
        return newGraphic;
    }

    createCircle(param = {}) {
        let newCircle = ave.interface.createCircle(this.scene, param);
        this.addChild(newCircle);
        return newCircle;
    }

    createRect(param = {}) {
        let newRect = ave.interface.createRect(this.scene, param);
        this.addChild(newRect);
        return newRect;
    }

    createText(param = {}) {
        let newText = ave.interface.createText(this.scene, param);
        this.addChild(newText);
        return newText;
    }

    createImage(param = {}) {
        let newImage = ave.interface.createImage(this.scene, param);
        this.addChild(newImage);
        return newImage;
    }

    createSpriteSheet(param = {}) {
        let newSpriteSheet = ave.interface.createSpriteSheet(this.scene, param);
        this.addChild(newSpriteSheet);
        return newSpriteSheet;
    }

    createForeignObject(param = {}) {
        let newcreateForeignObject = ave.interface.createForeignObject(this.scene, param);
        this.addChild(newcreateForeignObject);
        return newcreateForeignObject;
    }

	delete() {
		for (let ind = this.children.length-1; ind>-1; ind--) {
			this.children[ind].delete();
		}

		ave.interface.deleteGraphic(this);
	}
}


})();
