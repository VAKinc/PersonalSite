import React from 'react';

import seedrandom from 'seedrandom';

var animationRequest = null;

export default class SineBackground extends React.Component {
    constructor(props) {
        super(props);

        this.scaleCanvasToWindowSize = this.scaleCanvasToWindowSize.bind(this);
        this.genWave = this.genWave.bind(this);
        this.drawCanvas = this.drawCanvas.bind(this);

        this.wave_bar_size = 30;

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
            wave_bars: null,
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

        this.genWave();
        animationRequest = window.requestAnimationFrame(() => this.drawCanvas(cvs));
    }

    componentWillUnmount(){
        this.setState({
            animating: false
        })

        window.removeEventListener('resize', this.scaleCanvasToWindowSize)
        window.cancelAnimationFrame(animationRequest);
    }

    scaleCanvasToWindowSize() {
        let cvs = this.state.canvas;
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;

        this.genWave();
    }

    genWave() {
        seedrandom(this.state.seed, { global: true })
        
        const wave_bars = [];
        const colors = this.state.colorOptions;

        let x_increments = this.wave_bar_size;
        let x_padding = 5;
        let initial_frame = 127;
        let frame_padding = 5;
        let prevColor = null;

        for (var i = x_padding / 2; i < window.innerWidth + x_increments; i = i + x_increments + x_padding) {
            var color = colors[Math.floor(Math.random() * 5)];
            while(color === prevColor){
                color = colors[Math.floor(Math.random() * 5)];
            }
            prevColor = color;

            var wave_bar = new BackgroundWaveBar(i, initial_frame, color);

            // if(initial_frame + frame_padding > 127){
            //     initial_frame = 0;
            // }
            initial_frame += frame_padding;
            
            wave_bars.push(wave_bar);
        }

        this.setState({
            wave_bars: wave_bars
        });
    }

    /**
     * @param {Canvas} canvas - The canvas to be drawn on
     */
    drawCanvas(canvas) {
        if (this.state.animating) {
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const wave_bars = this.state.wave_bars;
            const wave_bar_size = this.wave_bar_size;
    
            wave_bars.forEach(function (wave_bar) {
                wave_bar.oscillate();
                let height =  wave_bar.height;
                ctx.fillStyle = wave_bar.color;
                ctx.beginPath();
                ctx.moveTo(wave_bar.x, canvas.height);
                ctx.lineTo(wave_bar.x + wave_bar_size, canvas.height);
                ctx.lineTo(wave_bar.x + wave_bar_size, height);
                ctx.lineTo(wave_bar.x, height);
                ctx.fill();
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
 * @param {number} x - The x position of the dot
 * @param {number} frame - The initial frame of the wave animation
 * @param {string} color - The color of the bar
 */

 class BackgroundWaveBar {
    constructor(x,frame, color) {
        this.x = x;
        this.height = null;
        this.frame = frame;
        this.color = color;
        this.upward = true;
    }

    oscillate() {
        var start = window.innerHeight * 0.25;
        var dist = start * 2;
        this.height = this.ease(this.frame, start, dist);

        // This is totally unnecessary but it keeps the frame number within a range instead of inflating infinitely.
        if (this.upward === true) {
            if (this.frame >= 127) {
                this.upward= false;
                this.frame--;
            }
            else {
                this.frame++;
            }
        }
        else {
            if (this.frame <= 0) {
                this.upward = true;
                this.frame++;
            }
            else {
                this.frame--;
            }
        }

    }

    ease(currentProgress, start, dist) {
        let x = currentProgress / 127;
        let easeAmount = -(Math.cos(Math.PI * x) - 1) / 2;
        return (dist * easeAmount) + start;
    }
}
