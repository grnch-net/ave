(function () {
"use strict";

ave.GraphicGroup = class extends ave.Graphic {

    constructor(param) {
        if (!grnch.checkParam(param, {
            scene: {
                class: ave.Scene
            }
        }, 'ave.GraphicGroup: cunstructor') ) return;

		super();

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

        this.scene.items[this.id] = this;

		this.initGraphic(param);
    }

    addChild(child, ind) {
        if (!grnch.checkParam({ child }, {
            child: {
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

		return this;
    }

    createGraphicGroup(param = {}) {
		param.scene = this.scene;
		let newGroup = new ave.GraphicGroup(param);
        this.addChild(newGroup);
        return newGroup;
    }

    createGraphicPath(param = {}) {
		param.scene = this.scene;
		let newPath = new ave.GraphicPath(param);
        this.addChild(newPath);
        return newPath;
    }

    createCircle(param = {}) {
		param.scene = this.scene;
		let newCircle = new ave.Circle(param);
        this.addChild(newCircle);
        return newCircle;
    }

    createRect(param = {}) {
		param.scene = this.scene;
		let newRect = new ave.Rect(param);
        this.addChild(newRect);
        return newRect;
    }

    createText(param = {}) {
		param.scene = this.scene;
		let newText = new ave.Text(param);
        this.addChild(newText);
        return newText;
    }

    createImage(param = {}) {
		param.scene = this.scene;
		let newImage = new ave.Image(param);
        this.addChild(newImage);
        return newImage;
    }

    createSpriteSheet(param = {}) {
		param.scene = this.scene;
		let newSpriteSheet = new ave.SpriteSheet(param);
        this.addChild(newSpriteSheet);
        return newSpriteSheet;
    }

    createForeignObject(param = {}) {
		param.scene = this.scene;
		let newForeignObject = new ave.ForeignObject(param);
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
