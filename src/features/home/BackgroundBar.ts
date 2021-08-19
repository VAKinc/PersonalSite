/**
 * @param {number} height - The height of the bar
 * @param {number} length - The length of the bar
 * @param {string} color - The hex color of the bar
 * @param {boolean} forward - The direction the bar is currently oscillating
 * @param {number} frame - The initial frame of the animation
 */

export default class BackgroundBar {
	height: number;
	length: number;
	starting_pos: number;
	color: string;
	forward: boolean;
	range: number;
	frame: number;
	row: number;

	constructor(
		height: number,
		length: number,
		color: string,
		forward: boolean,
		range: number,
		frame: number,
		row: number
	) {
		this.height = height;
		this.length = length;
		this.starting_pos = length;
		this.color = color;
		this.forward = forward;
		this.range = range;
		this.frame = frame;
		this.row = row;
	}

	oscillate() {
		var start = this.starting_pos - this.range;
		var dist = this.range * 2;
		this.length = this.ease(this.frame, start, dist);

		if (this.forward === true) {
			if (this.frame >= 255) {
				this.forward = false;
				this.frame--;
			} else {
				this.frame++;
			}
		} else {
			if (this.frame <= 1) {
				this.forward = true;
				this.frame++;
			} else {
				this.frame--;
			}
		}
	}

	ease(currentProgress: number, start: number, dist: number) {
		let x = currentProgress / 255;
		let easeAmount = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
		return dist * easeAmount + start;
	}

	shadeColor(color: string, percent: number) {
		var R = parseInt(color.substring(1, 3), 16);
		var G = parseInt(color.substring(3, 5), 16);
		var B = parseInt(color.substring(5, 7), 16);

		R = (R * (100 + percent)) / 100;
		G = (G * (100 + percent)) / 100;
		B = (B * (100 + percent)) / 100;

		R = R < 255 ? R : 255;
		G = G < 255 ? G : 255;
		B = B < 255 ? B : 255;

		var RR =
			R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
		var GG =
			G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
		var BB =
			B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

		return `#${RR}${GG}${BB}`;
	}
}
