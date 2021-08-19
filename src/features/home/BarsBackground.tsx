import React, { useEffect, useState } from "react";
import seedrandom from "seedrandom";

import BackgroundBar from "./BackgroundBar";

const BarsBackground: React.FC = () => {
	const [canvas, setCanvas] = useState<HTMLCanvasElement>();
	const [bars, setBars] = useState<Array<BackgroundBar>>([]);
	const [isAnimating, setIsAnimating] = useState(false);
	const [animationRequest, setAnimationRequest] = useState<number>(0);

	const colorOptions = [
		"#19D1FF",
		"#FFDD00",
		"#FF01D3",
		"#FF2075",
		"#303030",
		// "#FFFFFF",
		// "#BFBFBF",
		// "#808080",
		// "#404040",
		// "#E6021D"
	];
	const seed = "gravityrushisacoolgame";
	const increments = 6;

	useEffect(() => {
		const cvs: HTMLElement | null = document.getElementById("bgCanvas");
		if (cvs && cvs instanceof HTMLCanvasElement) {
			setCanvas(cvs);
			setIsAnimating(true);

			window.addEventListener("resize", scaleCanvasToWindowSize);

			genBars();
			setAnimationRequest(window.requestAnimationFrame(() => drawCanvas()));
		}

		return () => {
			setBars([]);
			setIsAnimating(false);

			window.removeEventListener("resize", scaleCanvasToWindowSize);
			window.cancelAnimationFrame(animationRequest);
		};
	}, []);

	const scaleCanvasToWindowSize = () => {
		// let cvs = this.state.canvas;
		// cvs.width = window.innerWidth;
		// cvs.height = window.innerHeight;

		genBars();
	};

	const genBars = () => {
		seedrandom(seed, { global: true });

		const bars: Array<BackgroundBar> = [];
		const colors = colorOptions;

		var window_thirds = Math.floor(window.innerWidth / increments);
		var prevColor = null;
		var height = 100;

		for (var x = increments; x > 0; x--) {
			var i = 0;

			while (i < window.innerHeight + height) {
				var color = colors[Math.floor(Math.random() * 5)];

				while (color === prevColor) {
					color = colors[Math.floor(Math.random() * 5)];
				}

				let length_offset = Math.floor(Math.random() * 5) * 20;
				let dir = Math.random() < 0.5;

				let length;
				let range;
				let frame;
				if (x === 6) {
					range = 100;
					frame = 255;
					length = window.innerWidth + 30;
				} else {
					if (window.innerWidth < 992) {
						range = Math.floor(Math.random() * 10) * 10;
					} else {
						range = Math.floor(Math.random() * 15) * 10 + 50;
					}
					frame = Math.floor(Math.random() * 100);
					if (dir) {
						length = Math.floor(window_thirds * x) - length_offset;
					} else {
						length = Math.floor(window_thirds * x) + length_offset;
					}
				}

				var bar = new BackgroundBar(
					height,
					length,
					color,
					dir,
					range,
					frame,
					x
				);
				bars.push(bar);

				prevColor = color;
				i = i + height + 1;
			}
		}

		setBars(bars);
	};

	/**
	 * @param {Canvas} canvas - The canvas to be drawn on
	 */
	const drawCanvas = () => {
		if (isAnimating && canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				const diamond_width = 25;
				const odd_row_offset = 50;

				var i = 0;
				var cur_row: number;
				bars.forEach(function (bar: BackgroundBar) {
					if (cur_row !== bar.row) {
						if (bar.row % 2 === 1) {
							i = odd_row_offset;
						} else {
							i = 0;
						}

						cur_row = bar.row;
					}

					if (bar.row !== increments) {
						bar.oscillate();
					}

					ctx.fillStyle = bar.color;
					ctx.beginPath();
					ctx.moveTo(0, i);
					ctx.lineTo(bar.length, i);
					ctx.lineTo(bar.length - diamond_width, i + Math.ceil(bar.height / 2));
					ctx.lineTo(0, i + Math.ceil(bar.height / 2));
					ctx.fill();

					ctx.fillStyle = bar.shadeColor(bar.color, -25);
					ctx.beginPath();
					ctx.moveTo(0, i + Math.floor(bar.height / 2));
					ctx.lineTo(
						bar.length - diamond_width,
						i + Math.floor(bar.height / 2)
					);
					ctx.lineTo(bar.length, i + bar.height);
					ctx.lineTo(0, i + bar.height);
					ctx.fill();

					ctx.fillStyle = bar.shadeColor(bar.color, -10);
					ctx.beginPath();
					ctx.moveTo(bar.length - 1, i);
					ctx.lineTo(
						bar.length - diamond_width - 1,
						i + Math.floor(bar.height / 2)
					);
					ctx.lineTo(bar.length - 1, i + bar.height);
					ctx.lineTo(
						bar.length + diamond_width,
						i + Math.floor(bar.height / 2)
					);
					ctx.fill();

					i = i + bar.height;
				});

				setAnimationRequest(window.requestAnimationFrame(() => drawCanvas()));
			}
		}
	};

	return (
		<canvas
			id="bgCanvas"
			style={{ widows: window.innerWidth, height: window.innerHeight }}
		></canvas>
	);
};

export default BarsBackground;
