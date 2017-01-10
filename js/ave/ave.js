var ave;
(function () {
"use strict";

ave = {
    config: {
        type: {
            WORLD: 0,
            GROUP: 1,
            GRAPHIC: 2,
			FILTER: 3,
			SPRITESHEET: 4,
			GRADIENT: 5
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
