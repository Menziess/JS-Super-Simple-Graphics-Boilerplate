
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
        const life = 200

        for (let i = 0; i < n; i++) {
            new Particle(this.particleIndex++, this.particles, x, y, life)
        }
    }

    step(self, delta) {

        self.spawn(10)

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
    constructor(id, particles, x, y, life) {
        this.id = id
        particles[this.id] = this
        this.x = x
        this.y = y
        this.life = Math.random() * 255

        this.vx = Math.random() * 10
        this.vy = -10
        this.gravity = 0.5
    }

    draw(context, delta) {
        this.x += delta * this.vx
        this.y += delta * this.vy
        this.vy += this.gravity

        context.fillStyle =
            "hsla(" + parseInt(Math.random() * 360, 10) +
            ",100%, 50%, " + this.life / 255 + ")"
        context.fillRect(this.x, this.y, 10, 10)
        this.life -= delta * 10
    }
}

class EffectFactory {
    constructor() {
        this.effectClasses = [
            Particles,
            Particles
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

// const effects = {
//     Particles
// }

// function effectFactory(name, canvas, context) {
//     switch (name) {
//         case "Particles":
//             return new Particles(canvas, context)
//             break;
//         default:
//             break;
//     }
// }
