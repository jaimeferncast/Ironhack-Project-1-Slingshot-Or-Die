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
    enemiesFrequency: 50,
    innocents: [],
    frames: 0,
    score: 0,
    record: 0,
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
            this.ctx.fillText(`Your Score is ${this.score}`, 100, this.canvasSize.h - 100)
            this.frames++
            this.slingShot.draw()
            this.enemies.forEach(elm => {
                elm.draw()
            })
            this.innocents.forEach(elm => {
                elm.draw()
            })
            this.frames % 200 === 0 ? this.createInnocent() : null
            if (this.frames % 50 === 0) {
                if (this.enemiesFrequency === 0) {
                    this.enemiesFrequency = 50
                }
                else {
                    this.enemiesFrequency--
                }
            }
            this.frames % this.enemiesFrequency === 0 ? this.createEnemies() : null
            if (this.frames % 50 === 0) {
                this.clearEnemy()
                this.clearBombs()
            }
            this.isEnemyCollision()
            this.isInnocentCollision()
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
    createInnocent() {
        this.innocents.push(new Innocent(this.ctx, this.canvasSize))
    },
    clearEnemy() {
        this.enemies.forEach((elm, i) => {
            elm.position.y > this.canvasSize.h ? this.enemies.splice(i, 1) : null
        })
    },
    clearInnocent() {
        this.innocents.forEach((elm, i) => {
            elm.position.y > this.canvasSize.h ? this.innocents.splice(i, 1) : null
        })
    },
    clearBombs() {
        this.slingShot.bombs.forEach((elm, i) => {
            elm.position.x < 0 || elm.position.x > this.canvasSize.w || elm.position.y < 0 ? this.slingShot.bombs.splice(i, 1) : null
        })
    },
    isEnemyCollision() {
        this.slingShot.bombs.forEach((elm, i) => {
            let eachBomb = elm
            let eachBombIndex = i
            this.enemies.forEach((eachEnemy, eachEnemyIndex) => {
                if (
                    eachEnemy.position.x + eachEnemy.size.w > eachBomb.position.x && eachEnemy.position.x < eachBomb.position.x + eachBomb.size.w && eachEnemy.position.y + eachEnemy.size.h > eachBomb.position.y && eachEnemy.position.y < eachBomb.position.y + eachBomb.size.h
                ) {
                    this.enemies.splice(eachEnemyIndex, 1)
                    this.slingShot.bombs.splice(eachBombIndex, 1)
                    this.score++
                }
            })
        })
    },
    isInnocentCollision() {
        this.slingShot.bombs.forEach((elm, i) => {
            let eachBomb = elm
            let eachBombIndex = i
            this.innocents.forEach((eachInnocent, eachInnocentIndex) => {
                if (
                    eachInnocent.position.x + eachInnocent.size.w > eachBomb.position.x && eachInnocent.position.x < eachBomb.position.x + eachBomb.size.w && eachInnocent.position.y + eachInnocent.size.h > eachBomb.position.y && eachInnocent.position.y < eachBomb.position.y + eachBomb.size.h
                ) {
                    this.innocents.splice(eachInnocentIndex, 1)
                    this.slingShot.bombs.splice(eachBombIndex, 1)
                    this.score--
                }
            })
        })
    }
}