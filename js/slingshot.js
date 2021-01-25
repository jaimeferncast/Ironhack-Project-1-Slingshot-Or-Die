class Slingshot {
    constructor(ctx, canvasDom, canvasSize, posX, posY, width, height) {
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
    }

    draw() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
        this.bombs.forEach(elm => elm.draw())
    }

    setEventListeners() {

        this.canvasDOM.addEventListener('mousedown', e => {
            this.position.x + this.size.w > e.offsetX && e.offsetX > this.position.x && this.position.y + this.size.h > e.offsetY && e.offsetY > this.position.y ? this.isDown = true : null
        })

        this.canvasDOM.addEventListener('mousemove', e => {
            this.pointerPosition.x = e.offsetX
            this.pointerPosition.y = e.offsetY
            if (this.isDown && this.pointerPosition.y > this.slingCenter.y) {
                this.ctx.beginPath()
                this.ctx.strokeStyle = 'black'
                this.ctx.lineWidth = 1
                this.ctx.moveTo(this.slingCenter.x - this.size.w / 2, this.slingCenter.y)
                this.ctx.lineTo(this.pointerPosition.x, this.pointerPosition.y)
                this.ctx.lineTo(this.slingCenter.x + this.size.w / 2, this.slingCenter.y)
                this.ctx.stroke()
                this.ctx.closePath()

                this.ctx.strokeStyle = 'red'
                this.ctx.beginPath()
                this.ctx.arc(this.slingCenter.x - (this.pointerPosition.x - this.slingCenter.x) * 4, this.slingCenter.y - (this.pointerPosition.y - this.slingCenter.y) * 4, 30, 0, Math.PI * 2)
                this.ctx.stroke()
                this.ctx.closePath()
                this.ctx.fillStyle = 'white'
            }
        })

        this.canvasDOM.addEventListener('mouseup', e => {
            if (this.isDown && this.pointerPosition.y > this.position.y) {
                this.bombs.push(new Bomb(
                    this.ctx,
                    this.canvasDOM,
                    this.canvasSize,
                    { x: Math.floor((this.pointerPosition.x - this.slingCenter.x) * -1 / 5), y: Math.floor((this.pointerPosition.y - this.slingCenter.y) * -1 / 5) },
                    this.slingCenter,
                    3,
                    { x: this.pointerPosition.x, y: this.pointerPosition.y },
                    this.slingCenter
                ))
                console.log(this.bombs[this.bombs.length - 1].speed.x)
            }
            this.isDown = false
        })
    }
}