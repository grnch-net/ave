var ave;
(function () {
"use strict";

ave = {
    config: {
        type: {
			SCENEOBJECT: 0,
            WORLD: 1,
            GROUP: 2,
            GRAPHIC: 3,
			FILTER: 4,
			SPRITESHEET: 5,
			GRADIENT: 6
        },
		spriteSheet: {
			frameRate: 15
		},
		filter: {
			type: {
				BLUR: 0
			}
		},
		gradient: {
			type: {
				LINEAR: 0,
				RADIAL: 1
			}
		},
		animator: {
			type: {
				GROUP: 0,
				ANIMATION: 1
			},
			active: true
		},
		circle: {
			radius: 10
		}
    },

    chooseName: function (name, obj) {
        if (obj[name] === undefined) return name;

        let ind = 2;
        while (obj[name+ind] !== undefined) {
            ind++;
        }

        return name+ind;
    }
};


})();
