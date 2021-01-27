class Banner {
    constructor(ctx, text) {
        this.ctx = ctx
        this.text = text
        this.position = {x: 150, y: -50}
        this.speed = 2
    }
    draw() {
        this.move()
        this.ctx.font = 'bold 50px serif'
        this.ctx.fillText(this.text, this.position.x, this.position.y)
    }
    move() {
        this.position.y += this.speed
    }
}

