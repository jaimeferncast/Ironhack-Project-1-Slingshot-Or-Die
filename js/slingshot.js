class Slingshot {
    constructor(ctx, canvasDom, canvasSize, posX, posY, width, height, lives) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx
        this.canvasDOM = canvasDom
        this.canvasSize = canvasSize
        this.position = { x: posX, y: posY }
        this.size = { w: width, h: height }
        this.isDown = false
        this.slingCenter = {
            x: this.position.x + this.size.w / 2,
            y: this.position.y + this.size.h / 2
        }
        this.pointerPosition = { x: undefined, y: undefined }
        this.bombs = []
        this.landingPos = undefined
        this.image = new Image()
        this.image.src = "./img/slingshot.png"
        this.lives = lives
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size.w,
            this.size.h,
        )
        this.bombs.forEach(elm => elm.draw())
    }

    setEventListeners() {

        this.canvasDOM.addEventListener('mousedown', e => {
            this.lives > 0 && this.position.x + this.size.w > e.offsetX && e.offsetX > this.position.x && this.position.y + this.size.h > e.offsetY && e.offsetY > this.position.y ? this.isDown = true : null
        })

        this.canvasDOM.addEventListener('mousemove', e => {
            this.pointerPosition.x = e.offsetX
            this.pointerPosition.y = e.offsetY
            this.landingPos = {
                x: this.slingCenter.x - (this.pointerPosition.x - this.slingCenter.x) * 6,
                y: this.slingCenter.y - (this.pointerPosition.y - this.slingCenter.y) * 6
            }
            if (this.isDown && this.pointerPosition.y > this.slingCenter.y) {
                this.ctx.beginPath()
                this.ctx.strokeStyle = 'black'
                this.ctx.lineWidth = 1
                this.ctx.moveTo(this.slingCenter.x - this.size.w / 2 + 16, this.slingCenter.y - 37)
                this.ctx.lineTo(this.pointerPosition.x, this.pointerPosition.y)
                this.ctx.lineTo(this.slingCenter.x + this.size.w / 2 - 27, this.slingCenter.y - 37)
                this.ctx.stroke()
                this.ctx.closePath()

                this.ctx.strokeStyle = 'red'
                this.ctx.beginPath()
                this.ctx.arc(this.landingPos.x, this.landingPos.y, 30, 0, Math.PI * 2)
                this.ctx.stroke()
                this.ctx.closePath()
            }
        })

        this.canvasDOM.addEventListener('mouseup', e => {
            if (this.isDown && this.pointerPosition.y > this.position.y) {
                this.bombs.push(new Bomb(
                    this.ctx,
                    this.canvasDOM,
                    this.canvasSize,
                    { x: Math.floor((this.pointerPosition.x - this.slingCenter.x) * -1 / 6), y: Math.floor((this.pointerPosition.y - this.slingCenter.y) * -1 / 6) },
                    this.slingCenter,
                    2,
                    this.landingPos
                ))
            }
            this.isDown = false
        })
    }
}