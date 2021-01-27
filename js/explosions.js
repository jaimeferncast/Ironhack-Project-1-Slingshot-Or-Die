class Explosions {
    constructor(ctx, position) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.position = position
        this.radius = 0
        this.speed = 3
        this.image = new Image()
        this.image.src = "./img/firecast.png"
        this.image.frames = 28
        this.image.framesIndex = 0
    }
    explode() {
        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        this.ctx.closePath()
        this.radius += this.speed

        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.position.x - 100,
            this.position.y - 100,
            100 * 2,
            100 * 2
        )
    }
    animate() {
        this.image.framesIndex++
    }
}

class Crack extends Explosions {
    constructor(ctx, position) {
        super (ctx, position)
        this.size = {
            w: 60,
            h: 60
        }
        this.image = new Image()
        this.image.src = "./img/crack.png"
        this.angle = Math.floor(Math.random()*360)
    }
    draw() {
        this.ctx.globalAlpha = .5
        this.ctx.save()
        this.ctx.translate(this.position.x, this.position.y)
        this.ctx.rotate(this.angle * Math.PI / 180)
        this.ctx.translate(-this.position.x, -this.position.y)
        this.ctx.drawImage(
            this.image,
            this.position.x - this.size.w / 2,
            this.position.y - this.size.h / 2,
            this.size.w,
            this.size.h
        )
        this.ctx.restore()
        this.ctx.globalAlpha = 1
    }
}