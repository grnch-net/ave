(function () {
"use strict";

	ave.Animator = class extends ave.AnimatorInterface {

		/*	param: {
				scene: ave.Scene,
				active: boolean
			}	*/
		constructor(param) {
			super();

			this._lastTime = performance.now();

			this._active = (typeof(param.active) === 'boolean')? param.active : ave.config.animator.active;

			if (param.scene instanceof ave.Scene)
				this.element = param.scene.element;

			window.requestAnimationFrame(this.update.bind(this), this.element);
		}

		get active() {
			return this._active;
		}
		set active(val) {
			if (typeof(val) !== 'boolean') return;
			if (val === this._active) return

			if (val === true) {
				this._lastTime = performance.now();
				window.requestAnimationFrame(this.update.bind(this), this.element);
			}

			this._active = val;
		}

		update(nowTime) {
			if (!this.active) return;

			// console.log( 1000 / (nowTime - this._lastTime) );
			let frameTime = nowTime - this._lastTime;
			this._lastTime = nowTime;

			for (let index = this._stack.length -1; index > -1; index--) {
				let anim = this._stack[index];

				if (!anim.active)
					continue;


				switch (anim.type) {
					case ave.config.animator.type.ANIMATION:
						anim.time += frameTime;

						let progress = anim.time / anim.timeLength;

						if (progress > 1)
						progress = 1;

						if (anim.process)
						anim.process(progress);

						if (progress === 1)
						this.remove(anim, true, index);
						break;
					case ave.config.animator.type.GROUP:
						anim.update(frameTime);
						break;
				}

			}

			window.requestAnimationFrame(this.update.bind(this), this.element);
		}

	};


})();
