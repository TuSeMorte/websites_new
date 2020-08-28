document.addEventListener('DOMContentLoaded', () => {
    const dinosaur = document.querySelector('.dinosaur')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')

    let isJumping = false
    let position = 0
    let gravity = 0.9
    let isGameOver = false

    function control(e) {
        if(e.keyCode === 32){
            if(!isJumping){
                isJumping = true
                jump()
            }
        }
    }
    document.addEventListener('keyup', control)

    function jump() {
        let count = 0
        let timerId = setInterval(function ()  {
        //move down
        console.log('move down')
        if(count === 15){
            clearInterval(timerId)
            let downTimerId = setInterval(function () {
                if(count === 0){
                    clearInterval(downTimerId)
                    isJumping = false
                }
                
                position -=5
                count--
                position = position * gravity
                dinosaur.style.bottom = position + 'px'
                console.log(dinosaur.style.bottom) 
            },20)

        }
        
        // move up
            console.log('move up')
            position +=30
            count++ 
            position = position * gravity
            dinosaur.style.bottom = position + 'px'
        },20)
    }
    function generateObstacles(){
        let randomTime = Math.random() * 4000
        let obstaclePosition = 1000
        const obstacle = document.createElement('div')
        if (!isGameOver) obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'

        let timerId = setInterval(function(){
            if(obstaclePosition > 0 && obstaclePosition < 60 && position < 60){
                clearInterval(timerId)
                alert.innerHTML = 'Game Over'
                isGameOver = true
                while (grid.firstChild){
                    grid.removeChild(grid.lastChild)
                }
            }

            obstaclePosition -=10
            obstacle.style.left = obstaclePosition + 'px'

        },20)
        if (!isGameOver) setTimeout(generateObstacles,randomTime)
    }
    generateObstacles() 
})