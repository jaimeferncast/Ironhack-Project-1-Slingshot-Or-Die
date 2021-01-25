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
    characters: [],
    explosions: [],
    enemiesFrequency: 50,
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
        this.interval = setInterval(() => {
            this.clearScreen()
            this.printScore()
            this.frames++
            this.slingShot.draw()
            this.characters.forEach(elm => {
                elm.draw()
            })
            this.frames % 200 === 0 ? this.createInnocent() : null
            if (this.frames % 50 === 0) {
                if (this.enemiesFrequency === 15) {
                    this.enemiesFrequency = 50
                }
                else { this.enemiesFrequency-- }
            }
            this.frames % this.enemiesFrequency === 0 ? this.createEnemies() : null
            this.explodeBomb()
            this.updateScore(this.isCollision())
            this.isGameOver()
            this.clearCharacter()
            this.clearBombs()
        }, 70)
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    createSlingshot() {
        this.slingShot = new Slingshot(this.ctx, this.canvasDOM, this.canvasSize, this.canvasSize.w / 2 - 25, this.canvasSize.h - 200, 50, 50)
    },
    createEnemies() {
        this.characters.push(new Character(this.ctx, this.canvasSize, 'enemy', 20))
    },
    createInnocent() {
        this.characters.push(new Character(this.ctx, this.canvasSize, 'innocent', 20))
    },
    clearCharacter() {
        this.characters.forEach((elm, i) => {
            elm.position.y > this.canvasSize.h + elm.radius ? this.characters.splice(i, 1) : null
        })
    },
    // clearBombs() {
    //     this.slingShot.bombs.forEach((elm, i) => {
    //         elm.position.x < 0 || elm.position.x > this.canvasSize.w || elm.position.y < 0 ? this.slingShot.bombs.splice(i, 1) : null
    //     })
    // },
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
            elm.radius === 160 ? this.explosions.splice(i, 1) : null
        })
    },
    // isCollision() {
    //     let returnedCharacter = undefined
    //     this.slingShot.bombs.forEach((elm, i) => {
    //         let eachBomb = elm
    //         let eachBombIndex = i
    //         this.characters.forEach((eachCharacter, eachCharacterIndex) => {
    //             const dx = eachBomb.position.x - eachCharacter.position.x
    //             const dy = eachBomb.position.y - eachCharacter.position.y
    //             let distance = Math.sqrt(dx * dx + dy * dy)
    //             if (distance < eachBomb.radius + eachCharacter.radius) {
    //                 returnedCharacter = eachCharacter.character
    //                 this.characters.splice(eachCharacterIndex, 1)
    //                 this.slingShot.bombs.splice(eachBombIndex, 1)
    //             }
    //         })
    //     })
    //     return returnedCharacter
    // },
    isCollision() {
        let returnedCharacter = undefined
        this.explosions.forEach((elm, i) => {
            let eachExp = elm
            let eachExpIndex = i
            this.characters.forEach((eachCharacter, eachCharacterIndex) => {
                const dx = eachExp.position.x - eachCharacter.position.x
                const dy = eachExp.position.y - eachCharacter.position.y
                let distance = Math.sqrt(dx * dx + dy * dy)
                if (distance < eachExp.radius + eachCharacter.radius) {
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
            } else if (elm.character === 'innocent' && elm.position.y > this.canvasSize.h + elm.radius) {
                this.lives++
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
            this.ctx.font = 'bold 80px serif'
            this.ctx.fillText(`GAME OVER`, 200, 300)
        }
    }
}