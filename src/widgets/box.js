import wrapText from 'wrap-text';

export class Box {
	constructor(ui) {
		this.ixel = ui.ixel;

		this._text = '';
		this.px = 0;
		this.py = 0;
	}

	dimensions(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		return this
	}

	text(text) {
		this._text = text;
		return this;
	}

	pad(px = 0, py = 0) {
		this.px = px; this.py = py;
		return this;
	}

	draw() {
		this.drawLine(this.x, this.y, '┌', '─', '┐');

		for (let i = 1; i < this.height - 1; i++) {
			this.drawLine(this.x, this.y + i, '│', ' ', '│');
		}

		this.drawLine(this.x, this.y + this.height - 1, '└', '─', '┘');

		const wrapWidth = this.width - 3 - (this.px * 2);
		const textLines = wrapText(this._text, wrapWidth)
			.split('\n')
			.slice(0, this.height - 2 - (this.py * 2));
		// TODO: looong words handling

		for (let i = 0; i < textLines.length; i++) {
			const line = textLines[i];
			for (let j = 0; j < line.length; j++) {
				this.ixel.setPixel(this.x + this.px + 1 + j, this.y + this.py + i + 1, line[j]);
			}
		}

		return this;
	}

	drawLine(x, y, left, middle, right) {
		this.ixel.setPixel(x, y, left);
		for (let i = 1; i < this.width - 1; i++) {
			this.ixel.setPixel(x + i, y, middle);
		}
		this.ixel.setPixel(x + this.width - 1, y, right);

		return this;
	}
}
