var dom;

(function () {
"use strict";

dom = {
    create: function (param) {
        let htmlElement;
        let isSVG = false;

        if (param.type === undefined) {
            htmlElement = document.createElement('div');
        } else {
			let _type = param.type.toLowerCase();
            switch (_type) {
	            case 'svg':
	            case 'defs':
	            case 'g':
	            case 'path':
	            case 'circle':
	            case 'rect':
	            case 'text':
				case 'filter':
				case 'image':
				case 'lineargradient':
				case 'radialgradient':
				case 'stop':
				case 'filter':
				case 'fegaussianblur':
				case 'foreignobject':
	                isSVG = true;
	                htmlElement = document.createElementNS(grnch.svgns, param.type);
	                break;
	            default:
	                htmlElement = document.createElement(param.type);
	                break;
            }
        }

        for(let key in param) {
            if (param[key] === undefined) continue;

            switch (key) {
                case 'type':
                    break;
                case 'innerHTML':
					htmlElement.innerHTML = param[key];
                    break;
                case 'parent':
                    if (param.parent.appendChild) {
                        param.parent.appendChild(htmlElement);
                    }
                    break;
                case 'href':
                    htmlElement.setAttributeNS(grnch.xlink, key, param[key]);
                    break;
                default:
                	htmlElement.setAttribute(key, param[key]);
            }
        }

        return htmlElement;
    }
};


})();
