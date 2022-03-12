const opts = {
    get lineColor() {
        return colorVariation({ r: 150, g: 150, b: 150 });
    },
    particleAmount: 30,
    defaultSpeed: 1,
    variantSpeed: 1,
    defaultRadius: 2,
    variantRadius: 2,
    linkRadius: 200,
    animationFrame: 0,
    canvasBody: '',
    drawArea: '',
};

let delay = 200,
    tid,
    rgb = opts.lineColor.match(/\d+/g),
    w,
    h,
    particles = 0;

export function runAnimatedDots(canvasID) {
    (opts.canvasBody = document.querySelector(`#${canvasID}`)),
        (opts.drawArea = opts.canvasBody.getContext('2d'));

    // change line color
    rgb = opts.lineColor.match(/\d+/g);

    resizeReset();

    setup();
}

let resizeReset = () => {
    w = opts.canvasBody.width = window.innerWidth;
    h = opts.canvasBody.height = window.innerHeight;
};

let drawCanvasBG = () => {
    let color = { r: 12, g: 9, b: 29 };

    opts.drawArea.fillStyle =
        'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
    opts.drawArea.fillRect(0, 0, w, h);
};

export const clearBG = () => {
    if (!particles) return;

    particles.splice(0);
    this.cancelAnimationFrame(opts.animationFrame);
    opts.drawArea.clearRect(0, 0, w, h);
}

let checkDistance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

/**
 * Provides some nice color variation
 * Accepts an rgba object
 * returns a modified rgba object or a rgba string if
 * true is passed in for argument 2
 *
 * @param color
 * @param returnString
 */
function colorVariation(color) {
    let r, g, b, a;
    const colorVari = 255;

    r = Math.round(Math.random() * colorVari - colorVari / 2 + color.r);
    g = Math.round(Math.random() * colorVari - colorVari / 2 + color.g);
    b = Math.round(Math.random() * colorVari - colorVari / 2 + color.b);
    a = Math.random() + 0.5;

    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

let linkPoints = function (point1, hubs) {
    for (let i = 0; i < hubs.length; i++) {
        let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
        let opacity = 1 - distance / opts.linkRadius;
        if (opacity > 0) {
            opts.drawArea.lineWidth = 0.5;
            opts.drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
            opts.drawArea.beginPath();
            opts.drawArea.moveTo(point1.x, point1.y);
            opts.drawArea.lineTo(hubs[i].x, hubs[i].y);
            opts.drawArea.closePath();
            opts.drawArea.stroke();
        }
    }
};

let Particle = function (xPos, yPos) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = colorVariation({ r: 200, g: 200, b: 200 });
    this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
    this.vector = {
        x: Math.cos(this.directionAngle) * this.speed,
        y: Math.sin(this.directionAngle) * this.speed,
    };
    this.update = function () {
        this.border();
        this.x += this.vector.x;
        this.y += this.vector.y;
    };
    this.border = function () {
        if (this.x >= w || this.x <= 0) {
            this.vector.x *= -1;
        }
        if (this.y >= h || this.y <= 0) {
            this.vector.y *= -1;
        }
        if (this.x > w) this.x = w;
        if (this.y > h) this.y = h;
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
    };
    this.draw = function () {
        opts.drawArea.beginPath();
        opts.drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        opts.drawArea.closePath();
        opts.drawArea.fillStyle = this.color;
        opts.drawArea.fill();
    };
};

export function setup() {
    particles = [];
    resizeReset();
    for (let i = 0; i < opts.particleAmount; i++) {
        particles.push(new Particle());
    }
    opts.animationFrame = window.requestAnimationFrame(loop);
}

function loop() {
    opts.animationFrame = window.requestAnimationFrame(loop);

    opts.drawArea.clearRect(0, 0, w, h);
    drawCanvasBG();
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    for (let i = 0; i < particles.length; i++) {
        linkPoints(particles[i], particles);
    }
}
