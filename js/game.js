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
    bombs: [],
    frames: 0,
    init(id) {
        this.canvasDOM = document.getElementById('mycanvas')
        this.ctx = this.canvasDOM.getContext('2d')
        this.setDimensions()
        this.createSlingshot()
        this.drawAll()
    },
    setEventListeners() {

    },
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
        }, 70);
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    createSlingshot() {
        this.slingShot = new Slingshot(this.ctx, this.canvasSize, 400, 600, 50, 50)
    },
    createEnemies() {
        this.enemies.push(new Enemy(this.ctx, this.canvasSize))
    },
    createBombs() {

    },
    clearEnemy() {
        this.enemies.forEach((elm, i) => {
            elm.position.y > this.canvasSize.h ? this.enemies.splice(i, 1) : null
        })
    }
}