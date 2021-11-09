function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function show_debug() {
    let checker = document.getElementById('debug_window');
    if (checker.checked) {
        document.querySelector('.debug').style.display = "flex"
    }
    else {
        document.querySelector('.debug').style.display = "none"
    }
}

function show_siders() {
    let checker = document.getElementById('side_blocks');
    if (checker.checked) {
        document.querySelector('.sideZone').style.display = "flex"
    }
    else {
        document.querySelector('.sideZone').style.display = "none"
    }
}

async function gameOver() {
    let gameOverPage = document.querySelector('.gameOverPage').style
    let gamePage = document.querySelector('.game').style

    // await sleep(1500)

    for (let i = 1; i >= 0; i -= 0.08) {
        await sleep(8)
        gamePage.opacity = i.toFixed(3)
    }
    gamePage.display = "none"
    gameOverPage.opacity = "1"
    gameOverPage.display = "flex"
}

async function homePage() {
    let gameOverPage = document.querySelector('.gameOverPage').style
    let launchPage = document.querySelector('.launch_page').style
    for (let i = 1; i >= 0; i -= 0.08) {
        await sleep(5)
        gameOverPage.opacity = i.toFixed(3)
    }
    launchPage.opacity = "1"
    gameOverPage.display = "none"
    launchPage.display = "flex"
}

function help() {
    alert("1. Press to jump \n2. Avoid obstacles to stay alive")
}

async function startGame() {
    let launchPage = document.querySelector('.launch_page').style

    if (!(launchPage.display === "none")) {
        for (let i = 1; i >= 0; i -= 0.08) {
            await sleep(5)
            launchPage.opacity = i.toFixed(3)
        }
    }
    else {
        let gameOverPage = document.querySelector('.gameOverPage').style
        for (let i = 1; i >= 0; i -= 0.08) {
            await sleep(5)
            gameOverPage.opacity = i.toFixed(3)
        }
    }
    document.querySelector('.launch_page').style.display = "none"
    document.querySelector('.gameOverPage').style.display = "none"
    const screen = document.querySelector('.game')
    screen.style.display = "block"
    screen.style.opacity = "1"
// }
//
// document.addEventListener('DOMContentLoaded', () => {
    const sky = document.querySelector('.fly_zone')
    const ground = document.querySelector('.ground')
    const player = document.querySelector('.bird')

    var paras = document.getElementsByClassName('pipe');
    while(paras[0])
        paras[0].parentNode.removeChild(paras[0]);

    var paras = document.getElementsByClassName('UPpipe');
    while(paras[0])
        paras[0].parentNode.removeChild(paras[0]);

    const tick = 25
    let dead = false
    const hole = 500

    let playerX = 170, playerY = 250
    let fall_speed = 1.2, g_scale = 0.4, zero_boost = 1

    function main() {
        player.style.visibility = 'visible'
        playerY -= fall_speed
        fall_speed += g_scale
        player.style.bottom = playerY + 'px'
        player.style.left = playerX + 'px'
        /////// DEBUG
        document.getElementById('playerX').innerHTML = playerX
        document.getElementById('playerY').innerHTML = playerY.toFixed(1)

        /// Death case # GROUND/SKY
        if (playerY < 0 || playerY + player.style.height > 580)
            dead = true


        if (dead) {
            clearInterval(gameTimer)
            document.removeEventListener('keydown', jump)
            gameOver()
        }
    }

    var gameTimer = setInterval(main, tick)

    async function jump() {
        fall_speed = zero_boost
        if (playerY + 110 < 600) {
            playerY += 30
            await sleep(7)
            playerY += 25
            await sleep(7)
            playerY += 10
            await sleep(7)
            playerY += 10
            // playerY += 10
            // await sleep(7)
        }
        player.style.bottom = playerY + 'px'
    }

    document.addEventListener('keydown', jump)
    document.addEventListener('mousedown', jump)

    function make_pipe() {
        let pipeHeight = Math.random() * 160
        let pipeX = 450, pipeY = pipeHeight;
        const pipe = document.createElement('div')
        const uppipe = document.createElement('div')
        if (!dead) pipe.classList.add('pipe')
        if (!dead) uppipe.classList.add('UPpipe')
        screen.appendChild(pipe)
        screen.appendChild(uppipe)

        pipe.style.bottom = pipeY + 'px'
        pipe.style.left = pipeX + 'px'

        uppipe.style.bottom = pipeY + hole + 'px'
        uppipe.style.left = pipeX + 'px'

        function move_pipes() {
            pipeX -= 2
            pipe.style.left = pipeX + 'px'
            uppipe.style.left = pipeX +'px'

            if (pipeX < -90) {
                clearInterval(pipeTimer)
                screen.removeChild(pipe)
                screen.removeChild(uppipe)
            }
            /////// DEBUG
            document.getElementById('pipeY').innerHTML = pipeY
            document.getElementById('uppipeBottom').innerHTML = uppipe.style.bottom
            document.getElementById('pipeTop').innerHTML = pipe.style.top
            document.getElementById('pipeBottom').innerHTML = pipe.style.bottom

            if (((170 <= pipeX && pipeX <= 250) || (170 <= pipeX + 90 && pipeX + 90 <= 250)))
                document.getElementById('collision').innerHTML = '11'
            if (((pipeY > playerY || pipeY > playerY + 60) || (pipeY + hole < playerY || pipeY + hole < playerY + 60)))
                document.getElementById('collision').innerHTML = '122'

            document.getElementById('lplayer').innerHTML = (170 <= pipeX && pipeX <= 250)
            document.getElementById('rplayer').innerHTML = (170 <= pipeX + 90 && pipeX + 90 <= 250)
            document.getElementById('tplayer').innerHTML = (pipeY >= playerY || pipeY >= playerY + 60)
            document.getElementById('bplayer').innerHTML = (pipeY + hole <= playerY || pipeY + hole <= playerY + 60)
            
            // console.log((170 <= pipeX && pipeX <= 250))
            // console.log((170 <= pipeX + 90 && pipeX + 90 <= 250))
            // console.log((pipeY >= playerY || pipeY >= playerY + 60))
            // console.log((pipeY + hole <= playerY || pipeY + hole <= playerY + 60))

            // if ((170 <= pipeX && pipeX <= 250)) dead = true
            // if ((170 <= pipeX + 90 && pipeX + 90 <= 250)) dead = true
            // if (playerY <= pipeY - 140 + 300) dead = true
            // if (playerY + 90 >= pipeY + 500 - 140) dead = true

            if (((170 <= pipeX && pipeX <= 250) || (170 <= pipeX + 90 && pipeX + 90 <= 250)) &&
                ((playerY <= pipeY - 140 + 300) || (playerY + 90 >= pipeY + 500 - 140)))
                dead = true

            if (dead) {
                clearInterval(pipeTimer)
            }

        }

        var pipeTimer = setInterval(move_pipes, tick)
        if (!dead) {
            setTimeout(make_pipe, 3000)
        }

    }
    make_pipe()

}