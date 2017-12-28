
const canvas = document.getElementById('canvas')
const context = this.canvas.getContext('2d')

// Renderer renders effects.
renderer = new Renderer(
    canvas, context,
    new Particles(canvas, context),
    0.02
)

// Effect classes.
effects = [
    "Particles",
    "Doesn't exist",
]

// Select for effects.
select = document.getElementById('select')
for (const i in effects) {
    const option = document.createElement("option")
    option.text = effects[i]
    option.value = effects[i]
    select.appendChild(option)
}

// On select, use factory to create effect object.
select.onchange = () => {
    name = select.options[select.selectedIndex].text
    renderer.newEffect = effectFactory(name, canvas, context)
}
