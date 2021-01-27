class Bomb {
    constructor(ctx, canvasDom, canvasSize, speed, position, radius, landingPos) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.canvasDOM = canvasDom
        this.canvasSize = canvasSize
        this.speed = { x: speed.x, y: speed.y }
        this.position = { x: position.x, y: position.y }
        this.radius = radius
        this.landingPos = landingPos
        this.image = new Image()
        this.image.src = "./img/bomb.png"
        this.angle = 0
    }
    draw() {
        this.move()
        this.ctx.save()
        this.ctx.translate(this.position.x, this.position.y)
        this.ctx.rotate(this.angle * Math.PI / 180)
        this.ctx.translate(-this.position.x, -this.position.y)
        this.ctx.drawImage(
            this.image,
            this.position.x - 20,
            this.position.y - 20,
            20 * 2,
            20 * 2
        )
        this.ctx.restore()
    }
    animate() {
        if (this.angle === 360) {
            this.angle = 0
        } else {
            this.angle += 10
        }
    }
    move() {
        this.position.y += this.speed.y
        this.position.x += this.speed.x
    }
    hasBombLanded() {
        if (this.speed.x < 0) {
            if (this.landingPos.x >= this.position.x || this.landingPos.y >= this.position.y) {
                return true
            }
        } else if (this.speed.x > 0) {
            if (this.landingPos.x <= this.position.x || this.landingPos.y >= this.position.y) {
                return true
            }
        } else {
            if (this.landingPos.y >= this.position.y) {
                return true
            }
        }
    }
}
