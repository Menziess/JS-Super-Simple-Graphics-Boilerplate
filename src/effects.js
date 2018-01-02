class Grid {
    constructor(canvas, context) {
        this.canvas = canvas
        this.context = context
    }

    step(self, delta) {

        console.log("step")

        self.context.fillRect(800, 250, 10, 10)
    }
}

class Particles {
    constructor(canvas, context) {
        this.canvas = canvas
        this.context = context
        this.particles = {}
        this.particleIndex = 0
    }

    spawn(n) {
        const x = this.canvas.width / 2
        const y = this.canvas.height / 2
        const life = 255

        for (let i = 0; i < n; i++) {
            new Particle(this.particleIndex++, this.particles, x, y, life)
        }
    }

    step(self, delta) {

        self.spawn(5)

        for (const particle in self.particles) {
            if (self.particles.hasOwnProperty(particle)) {
                let p = self.particles[particle]
                p.draw(self.context, delta)
                if (p.life < 0) delete self.particles[particle]
            }
        }
    }
}

class Particle {
    constructor(id, container, x, y, life) {

        this.id = id
        container[this.id] = this
        this.x = x
        this.y = y

        this.life = Math.random() * life
        this.vx = Math.random() * 10
        this.vy = Math.random() * -10
        this.gravity = 0.8
    }

    draw(context, delta) {
        this.x += delta * (this.vx - 5)
        this.y += delta * this.vy

        // Bounce
        if (this.vy > 20)
            this.vy = -this.vy

        else this.vy += this.gravity

        context.fillStyle =
            "hsla(" + this.life +
            ",100%, 50%, " + this.life / 255 + ")"
        context.fillRect(this.x, this.y, 10, 10)
        this.life -= delta * 2
    }
}

class EffectFactory {
    constructor() {
        this.effectClasses = [
            Particles,
            Grid,
        ]
    }

    get names() {
        return this.effectClasses.map(e => e.name)
    }

    get effects() {
        return this.effectClasses
    }

    getEffect(name) {
        return this.effects.find(e => e.name === name)
    }
}
