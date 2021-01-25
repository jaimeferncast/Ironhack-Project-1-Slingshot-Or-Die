class Explosions {
    constructor(ctx, position) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.position = position
        this.radius = 0
        this.speed = 40
    }
    explode() {
        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.radius += this.speed
    }
}