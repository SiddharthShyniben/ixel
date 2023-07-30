import Ixel from './src/index.js';

const ixel = new Ixel();
ixel.key('l', () => {
	ixel.setPixel(~~(Math.random() * ixel.cols), ~~(Math.random() * ixel.rows), 'a')
	ixel.render();
})
