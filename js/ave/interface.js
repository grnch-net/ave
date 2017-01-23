(function () {
"use strict";

ave.interface = {

    createGraphicGroup: function (scene, param = {}) {
        if (typeof(param.position) !== 'object' )
            param.position = {};
		if (typeof(param.scale) !== 'object' )
			param.scale = {};

        let newGroup = new ave.GraphicGroup({
            scene: scene,
			active: param.active,
            name: param.name,
            position: {
                x: param.position.x,
                y: param.position.y
            },
			scale: {
				x: param.scale.x,
                y: param.scale.y
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
		if (typeof(param.scale) !== 'object' )
			param.scale = {};

        let newGraphic = new ave.Graphic({
            scene: scene,
			active: param.active,
            name: param.name,
            path: param.path,
            position: {
                x: param.position.x,
                y: param.position.y
            },
			scale: {
				x: param.scale.x,
                y: param.scale.y
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
		if (typeof(param.scale) !== 'object' )
			param.scale = {};

        let newGraphic = new ave.Circle({
            scene: scene,
			active: param.active,
            name: param.name,
            radius: param.radius,
            position: {
                x: param.position.x,
                y: param.position.y
            },
			scale: {
				x: param.scale.x,
                y: param.scale.y
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
        if (typeof(param.scale) !== 'object' )
            param.scale = {};
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
			scale: {
				x: param.scale.x,
                y: param.scale.y
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
		if (typeof(param.scale) !== 'object' )
			param.scale = {};

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
			scale: {
				x: param.scale.x,
                y: param.scale.y
			},
			opacity: param.opacity,
			html: param.html
        });

        return newForeignObject;
    },

    createText(scene, param = {}) {
        if (typeof(param.position) !== 'object' )
            param.position = {};
		if (typeof(param.scale) !== 'object' )
			param.scale = {};

        let newText = new ave.Text({
            scene: scene,
			active: param.active,
            name: param.name,
            position: {
                x: param.position.x,
                y: param.position.y
            },
			scale: {
				x: param.scale.x,
                y: param.scale.y
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
		if (typeof(param.scale) !== 'object' )
			param.scale = {};

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
			scale: {
				x: param.scale.x,
                y: param.scale.y
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
		if (typeof(param.scale) !== 'object' )
			param.scale = {};

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
			scale: {
				x: param.scale.x,
                y: param.scale.y
			},
			size: {
				width: param.size.width,
				height: param.size.height
			},
			opacity: param.opacity
        });

        return newImage;
    },

};


})();
