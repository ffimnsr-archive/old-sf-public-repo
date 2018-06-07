import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';

import HelloWorld from './HelloWorld';

export default class App extends WidgetBase {
  protected render() {
    return v('div', { id: 'wrapper' }, [ w(HelloWorld, {}) ]);
  }
}
