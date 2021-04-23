import React from 'react';

import seedrandom from 'seedrandom';

var animationRequest = null;

export default class BarsBackground extends React.Component {
    constructor(props) {
        super(props);

        this.scaleCanvasToWindowSize = this.scaleCanvasToWindowSize.bind(this);
        // this.drawCanvas = this.drawCanvas.bind(this);

        this.state = {
            canvas: null,
            colorOptions: [
                "#19D1FF",
                "#FFDD00",
                "#FF01D3",
                "#FF2075",
                "#303030"
                // "#FFFFFF",
                // "#BFBFBF",
                // "#808080",
                // "#404040",
                // "#E6021D"
            ],
            seed: "gravityrushisacoolgame",
            bars: [],
            increments: 6,
            animating: false,
        };
    }

    componentDidMount() {
        const cvs = document.getElementById("bgCanvas");
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;

        this.setState({
            canvas: cvs,
            animating: true
        });

        window.addEventListener('resize', this.scaleCanvasToWindowSize)

        this.genBars();
        animationRequest = window.requestAnimationFrame(() => this.drawCanvas(cvs));
    }

    componentWillUnmount(){
        this.setState({
            bars: [],
            animating: false
        })

        window.removeEventListener('resize', this.scaleCanvasToWindowSize)
        window.cancelAnimationFrame(animationRequest);
    }

    scaleCanvasToWindowSize() {
        let cvs = this.state.canvas;
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;

        this.genBars();
    }

    genBars() {
        seedrandom(this.state.seed, { global: true })

        const bars = [];
        const colors = this.state.colorOptions;

        var increments = this.state.increments;
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
                }
                else {
                    if(window.innerWidth < 992){
                        range = Math.floor(Math.random() * 10) * 10;
                    }
                    else{
                        range = Math.floor(Math.random() * 15) * 10 + 50;
                    }
                    frame = Math.floor(Math.random() * 100)
                    if (dir) {
                        length = Math.floor(window_thirds * x) - length_offset;
                    }
                    else {
                        length = Math.floor(window_thirds * x) + length_offset;
                    }
                }

                var bar = new BackgroundBar(height, length, color, dir, range, frame, x);
                bars.push(bar);

                prevColor = color;
                i = i + height + 1;
            }
        }


        this.setState({
            bars: bars
        });
    }

    /**
     * @param {Canvas} canvas - The canvas to be drawn on
     */
    drawCanvas(canvas) {
        if (this.state.animating) {
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const bars = this.state.bars;
            const diamond_width = 25;
            const odd_row_offset = 50;
            const increments = this.state.increments;

            var i = 0;
            var cur_row = null;
            bars.forEach(function (bar) {
                if (cur_row !== bar.row) {
                    if (bar.row % 2 === 1) {
                        i = odd_row_offset;
                    }
                    else {
                        i = 0;
                    }

                    cur_row = bar.row;
                }

                if (bar.row !== increments) {
                    bar.oscillate();
                }

                var grd = ctx.createLinearGradient(0, i + Math.floor(bar.height / 2), 0, i + bar.height);
                grd.addColorStop(0, bar.color);
                grd.addColorStop(1, "black");

                // ctx.fillStyle = bar.color;
                // ctx.fillRect(0, i, bar.length, Math.floor(bar.height / 2));

                // ctx.fillStyle = grd;
                // ctx.fillRect(0, i + Math.floor(bar.height / 2), bar.length, Math.ceil(bar.height / 2));

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
                ctx.lineTo(bar.length - diamond_width, i + Math.floor(bar.height / 2));
                ctx.lineTo(bar.length, i + bar.height);
                ctx.lineTo(0, i + bar.height);
                ctx.fill();

                ctx.fillStyle = bar.shadeColor(bar.color, -10);
                ctx.beginPath();
                ctx.moveTo(bar.length - 1, i);
                ctx.lineTo(bar.length - diamond_width - 1, i + Math.floor(bar.height / 2));
                ctx.lineTo(bar.length - 1, i + bar.height);
                ctx.lineTo(bar.length + diamond_width, i + Math.floor(bar.height / 2));
                ctx.fill();

                i = i + bar.height;
            });

            animationRequest = window.requestAnimationFrame(() => this.drawCanvas(canvas));
        }
    }

    render() {
        return (
            <canvas id="bgCanvas"></canvas>
        );
    }
}

/**
     * @param {number} height - The height of the bar
     * @param {number} length - The length of the bar
     * @param {string} color - The hex color of the bar
     * @param {boolean} forward - The direction the bar is currently oscillating
     * @param {number} frame - The initial frame of the animation
     */
class BackgroundBar {
    constructor(height, length, color, forward, range, frame, row) {
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
            }
            else {
                this.frame++;
            }
        }
        else {
            if (this.frame <= 1) {
                this.forward = true;
                this.frame++;
            }
            else {
                this.frame--;
            }
        }

    }

    ease(currentProgress, start, dist) {
        let x = currentProgress / 255;
        let easeAmount = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        return (dist * easeAmount) + start;
    }

    shadeColor(color, percent) {

        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        var RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
        var GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
        var BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

        return "#" + RR + GG + BB;
    }
}