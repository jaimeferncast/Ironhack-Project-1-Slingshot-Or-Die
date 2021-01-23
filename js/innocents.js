class Innocent {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.size = { w: 10, h: 10 }
        this.position = { x: this.randomPosX(), y: 0 - this.randomPosY() }
        this.speed = 2
        // this.imageName = ''
        // this.imageInstance = new Image()
        // this.imageInstance.src = `img/${this.imageName}`
    }
    draw() {
        this.move()
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
    }
    randomPosX() {
        return Math.floor(Math.random() * this.canvasSize.w - this.size.w)
    }
    randomPosY() {
        return Math.floor(Math.random() * 100 - this.size.h)
    }
    move() {
        this.position.y += this.speed
    }
}