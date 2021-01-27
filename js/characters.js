class Character {
    constructor(ctx, canvasSize, character, radius) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.radius = radius
        this.position = { x: this.randomPosX() + 150, y: 0 - this.randomPosY() - this.radius }
        this.character = character
        this.speed = 1 + this.randomSpeed()
        this.image = new Image()
        this.image.src = undefined
        this.image.frames = undefined;
        this.image.framesIndex = 0;
    }
    draw(framesCounter) {
        this.move()
        if (this.character === "redDragon") {
            this.image.src = "./img/reddragon.png"
            this.image.frames = 4
        } else if (this.character === "whiteDragon") {
            this.image.src = "./img/whitedragon.png"
            this.image.frames = 4
        } else if (this.character === "innocent") {
            this.image.src = "./img/innocent.png"
            this.image.frames = 6
        }
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.position.x - this.radius,
            this.position.y - this.radius,
            this.radius * 2,
            this.radius * 2
        )
        this.animate(framesCounter)
        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        this.ctx.closePath()
    }
    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0;
        }
    }
    randomPosX() {
        return Math.floor(Math.random() * (this.canvasSize.w - 300))
    }
    randomPosY() {
        return Math.floor(Math.random() * 50)
    }
    randomSpeed() {
        if (this.character === 'enemy') {
            return Math.floor(Math.random() * 3)
        } else {
            return 0
        }
    }
    move() {
        this.position.y += this.speed
    }
}