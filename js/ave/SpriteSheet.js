(function () {
"use strict";

ave.SpriteSheet = class extends ave.Image {

	_initFrameRate(param) {
		this._frameRate = ave.config.spriteSheet.frameRate;
        Object.defineProperty(this, "frameRate", {
            get: function () {
                return this._frameRate;
            },
            set: function (val) {
                if (typeof(val) !== 'number') return;

                this._frameRate = val;
            }
        });

		this.frameRate = param.frameRate;
	}

	_initCurrentFrame(param) {
		this._currentFrame = 0;
        Object.defineProperty(this, "currentFrame", {
            get: function () {
                return this._currentFrame;
            },
            set: function (val) {
                if (typeof(val) !== 'number'
					|| val === this._currentFrame
					|| val >= this.hrefs.length
				) return;

				this.href = this.hrefs[val];
                this._currentFrame = val;
            }
        });

		if (typeof(param.currentFrame) === 'number'
			&& param.currentFrame < this.hrefs.length
		) {
			this._currentFrame = param.currentFrame;
		}
	}

	constructor(param) {
        if (!grnch.checkParam(param, {
            scene: {
                class: ave.Scene
            },
			hrefs: {
				isArray: true
			}
        }, 'ave.SpriteSheet: cunstructor') ) {
            return;
        }

		param.href = param.hrefs[param.currentFrame || 0];
		super(param);

		this.name = param.name || 'newSpriteSheet';

		this._initFrameRate(param);
		this._initCurrentFrame(param);

		this.hrefs = param.hrefs;
		this._isAnim = false;
    }

	get isAnim() {
		return this._isAnim;
	}

	/* 	param: {
			*isRepeat: boolean,
			*startFrame: number,
			*animator: ave.AnimateGroup
		}	*/
	play(param = {}) {
		if (this.isAnim) return;
		this._isAnim = true;

		let _this = this;

		let startFrame;
		if (typeof(param.startFrame) === 'number')
			startFrame = param.startFrame % this.hrefs.length;
		else
			startFrame = this.currentFrame;

		let step = 1000 / this.frameRate;
		let time = step * (this.hrefs.length - startFrame);

		let animParam = {
			time,
			process: function(progress) {
				if (progress === 1) return;
				let newFrame = Math.floor(time * progress / step) + startFrame;
				_this.currentFrame = newFrame;
			},
			callback: function() {
				_this._isAnim = false;
				if (param.isRepeat)
					_this.play({
						isRepeat: true,
						startFrame: 0,
						animator: param.animator
					})
			}
		};

		if (param.animator instanceof ave.AnimateGroup)
			param.animator.add(animParam);
		else
			this.scene.animator.add(animParam)

		// grnch.addAnim({
		// 	key: this.id,
		// 	time,
		// 	process: function(progress) {
		// 		if (progress === 1) return;
		// 		let newFrame = Math.floor(time * progress / step) + startFrame;
		// 		_this.currentFrame = newFrame;
		// 	},
		// 	callback: function() {
		// 		_this._isAnim = false;
		// 		if (param.isRepeat)
		// 			_this.play({
		// 				isRepeat: true,
		// 				startFrame: 0
		// 			})
		// 	}
		// });
	}

	pause() {
		if (!this.isAnim) return;
		this._isAnim = false;

		grnch.removeAnim({
			key: this.id
		});
	}

	stop() {
		if (!this.isAnim) return;
		this._isAnim = false;

		grnch.removeAnim({
			key: this.id
		});
		this.currentFrame = 0;
	}

}


})();
