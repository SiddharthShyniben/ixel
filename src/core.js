import readline from 'node:readline';

export class Ixel {
	constructor() {
		this.screen = [];
		this._screen = [];
		this.keyBindings = {};
		this.cols = process.stdout.columns;
		this.rows = process.stdout.rows;

		this.initializeScreen();
		this.initTerminal();
	}

	initializeScreen() {
		for (let row = 0; row < this.rows; row++) {
			this.screen.push(Array(this.cols).fill(' '));
		}
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
		if (x >= 0 && y >= 0) {
			if (y >= this.rows) {
				this.resizeScreen(y + 1, this.cols);
			}
			if (x >= this.cols) {
				this.resizeScreen(this.rows, x + 1);
			}
			this.screen[y][x] = value[0];
		}
	}

	resizeScreen(rows, cols) {
		if (rows <= this.rows && cols <= this.cols) return;

		while (this.screen.length < rows) {
			this.screen.push(Array(this.cols).fill(' '));
		}

		for (let row of this.screen) {
			while (row.length < cols) {
				row.push(' ');
			}
		}
	}

	render() {
		this.cols = process.stdout.columns;
		this.rows = process.stdout.rows;
		process.stdout.write('\x1BP=1s\x1B\\');

		process.stdout.write(`\x1B[H`);
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				const value = this.screen[row]?.[col] ?? ' ';

				// if (this._screen[row]?.[col] === value) return;
				// ????????????
				process.stdout.write(value);

			}
			if (row + 1 !== this.rows) process.stdout.write('\n');
		}

		this._screen = JSON.parse(JSON.stringify(this.screen));
		process.stdout.write('\x1BP=2s\x1B\\');
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

	clear() {
		process.stdout.write('\x1B[2J');
	}

	key(k, fn) {
		this.keyBindings[k] = fn;
	}
}
