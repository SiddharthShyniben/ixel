export class UI {
	constructor(ixel) {
		this.ixel = ixel;
		this.widgets = [];
	}

	addWidget(widget) {
		this.widgets.push(widget);
	}

	render() {
		this.widgets.forEach(widget => {
			widget.draw();
		});

		this.ixel.render();
	}
}
