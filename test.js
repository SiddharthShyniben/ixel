import {Widgets, Ixel, UI} from './src/index.js';

const ixel = new Ixel();

const ui = new UI(ixel);
const box = new Widgets.Box(ui)
	.dimensions(0, 0, 40, 20)
	.text(`test`)
	.pad(1, 1);

ui.addWidget(box);
ui.render()

ixel.key('k', () => {
	box._text += 'a';
	ui.render()
})
