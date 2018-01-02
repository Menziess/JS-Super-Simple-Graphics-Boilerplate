
class Renderer {
    constructor(canvas, context, effect, speed) {
        this.canvas = canvas
        this.context = context
        this.fpsMeter = document.getElementById('fpsMeter')
        this.zoom = document.getElementById('zoom')
        this.effect = effect
        this.lastRender = 0
        this.friction = 1 / speed
        this.lastFps = 0
        this.running = true
        this.frames = 0
        this.init()
    }

    set newEffect(effect) {
        if (effect && effect.step != "undefined")
            this.effect = effect
        else
            console.warn("Something is wrong with the selected effect.")
        this.clearCanvas()
    }

    /**
     * Called each frame, calls the provided effect.
     * @param {float} delta
     */
    draw(delta) {
        this.clearCanvas()
        this.effect.step(this.effect, delta / this.friction)
    }

    /**
     * Clears canvas.
     */
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        const zoomVal = parseInt(this.zoom.value) / 100
        this.context.scale(zoomVal + 1, zoomVal + 1)
        this.context.translate(
            -this.canvas.width * zoomVal / 2,
            -this.canvas.height * zoomVal / 2)
    }

    /**
     * Main loop, manages fps and state.
     */
    loop() {
        if (document.hidden) { this.running = false }

        let now = Date.now(),
            delta = now - (this.lastRender || now)
        this.lastRender = now;

        if (this.running) {
            this.draw(delta)
            this.frames++
        }

        requestAnimationFrame(() => this.loop());

        // Display fps and position
        if (now - this.lastFps > 999) {
            this.fpsMeter.innerText = this.frames
            this.lastFps = now;
            this.frames = 0;
        }
    }

    /**
     * Manage resizing and pausing of renderer.
     */
    init() {
        window.addEventListener("resize",
            this.aspectRatio.bind(this),
            false)
        window.addEventListener("keyup", (e) => {
            switch (e.keyCode) {
                case 32:
                    this.pause()
                    break;
                case 37:
                    this.zoom.stepDown()
                    break;
                case 39:
                    this.zoom.stepUp()
                    break;
                case 40:
                    this.zoom.value = 0
                    break;
                case 82:
                    this.zoom.value = 0
                    this.context.setTransform(1, 0, 0, 1, 0, 0)
                    this.draw(1e-30)
                    break;

                default:
                    break;
            }
        })
        this.aspectRatio()
        this.loop()
    }

    /**
     * Manages aspect ratio.
     */
    aspectRatio() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.draw(1e-30)
    }


    /**
     * Toggles rendering.
     */
    pause() { this.running = !this.running }
}
