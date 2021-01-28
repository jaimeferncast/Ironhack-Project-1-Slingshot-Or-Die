class Character {
    constructor(ctx, canvasSize, character, radius) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.radius = radius
        this.position = { x: this.randomPosX() + 150, y: 0 - this.randomPosY() - this.radius }
        this.character = character
        this.speed = (2 + this.randomSpeed()) / 2
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
            this.position.y - Math.floor(this.radius / (this.image.width / this.image.frames) * this.image.height),
            this.radius * 2,
            Math.floor(this.radius / (this.image.width / this.image.frames) * this.image.height) * 2
        )
        this.animate(framesCounter)
        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        this.ctx.closePath()
    }
    animate(framesCounter) {
        !(framesCounter % 5) && this.image.framesIndex++
        this.image.framesIndex >= this.image.frames ? this.image.framesIndex = 0 : null
    }
    randomPosX() {
        return Math.floor(Math.random() * (this.canvasSize.w - 300))
    }
    randomPosY() {
        return Math.floor(Math.random() * 50)
    }
    randomSpeed() {
        if (this.character === 'redDragon' || this.character === 'whiteDragon') {
            return Math.floor(Math.random() * 5)
        } else { return 0 }
    }
    move() {
        this.position.y += this.speed
    }
}

class Spill {
    constructor(ctx, character, position, frameAtDeath) {
        this.ctx = ctx
        this.character = character
        this.position = position
        this.frameAtDeath = frameAtDeath
        this.image = new Image()
        this.image.src = "./img/blood.png"
        this.image.frames = 21
        this.image.framesIndex = 0
    }
    draw() {
        if (this.character === 'innocent') {
            this.image.src = "./img/blood.png"
        } else { this.image.src = "./img/dragonblood.png" }
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.position.x - 100,
            this.position.y - 80,
            100 * 2,
            100 * 2
        )
    }
    animate() {
        this.image.framesIndex++
    }
    clearSpill(frames) {
        if (frames >= this.frameAtDeath + 22) {
            return true
        }
    }
}