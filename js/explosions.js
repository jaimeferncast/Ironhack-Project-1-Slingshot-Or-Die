class Explosions {
    constructor(ctx, position) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.position = position
        this.radius = 0
        this.speed = 40
        this.image = new Image()
        this.image.src = "./img/HolyExplosion.png"
        this.image.frames = 28
        this.image.framesIndex = 0
    }
    explode(framesCounter) {
        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        // this.ctx.fill()
        this.ctx.closePath()
        this.radius += this.speed

        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.position.x - 160,
            this.position.y - 160,
            160 * 2,
            160 * 2
        )

        this.animate(framesCounter)
    }

    animate(framesCounter) {
        console.log(framesCounter)
        if (framesCounter % 40 == 0) {
            this.image.framesIndex++
        }
        // if (this.image.framesIndex >= this.image.frames) {
        //     this.image.framesIndex = 0
        // }
    }
}