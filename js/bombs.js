class Bomb {
    constructor(ctx, canvasDom, canvasSize, speed, position) {
        this.ctx = ctx
        this.canvasDOM = canvasDom
        this.canvasSize = canvasSize
        this.speed = { x: speed.x, y: speed.y}
        this.position = { x: position.x, y: position.y}
        this.size = { w: 5, h: 5 }
    }
    draw() {
        this.move()
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
    }
    move() {
        this.position.y += this.speed.y
        this.position.x += this.speed.x
    }
}