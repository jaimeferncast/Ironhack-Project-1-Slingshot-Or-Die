class Banner {
    constructor(ctx, text) {
        this.ctx = ctx
        this.text = text
        this.position = { x: 450, y: -300 }
        this.speed = 2
    }
    draw() {
        this.move()
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
        this.ctx.font = '35px "Press Start 2P"'
        this.ctx.fillText(this.text, this.position.x, this.position.y)
        this.ctx.textAlign = 'left'
        this.ctx.fillStyle = 'white'
    }
    move() {
        this.position.y += this.speed
    }
}

