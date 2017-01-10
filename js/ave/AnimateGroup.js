(function () {
"use strict";

	if (ave.Animator === undefined) {
		console.error('Need "ave.Animator" module!');
		return;
	}

	ave.AnimateGroup = class extends ave.interface.animator {

		/*	param: {
				active: boolean
			}	*/
		constructor(param) {
			super();

			this.type = ave.config.animator.type.GROUP;
			this._stack = [];
			this.time = 0;

			this._active = (typeof(param.active) === 'boolean')? param.active : ave.config.animator.active;
		}

		get active() {
			return this._active;
		}
		set active(val) {
			if (typeof(val) !== 'boolean') return;
			if (val === this._active) return

			this._active = val;
		}

		update(frameTime) {
			for (let index = this._stack.length -1; index > -1; index--) {
				let anim = this._stack[index];

				if (!anim.active)
					return;

				switch (anim.type) {
					case ave.config.animator.type.ANIMATION:
						if (anim.delay > 0) {
							anim.delay -= frameTime;
							break;
						}

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
		}

	}


})();
