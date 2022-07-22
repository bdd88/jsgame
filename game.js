const canvas = document.getElementById('gameWindow')
const context = canvas.getContext('2d')

canvas.width = 1000
canvas.height = 1000

class Background {
    draw() {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
}

class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Velocity {
    constructor(x, y) {
        this.x = x,
        this.y = y
    }
}

class Controls {
    constructor(type) {
        if (type === 'wasd') {
            this.left = {key: 'a', pressed: false}
            this.right = {key: 'd', pressed: false}
            this.up = {key: 'w', pressed: false}
            this.down = {key: 's', pressed: false}
        }
        if (type === 'arrow') {
            this.left = {key: 'ArrowLeft', pressed: false}
            this.right = {key: 'ArrowRight', pressed: false}
            this.up = {key: 'ArrowUp', pressed: false}
            this.down = {key: 'ArrowDown', pressed: false}
        }
        this.type = type
        this.boundKeys = [this.left.key, this.right.key, this.up.key, this.down.key]
    }
}

class Stats {
    constructor(width, height, speed, strength) {
        this.width = width
        this.height = height
        this.speed = speed
        this.strength = strength
    }
}

class Player {
    constructor(position, velocity, stats, controls, name) {
        this.position = position
        this.velocity = velocity
        this.stats = stats
        this.controls = controls
        this.name = name
        this.ducking = false
    }

    draw() {
        context.fillStyle = 'black'
        context.fillRect(this.position.x, this.position.y, this.stats.width, this.stats.height)
    }

    update() {
        this.applyGravity()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
    }

    airborn() {
        if (this.position.y < (canvas.height - this.stats.height)) {
            return true
        } else {
            return false
        }
    }

    applyGravity() {
        if (this.airborn() === true) {
            this.velocity.y += 0.2
        } else {
            if (this.velocity.y > 0) {
                this.velocity.y = 0
            }
            if (this.position.y > (canvas.height - this.stats.height)) {
                this.position.y = canvas.height - this.stats.height
            }
        }
    }

    startMoving(direction) {
            if (direction === 'left' && this.controls.left.pressed === false) {
                this.velocity.x -= this.stats.speed
                this.controls.left.pressed = true
            }
            if (direction === 'right' && this.controls.right.pressed === false) {
                this.velocity.x += this.stats.speed
                this.controls.right.pressed = true
            }
    }

    stopMoving(direction) {
            if (direction === 'left' && this.controls.left.pressed === true) {
                this.velocity.x += this.stats.speed
                this.controls.left.pressed = false
            }
            if (direction === 'right' && this.controls.right.pressed === true) {
                this.velocity.x -= this.stats.speed
                this.controls.right.pressed = false
            }
    }

    jump() {
        if (this.airborn() === false) {
            this.velocity.y -= (this.stats.speed * this.stats.strength) * (this.stats.height / 50)
        }
    }

    duck(toggle) {
        if (toggle === true && this.ducking === false) {
            this.stats.height = this.stats.height / 2 
            this.ducking = true
        }
        if (toggle === false && this.ducking === true) {
            this.stats.height = this.stats.height * 2
            this.ducking = false
        }
    }
}

const background = new Background()
let playerOne = new Player(new Position(100, 100), new Velocity(0, 0), new Stats(100, 100, 2, 2), new Controls('wasd'), 'Player One')
let playerTwo = new Player(new Position(300, 100), new Velocity(0, 0), new Stats(50, 50, 4, 1), new Controls('arrow'), 'Player Two')
let players = [playerOne, playerTwo]

function animationLoop() {
    window.requestAnimationFrame(animationLoop)
    background.draw()
    for (let player of players) {
        player.update()
    }
}

animationLoop()

window.addEventListener('keydown', keyPress)
window.addEventListener('keyup', keyRelease)

function keyPress(event) {
    for (let player of players) {
        if (player.controls.boundKeys.includes(event.key)) {
            switch (event.key) {
                case player.controls.left.key:
                    player.startMoving('left')
                    break
                case player.controls.right.key:
                    player.startMoving('right')
                    break
                case player.controls.up.key:
                    player.jump()
                    break
                case player.controls.down.key:
                    player.duck(true)
                    break
            }
        }
    }
}

function keyRelease(event) {
    for (let player of players) {
        if (player.controls.boundKeys.includes(event.key)) {
            switch (event.key) {
                case player.controls.left.key:
                    player.stopMoving('left')
                    break
                case player.controls.right.key:
                    player.stopMoving('right')
                    break
                case player.controls.down.key:
                    player.duck(false)
                    break
            }
        }
    }
}