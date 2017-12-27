
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

class Main {
    constructor(canvas, context) {
        this.canvas = canvas
        this.context = context
        this.context.fillRect(this.x, 0, 100, 100)
        this.runner = new Runner(canvas, context)
    }
}

class Runner {

    constructor(canvas, context) {
        this.canvas = canvas
        this.context = context
        this.lastRender = 0
        this.x = 0
        this.loop()
    }

    draw(delta) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.x += delta / 300
        this.context.fillRect(this.x, 0, 100, 100)
    }

    loop() {
        let now = Date.now(),
            delta = now - (this.lastRender || now);
        this.lastRender = now;
        this.draw(delta)
        requestAnimationFrame(() => this.loop());
    }
}

new Main(canvas, context)
