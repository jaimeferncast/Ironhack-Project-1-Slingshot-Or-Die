const appGame = {
    name: 'Slingshot or die',
    description: 'Use your slingshot to sutvive!',
    authors: 'Verónica Alcalá & Jaime Fernández',
    version: '1.0.0',
    license: undefined,
    /** @type {CanvasRenderingContext2D} */
    ctx: undefined,
    canvasDOM: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    slingShot: undefined,
    enemies: [],
    // bombs: [],
    frames: 0,
    init(id) {
        this.canvasDOM = document.getElementById('mycanvas')
        this.ctx = this.canvasDOM.getContext('2d')
        this.setDimensions()
        this.createSlingshot()
        this.setEventListeners()
        this.drawAll()
    },
    setEventListeners() {
        this.slingShot.setEventListeners()

    },
    // setEventListeners() {
    //     let isDown = false
    //     let slingCenter = {
    //         x: this.slingShot.position.x + this.slingShot.size.w / 2,
    //         y: this.slingShot.position.y + this.slingShot.size.h / 2
    //     }
    //     let pointerPosition = { x: undefined, y: undefined }

    //     this.canvasDOM.addEventListener('mousedown', e => {
    //         this.slingShot.position.x + this.slingShot.size.w > e.offsetX && e.offsetX > this.slingShot.position.x && this.slingShot.position.y + this.slingShot.size.h > e.offsetY && e.offsetY > this.slingShot.position.y ? isDown = true : null
    //     })

    //     this.canvasDOM.addEventListener('mousemove', e => {
    //         pointerPosition.x = e.offsetX
    //         pointerPosition.y = e.offsetY
    //         if (isDown && pointerPosition.y > slingCenter.y) {
    //             this.ctx.beginPath()
    //             this.ctx.strokeStyle = 'black'
    //             this.ctx.lineWidth = 1
    //             this.ctx.moveTo(slingCenter.x, slingCenter.y)
    //             this.ctx.lineTo(pointerPosition.x, pointerPosition.y)
    //             this.ctx.stroke()
    //             this.ctx.closePath()
    //         }
    //     })

    //     this.canvasDOM.addEventListener('mouseup', e => {
    //         isDown = false
    //     })
    // },
    setDimensions() {
        this.canvasSize = {
            w: 900,
            h: window.innerHeight
        }
        this.canvasDOM.setAttribute('width', this.canvasSize.w)
        this.canvasDOM.setAttribute('height', this.canvasSize.h)
    },
    drawAll() {
        setInterval(() => {
            this.clearScreen()
            this.frames++
            this.slingShot.draw()
            this.enemies.forEach(elm => {
                elm.draw()
            })
            this.frames % 50 === 0 ? this.createEnemies() : null
            this.frames % 50 === 0 ? this.clearEnemy() : null
        }, 70)
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    createSlingshot() {
        this.slingShot = new Slingshot(this.ctx, this.canvasDOM, this.canvasSize, this.canvasSize.w / 2 - 25, this.canvasSize.h - 200, 50, 50)
    },
    createEnemies() {
        this.enemies.push(new Enemy(this.ctx, this.canvasSize))
    },
    // createBombs() {
    //     this.bombs.push(new Bomb(this.ctx, this.canvasDOM, this.canvasSize, {x: 5, y: 5}, this.slingShot.slingCenter))
    // },
    clearEnemy() {
        this.enemies.forEach((elm, i) => {
            elm.position.y > this.canvasSize.h ? this.enemies.splice(i, 1) : null
        })
    }
}