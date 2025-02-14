document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const love = document.getElementById("love");
    const obstacles = document.querySelectorAll(".obstacle");
    const message = document.getElementById("message");

    let playerX = 10;
    let playerY = 10;
    const step = 10;
    const gameContainer = document.getElementById("game-container");

    document.addEventListener("keydown", function (event) {
        let newX = playerX;
        let newY = playerY;

        switch (event.key) {
            case "ArrowUp":
                newY -= step;
                break;
            case "ArrowDown":
                newY += step;
                break;
            case "ArrowLeft":
                newX -= step;
                break;
            case "ArrowRight":
                newX += step;
                break;
        }

        if (isValidMove(newX, newY)) {
            playerX = newX;
            playerY = newY;
            player.style.left = playerX + "px";
            player.style.top = playerY + "px";
        }

        if (checkCollision(player, love)) {
            message.textContent = "Ihr habt euch gefunden! ❤️";
            player.style.backgroundColor = "purple";
        }
    });

    function isValidMove(x, y) {
        if (x < 0 || y < 0 || x > 360 || y > 360) return false;

        for (let obstacle of obstacles) {
            if (checkCollision({ offsetLeft: x, offsetTop: y, offsetWidth: 40, offsetHeight: 40 }, obstacle)) {
                return false;
            }
        }
        return true;
    }

    function checkCollision(obj1, obj2) {
        const rect1 = obj1.getBoundingClientRect();
        const rect2 = obj2.getBoundingClientRect();
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }
});