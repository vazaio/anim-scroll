import haveCssRules from './haveCssRules';
import { OptionsError } from '../errors';

const toCamelCase = str => str.replace(/-[a-z]/g, m => m[1].toUpperCase());

export default name => {
	const style = haveCssRules(name);
	let styleObj = {};
	let str = '';
	let wkStr = '';

	if (!style) throw new OptionsError(`Element [${name}] not found`);

	for (let index = 0; index < Object.keys(style).length; index += 1) {
		if (!style[index]) break;

		str = style[index];
		str = toCamelCase(str);
		wkStr = `webkit${str[0].toUpperCase()}${str.slice(1)}`;

		if (str.indexOf('transition') !== -1) continue;
		if (style[wkStr]) styleObj = Object.assign({ [wkStr]: style[wkStr] }, styleObj);
		styleObj = Object.assign({ [str]: style[str] }, styleObj);
	}

	styleObj = Object.assign({
		transition: style.transition,
		webkitTransition: style.webkitTransition,
	}, styleObj);

	return styleObj;
};
