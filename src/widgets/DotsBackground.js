import React from 'react';
import interpolate from 'color-interpolate';
import seedrandom from 'seedrandom';

var global_mouse_x = null;
var global_mouse_y = null;
var animationRequest = null;

export default class DotsBackground extends React.Component {
    constructor(props) {
        super(props);

        this.scaleCanvasToWindowSize = this.scaleCanvasToWindowSize.bind(this);
        this.handleMouseMovement = this.handleMouseMovement.bind(this);

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
            dots: [],
            seed: "gravityrushisacoolgame",
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
        document.addEventListener('mousemove', this.handleMouseMovement);

        this.genDots();
        animationRequest = window.requestAnimationFrame(() => this.drawCanvas(cvs));
    }

    componentWillUnmount(){
        this.setState({
            dots: [],
            animating: false
        })

        const canvas = this.state.canvas;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        window.removeEventListener('resize', this.scaleCanvasToWindowSize)
        document.removeEventListener('mousemove', this.handleMouseMovement);

        window.cancelAnimationFrame(animationRequest);
    }

    scaleCanvasToWindowSize() {
        let cvs = this.state.canvas;
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;

        this.genDots();
    }


    handleMouseMovement(e) {
        global_mouse_x = e.pageX;
        global_mouse_y = e.pageY;
    }

    genDots() {
        seedrandom(this.state.seed, { global: true })
        
        const dots = [];
        const colors = this.state.colorOptions;

        let x_increments = 30;
        let y_increments = 30;

        for (var i = x_increments; i < window.innerWidth + x_increments; i = i + x_increments) {
            for (var n = y_increments; n < window.innerHeight + y_increments; n = n + y_increments) {
                var color = colors[Math.floor(Math.random() * 5)];
                var dot = new BackgroundDot(i, n, color);
                dots.push(dot);
            }
        }

        this.setState({
            dots: dots
        });
    }

    /**
     * @param {Canvas} canvas - The canvas to be drawn on
     */
    drawCanvas(canvas) {
        if(this.state.animating){

            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            const dots = this.state.dots;
    
            dots.forEach(function (dot) {
                dot.gravitate(global_mouse_x, global_mouse_y);
                if(dot.size > 0){
                    let colormap = interpolate(['black', dot.color]);
    
                    ctx.fillStyle = colormap(dot.frame / 10);
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
                    ctx.fill()
                }
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
 * @param {number} y - The y position of the dot
 * @param {number} color - The color of the dot that gets revealed as it grows
 */

class BackgroundDot {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.initial_x = x;
        this.initial_y = y;
        this.size = 1;
        this.frame = 0;
    }

    gravitate(mouse_x, mouse_y) {
        var dist = this.calcDist(mouse_x, mouse_y);
        var eased;

        if (dist < 250) {

          
            var desired_pos = this.getMidPoint(this.initial_x, this.initial_y, mouse_x, mouse_y, -25);

            eased = this.easePos(desired_pos[0], desired_pos[1])

            if (this.frame < 60) {
                this.frame++;
            }

            if(this.size < 10){
                this.size = this.size + 1;
            }
        }
        else {
            eased = this.easePosReturn()

            if (this.frame > 0) {
                this.frame--;
            }

            if(this.size > 1){
                this.size = this.size - 1;
            }
        }

        this.x = Math.floor(eased[0]);
        this.y = Math.floor(eased[1]);
    }

    calcDist(mouse_x, mouse_y) {
        return Math.abs(Math.sqrt(Math.pow(this.initial_x - mouse_x, 2) + Math.pow(this.initial_y - mouse_y, 2)));
    }

    calcCurDist(mouse_x, mouse_y) {
        return Math.abs(Math.sqrt(Math.pow(this.x - mouse_x, 2) + Math.pow(this.y - mouse_y, 2)));
    }

    getMidPoint(starting_x, starting_y, desired_x, desired_y, percentage){
        let new_x =  starting_x + (percentage / 100) * (desired_x - starting_x);
        let new_y =  starting_y + (percentage / 100) * (desired_y - starting_y);
        return [new_x, new_y];
    }

    easePos(desired_x, desired_y) {
        let new_x = this.initial_x + (desired_x - this.initial_x) * (this.frame / 60);
        let new_y = this.initial_y + (desired_y - this.initial_y) * (this.frame / 60);

        return [new_x, new_y];
    }

    easePosReturn() {
        let new_x = this.initial_x + (this.x - this.initial_x) * (this.frame / 60);
        let new_y = this.initial_y + (this.y - this.initial_y) * (this.frame / 60);

        return [new_x, new_y];
    }

}