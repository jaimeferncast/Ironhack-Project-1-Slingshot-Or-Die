class Slingshot {
    constructor(ctx, canvasSize, posX, posY, width, height) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.position = { x: posX, y: posY }
        this.size = { w: width, h: height }
    }
    draw() {
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
    }
}