import readline from 'node:readline';

export default class Ixel {
	constructor() {
		this.changes = [];
		this.keyBindings = {};
		this.cols = process.stdout.columns;
		this.rows = process.stdout.rows;

		this.initTerminal();
	}

	initTerminal() {
		readline.emitKeypressEvents(process.stdin);
		process.stdin.setRawMode(true);
		process.stdin.on('keypress', (_, key) => {
			this.handleKeyPress(key);
		});

		process.stdout.write('\x1B[2J\x1B[?25l');
	}

	setPixel(x, y, value) {
		this.changes.push({x, y, value});
	}

	render() {
		this.cols = process.stdout.columns;
		this.rows = process.stdout.rows;

		for (const change of this.changes) {
			const {x, y, value} = change;
			if (x >= 0 && y >= 0) {
				if (y >= this.rows || x >= this.cols) return;
				process.stdout.write(`\x1B[${y + 1};${x + 1}H${value}`); // Move cursor and update pixel
			}
		}
	}

	handleKeyPress(key) {
		if (key.ctrl && key.name === 'c') {
			process.stdin.setRawMode(false);
			process.stdout.write('\x1B[H\x1B[2J\x1B[?25h');
			process.exit();
		}
		if (this.keyBindings[key.name]) {
			this.keyBindings[key.name]();
		}
	}

	key(k, fn) {
		this.keyBindings[k] = fn;
	}
}
