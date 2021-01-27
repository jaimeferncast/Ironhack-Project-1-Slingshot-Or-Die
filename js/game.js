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
    wave: 1,
    characters: [],
    explosions: [],
    isCollisionDistance: undefined,
    enemiesFrequency: 100,
    frames: 0,
    score: 0,
    record: 0,
    lives: 3,
    init(id) {
        this.canvasDOM = document.getElementById('mycanvas')
        this.ctx = this.canvasDOM.getContext('2d')
        this.setDimensions()
        this.createSlingshot()
        this.setEventListeners()
        this.startGame()
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
    startGame() {
        this.interval = setInterval(() => {
            this.frames > 5000 ? this.frames = 1 : this.frames++
            this.clearScreen()
            this.createWave()
            this.drawAll()
            this.animateAll()
            this.explodeBomb()
            this.updateScore(this.isCollision())
            this.isGameOver()
            this.clearCharacter()
            this.clearBombs()
        }, 40)
    },
    drawAll() {
        this.showBoardImage()
        this.printScore()
        this.slingShot.draw()
        this.characters.forEach(elm => {
            elm.draw(this.frames)
        })
    },
    animateAll() {
        this.explosions.forEach(elm => {
            elm.animate()
        })
        this.slingShot.bombs.forEach(elm => {
            elm.animate()
        })
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    showBoardImage() {
        let boardImage = new Image()
        boardImage.src = "./img/background.jpg"
        this.ctx.drawImage(boardImage, -50, 0, this.canvasSize.w + 100, this.canvasSize.h + 200)
    },
    createWave() {
        this.wave === 1 && this.firstWave()
        this.wave === 2 && this.secondWave()
        this.wave === 3 && this.thirdWave()
    },
    firstWave() {
        if (!(this.frames % this.enemiesFrequency)) {
            this.createRedDragon()
            this.enemiesFrequency--
        }
        !(this.frames % 400) && this.createInnocent()
        if (this.enemiesFrequency === 40) {
            this.wave = 2
            this.enemiesFrequency = 60
        }
    },
    secondWave() {
        if (!(this.frames % this.enemiesFrequency)) {
            this.createRedDragon()
            this.enemiesFrequency--
        }
        !(this.frames % 400) && this.createInnocent()
        if (this.enemiesFrequency === 15) {
            this.wave = 3
            this.enemiesFrequency = 50
        }
    },
    thirdWave() {
        if (!(this.frames % this.enemiesFrequency)) {
            this.createRedDragon()
            this.enemiesFrequency--
        }
        !(this.frames % 80) && this.createWhiteDragon()
        !(this.frames % 400) && this.createInnocent()
    },
    createSlingshot() {
        this.slingShot = new Slingshot(this.ctx, this.canvasDOM, this.canvasSize, this.canvasSize.w / 2 - 25, this.canvasSize.h - 200, 100, 100, this.lives)
    },
    createRedDragon() {
        this.characters.push(new Character(this.ctx, this.canvasSize, 'redDragon', 40))
    },
    createWhiteDragon() {
        this.characters.push(new Character(this.ctx, this.canvasSize, 'whiteDragon', 40))
    },
    createInnocent() {
        this.characters.push(new Character(this.ctx, this.canvasSize, 'innocent', 20))
    },
    clearCharacter() {
        this.characters.forEach((elm, i) => {
            elm.position.y > this.canvasSize.h + elm.radius ? this.characters.splice(i, 1) : null
        })
    },
    clearBombs() {
        this.slingShot.bombs.forEach((elm, i) => {
            if (elm.hasBombLanded()) {
                this.explosions.push(new Explosions(this.ctx, elm.position))
                this.slingShot.bombs.splice(i, 1)
            }
        })
    },
    explodeBomb() {
        this.explosions.forEach((elm, i) => {
            elm.explode()
            elm.radius === 84 ? this.explosions.splice(i, 1) : null
        })
    },
    isCollision() {
        let returnedCharacter = undefined
        this.explosions.forEach(eachExp => {
            // let eachExp = elm
            this.characters.forEach((eachCharacter, eachCharacterIndex) => {
                // const dx = eachExp.position.x - eachCharacter.position.x
                // const dy = eachExp.position.y - eachCharacter.position.y
                this.isCollisionDistance = Math.sqrt((eachExp.position.x - eachCharacter.position.x) ** 2 + (eachExp.position.y - eachCharacter.position.y) ** 2)
                if (this.isCollisionDistance < eachExp.radius + eachCharacter.radius) {
                    returnedCharacter = eachCharacter.character
                    this.characters.splice(eachCharacterIndex, 1)
                }
            })
        })
        return returnedCharacter
    },
    updateScore(character) {
        if (character === 'enemy') { this.score += 100 }
        else if (character === 'innocent') { this.score -= 500 }
        this.characters.forEach(elm => {
            if (elm.character === 'enemy' && elm.position.y > this.canvasSize.h + elm.radius) {
                this.lives--
                this.slingShot.lives--
            } else if (elm.character === 'innocent' && elm.position.y > this.canvasSize.h + elm.radius) {
                this.lives++
                this.slingShot.lives++
            }
        })
    },
    printScore() {
        this.ctx.fillStyle = 'brown'
        this.ctx.font = 'bold 30px serif'
        this.ctx.fillText(`Your Score is ${this.score}`, 50, this.canvasSize.h - 50)
        this.ctx.fillText(`lives remaining: ${this.lives}`, 625, this.canvasSize.h - 50)
        this.ctx.fillStyle = 'white'
    },
    isGameOver() {
        if (this.lives === 0) {
            clearInterval(this.interval)
            this.clearScreen()
            this.showBoardImage()
            this.ctx.font = 'bold 80px serif'
            this.ctx.fillText(`GAME OVER`, 200, 300)
        }
    }
}