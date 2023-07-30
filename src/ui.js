export class UI {
	constructor(ixel) {
		this.ixel = ixel;
		this.widgets = [];
	}

	addWidget(widget) {
		this.widgets.push(widget);
	}

	render() {
		for (const widget of this.widgets) {
			widget.draw();
		}

		this.ixel.render();
	}
}
