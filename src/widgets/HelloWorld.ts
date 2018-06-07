import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';

import * as css from './styles/helloWorld.m.css';
const logo = require('./../img/logo.svg');

export class HelloWorld extends WidgetBase {
	protected render() {
		return v('div', { classes: css.root }, [
			v('img', { src: logo, classes: css.logo }),
			v('div', { classes: css.label }, ['Hello, Dojo 2 World!'])
		]);
	}
}

export default HelloWorld;
