class Character {
    constructor(ctx, canvasSize, character, radius) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.radius = radius
        this.position = { x: this.randomPosX() + this.radius, y: 0 - this.randomPosY() - this.radius }
        this.character = character
        this.speed = 2 + this.randomSpeed()
        // this.imageName = ''
        // this.imageInstance = new Image()
        // this.imageInstance.src = `img/${this.imageName}`
    }
    draw() {
        this.move()
        if (this.character === 'innocent') { this.ctx.fillStyle = 'green' }
        else { this.ctx.fillStyle = 'red' }
        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.fillStyle = 'white'
        // this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
    }
    // refactorizar
    randomPosX() {
        return Math.floor(Math.random() * (this.canvasSize.w - this.radius * 2))
    }
    randomPosY() {
        return Math.floor(Math.random() * 100)
    }
    randomSpeed() {
        if (this.character === 'enemy') {
            return Math.floor(Math.random() * 5)
        } else {
            return 0
        }
    }
    move() {
        this.position.y += this.speed
    }
}