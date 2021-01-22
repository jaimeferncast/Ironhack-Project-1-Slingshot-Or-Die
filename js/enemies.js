class Enemy {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.size = { w: 5, h: 5 }
        this.position = { x: this.randomPosX(), y: 0 - this.randomPosY() }
        this.speed = 2 + this.randomSpeed()
        // this.imageName = ''
        // this.imageInstance = new Image()
        // this.imageInstance.src = `img/${this.imageName}`
    }
    draw() {
        this.move()
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
    }
    randomPosX() {
        return Math.floor(Math.random() * this.canvasSize.w - this.size.w)
    }
    randomPosY() {
        return Math.floor(Math.random() * 100 - this.size.h)
    }
    randomSpeed() {
        return Math.floor(Math.random() * 5)
    }
    move() {
        this.position.y += this.speed
    }
}