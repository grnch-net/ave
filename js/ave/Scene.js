(function () {
"use strict";

ave.Scene = class {
    _initScene(param) {
        this.element = dom.getID(param.id);
        if (!this.element) {
            console.error('SVG ('+param.id+') is undefined.');
        }
    }

    _createScene(param) {
        this.element = dom.create({
            type: 'svg',
            parent: document.body,
            width: this.width-1, // -1 : fix FF
            height: this.height,
			viewBox: '0 0 '+this.width+' '+this.height,
			xmlns: grnch.svgns
        });
    }

    _createWorld(param) {
        this.world = new ave.GraphicGroup({
            scene: this,
            _type: ave.config.type.WORLD,
            name: 'world',
            position: {
                x: this.width / 2,
                y: this.height / 2
            },
			scale: {}
        });

        this.element.appendChild(this.world.element);
    }

    _initItemsController(param) {
        this.items = {};

        let _this = this;
        this.newItemIndex = {
            get group() {
                let ind = 0;
                while (_this.items[ave.config.type.GROUP+'-'+ind] !== undefined) {
                    ind++;
                }

                return ind;
            },
            get graphic() {
                let ind = 0;
                while (_this.items[ave.config.type.GRAPHIC+'-'+ind] !== undefined) {
                    ind++;
                }

                return ind;
            },
			get spriteSheet() {
				let ind = 0;
                while (_this.items[ave.config.type.SPRITESHEET+'-'+ind] !== undefined) {
                    ind++;
                }

                return ind;
			},
			get filter() {
				let ind = 0;
                while (_this.items[ave.config.type.FILTER+'-'+ind] !== undefined) {
                    ind++;
                }

                return ind;
			},
			get gradient() {
				let ind = 0;
                while (_this.items[ave.config.type.GRADIENT+'-'+ind] !== undefined) {
                    ind++;
                }

                return ind;
			},
        };
    }

    _initEvent(param) {
		let _this = this;
		this.element.addEventListener('click', function (event) {
			let targetId = event.target.id.split('+');

			if (targetId[0] === 'ave') {
				let item = _this.items[ targetId[1] ];
				if (item !== undefined
					&& item.events
					&& item.events.click
				) {
					item.events.click();
				}
			}
		});
		this.element.addEventListener('mouseover', function (event) {
			let targetId = event.target.id.split('+');

			if (targetId[0] === 'ave') {
				let item = _this.items[ targetId[1] ];
				if (item !== undefined
					&& item.events
					&& item.events.mouseover
				) {
					item.events.mouseover();
				}
			}
		});
		this.element.addEventListener('mouseout', function (event) {
			let targetId = event.target.id.split('+');

			if (targetId[0] === 'ave') {
				let item = _this.items[ targetId[1] ];
				if (item !== undefined
					&& item.events
					&& item.events.mouseout
				) {
					item.events.mouseout();
				}
			}
		});
		this.element.addEventListener('mousedown', function (event) {
			let targetId = event.target.id.split('+');

			if (targetId[0] === 'ave') {
				let item = _this.items[ targetId[1] ];
				if (item !== undefined
					&& item.events
					&& item.events.mousedown
				) {
					item.events.mousedown();
				}
			}
		});

		this.element.addEventListener('touchend', function (event) {
			let targetId = event.target.id.split('+');

			if (targetId[0] === 'ave') {
				let item = _this.items[ targetId[1] ];
				if (item !== undefined
					&& item.events
					&& item.events.touchend
				) {
					item.events.touchend();
				}
			}
		}, false);
    }

    constructor(param) {
        if (!param) {
            console.error('param is undefined.');
            return;
        }

        this.width = param.width;
        this.height = param.height;


        if (param.id !== undefined) {
            this._initScene(param);
        } else {
            this._createScene(param);
        }

		this.animator = new ave.Animator({
			scene: this,
			active: true
		});

        this._initItemsController();

		this.prefabs = new ave.Prefabs({
			scene: this
		});

        this._createWorld(param);

        this._initEvent(param);

		window.onresize = this.reSize;
		setTimeout(this.reSize, 0);
    }

    hierarchy() {
        let list = {};

        let sort = function (item, branch) {
            if (item.children.length === 0) return;

            item.children.forEach((child) => {
                let name = ave.chooseName(child.name, branch);

                if (child.type === ave.config.type.GROUP) {
                    branch[name] = {};
                    sort(child, branch[name]);
                } else {
                    branch[name] = child;
                }
            });
        }

        sort(this.world, list);

        return list;
    }

	reSize() {
		let parent = scene.element.parentNode;
		let procWidth = scene.width*100/parent.clientWidth;
		let procHeight = scene.height*100/parent.clientHeight;

		var y_bgProc = scene.height*100/scene.width;

		if (procWidth < procHeight) {
			scene.element.setAttributeNS(null, 'height', parent.clientHeight);
			scene.element.setAttributeNS(null, 'width', parent.clientHeight*100/y_bgProc);
		} else {
			scene.element.setAttributeNS(null, 'width', parent.clientWidth);
			scene.element.setAttributeNS(null, 'height', y_bgProc*parent.clientWidth/100);
		}
	}

	__appendChild(child) {
		this.world.element.appendChild(child.element);
	}

    createGraphicGroup(param = {}) {
        let newGroup = ave.interface.createGraphicGroup(this, param);
        this.world.addChild(newGroup);
        return newGroup;
    }

    createGraphic(param = {}) {
        let newGraphic = ave.interface.createGraphic(this, param);
        this.world.addChild(newGraphic);
        return newGraphic;
    }

    createCircle(param = {}) {
        let newCircle = ave.interface.createCircle(this, param);
        this.world.addChild(newCircle);
        return newCircle;
    }

    createRect(param = {}) {
        let newRect = ave.interface.createRect(this, param);
        this.world.addChild(newRect);
        return newRect;
    }

    createText(param = {}) {
        let newText = ave.interface.createText(this, param);
        this.world.addChild(newText);
        return newText;
    }

    createImage(param = {}) {
        let newImage = ave.interface.createImage(this, param);
        this.world.addChild(newImage);
        return newImage;
    }

    createSpriteSheet(param = {}) {
        let newSpriteSheet = ave.interface.createSpriteSheet(this, param);
        this.world.addChild(newSpriteSheet);
        return newSpriteSheet;
    }

    createForeignObject(param = {}) {
        let newForeignObject = ave.interface.createForeignObject(this, param);
        this.world.addChild(newForeignObject);
        return newForeignObject;
    }

    createGradient(param = {}) {
        let newGradient = new ave.Gradient({
            scene: this,
			type: param.type,
			colors: param.colors
        });;
        this.prefabs.add(newGradient);
        return newGradient;
    }

    createFilter(param = {}) {
        let newFilter = new ave.Filter({
            scene: this,
			type: param.type,
			spread: param.spread
        });;
        this.prefabs.add(newFilter);
        return newFilter;
    }
}


})();
