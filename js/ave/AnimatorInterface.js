(function () {
"use strict";

	if (ave.interface === undefined) {
		console.error('Need "ave.interface" module!');
		return;
	}

	ave.interface.animator = class {
		/*	param: {
				time: number, (milisec)
				*process: function(progress) {},
				*callback: function() {},
				*delay: number (milisec)
			}	*/
		add(param) {
			if (!grnch.checkParam(param, {
				time: {
					type: 'number'
				}
			}, 'grnch.animator.AddAnim') ) {
				return;
			}

			let newAnimation = {
				type: ave.config.animator.type.ANIMATION,
				time: 0,
				timeLength: param.time,
				active: true,
				delay: 0
			};

			if (typeof(param.delay) === 'number')
				newAnimation.delay = param.delay;

			if (typeof(param.active) === 'boolean')
				newAnimation.active = param.active;

			if (typeof(param.process) === 'function')
				newAnimation.process = param.process;

			if (typeof(param.callback) === 'function')
				newAnimation.callback = param.callback;

			if (newAnimation.process === undefined
				&& newAnimation.callback === undefined
			) return;

			this._stack.push(newAnimation);

			return newAnimation;
		}

		/*	index: string,
			isCallback: boolean,
			*index: number	*/
		remove(anim, isCallback, index) {
			if (index === undefined)
				index = this._stack.indexOf(anim);

			if (typeof(index) !== 'number'
				|| index >= this._stack.length
				|| index < 0
			) return;

			this._stack.splice(index, 1)[0];

			if (isCallback && anim.callback)
				anim.callback();
		}


		/*	group: ave.AnimateGroup	*/
		addGroup(group) {
			if (!grnch.checkParam({ group }, {
				group: {
					class: ave.AnimateGroup
				}
			}, 'grnch.animator.AddAnim') ) {
				return;
			}

			this._stack.push(group);

			return group;
		}

		// TODO: test removeGroup
		/*	group: ave.AnimateGroup	*/
		removeGroup(group) {
			if (!grnch.checkParam({ group }, {
				group: {
					class: ave.AnimateGroup
				}
			}, 'grnch.animator.AddAnim') ) {
				return;
			}

			let index = this._stack.indexOf(group);

			if (index > -1)
				return this._stack.splice(index, 1);
		}

		createGroup(param = {}) {
			let group =  new ave.AnimateGroup({
				active: param.active
			});

			return this.addGroup(group);
		}

		timeout(callback, time, active) {
			if (!grnch.checkParam({ callback, time, active }, {
				callback: {
					type: 'function'
				},
				time: {
					type: 'number'
				}
			}, 'grnch.animator.AddAnim') ) {
				return;
			}

			return this.add({
				time,
				callback,
				active
			});

		}
	}


})();
