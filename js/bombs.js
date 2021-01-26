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
    }
    draw() {
        this.move()
        this.ctx.fillStyle = 'white'
        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.fillStyle = 'white'
    }
    move() {
        this.position.y += this.speed.y
        this.position.x += this.speed.x
    }
    hasBombLanded() {
        if (this.speed.x < 0) {
            if (this.landingPos.x > this.position.x && this.landingPos.y > this.position.y) {
                return true
            }
        } else if (this.speed.x > 0) {
            if (this.landingPos.x < this.position.x && this.landingPos.y > this.position.y) {
                return true
            }
        } else {
            if (this.landingPos.y > this.position.y) {
                return true
            }
        }
    }
}

// class Bomb {
//     constructor(ctx, canvasDom, canvasSize, speed, position, radius) {
//         /** @type {CanvasRenderingContext2D} */
//         this.ctx = ctx
//         this.canvasDOM = canvasDom
//         this.canvasSize = canvasSize
//         this.speed = { x: speed.x, y: speed.y }
//         this.position = { x: position.x, y: position.y }
//         this.radius = radius
//     }
//     draw() {
//         this.move()
//         this.ctx.fillStyle = 'white'
//         this.ctx.beginPath()
//         this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
//         this.ctx.fill()
//         this.ctx.closePath()
//         this.ctx.fillStyle = 'white'
//         // this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
//     }
//     move() {
//         this.position.y += this.speed.y
//         this.position.x += this.speed.x
//     }
// }