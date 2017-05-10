var grnch, $;
(function () {
"use strict";
	$ = key=>{return document.querySelectorAll(key);};

	grnch = {
	    svgns: 'http://www.w3.org/2000/svg',
	    xlink: 'http://www.w3.org/1999/xlink',

		isTouchDevice: !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),

	    _checkAttr: function (param, attr, check, msg) {
	        if (Array.isArray(attr)) {
	            if (!attr.some(function(item) {
	                return check(param, item);
	            }) ) {
	                console.error('CheckParam', msg);
	                return false;
	            }
	        } else
	        if (!check(param, attr)) {
	            console.error('CheckParam', msg);
	            return false;
	        }
	        return true;
	    },
	    checkParam: function(param, check, errorMsg) {
	        if (typeof param !== 'object') {
	            console.error('CheckParam: param is undefined.', errorMsg, param);
	            return false;
	        }
	        for (let paramKey in check) {
	            if (param[paramKey] === undefined) {
	                console.error('CheckParam: '+paramKey+' is undefined.', errorMsg, param);
	                return false;
	            }
	            for (let attrKey in check[paramKey]) {
	                let isCheck;
	                switch (attrKey) {
	                    case 'class':
	                        isCheck = this._checkAttr(param[paramKey], check[paramKey].class, (_instance, _class) => {
	                            if (_instance instanceof _class) return true;
	                            else return false;
	                        }, { error: '('+paramKey+') class is incorrect.', msg: errorMsg, param});
	                        if (!isCheck) return false;
	                        break;
	                    case 'type':
	                        isCheck = this._checkAttr(param[paramKey], check[paramKey].type, (_param, _check) => {
	                            if (typeof(_param) === _check.toLowerCase()) return true;
	                            else return false;
	                        }, { error: '('+paramKey+') type ('+check[paramKey].type+') is incorrect.', msg: errorMsg, param});
	                        if (!isCheck) return false;
	                        break;
	                    case 'isArray':
	                        isCheck = this._checkAttr(param[paramKey], check[paramKey].isArray, (_param, _check) => {
	                            if (Array.isArray(_param) === _check) return true;
	                            else return false;
	                        }, { error: '('+paramKey+') type is '+( (check[paramKey].isArray)? 'not ': '')+'array.', msg: errorMsg, param});
	                        if (!isCheck) return false;
	                        break;
	                    case 'value':
	                        isCheck = this._checkAttr(param[paramKey], check[paramKey].value, (_param, _check) => {
	                            if (_param === _check) return true;
	                            else return false;
	                        }, { error: '('+paramKey+') value is incorrect.', msg: errorMsg, param});
	                        if (!isCheck) return false;
	                        break;
	                    case 'attr':
	                        for (let attrObjKey in check[paramKey].attr) {
	                            if (!param[paramKey][attrObjKey]) {
	                                console.error('CheckParam: attribute ('+attrObjKey+') in ('+paramKey+') is undefined.', errorMsg, param);
	                                return false;
	                            }
	                            isCheck = this._checkAttr(param[paramKey][attrObjKey], check[paramKey].attr[attrObjKey], (_param, _check) => {
	                                if (_param === _check) return true;
	                                else return false;
	                            }, { error: 'attribute ('+attrObjKey+') in ('+paramKey+') is incorrect.', msg: errorMsg, param});
	                            if (!isCheck) return false;
	                        }
	                        break;
	                }
	            }
	        }
	        return true;
	    }
	};

	(function () {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}
		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); },
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	})();


})();
