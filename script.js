document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const love = document.getElementById("love");
    const obstacles = document.querySelectorAll(".obstacle");
    const message = document.getElementById("message");

    let playerX = 10;
    let playerY = 10;
    const step = 10;
    const gameContainer = document.getElementById("game-container");

    // Steuerung mit Tastatur (für Desktop)
    document.addEventListener("keydown", function (event) {
        handleMove(event.key);
    });

    // Steuerung mit Touch-Buttons
    document.getElementById("up").addEventListener("click", () => handleMove("ArrowUp"));
    document.getElementById("down").addEventListener("click", () => handleMove("ArrowDown"));
    document.getElementById("left").addEventListener("click", () => handleMove("ArrowLeft"));
    document.getElementById("right").addEventListener("click", () => handleMove("ArrowRight"));

    function handleMove(direction) {
        let newX = playerX;
        let newY = playerY;

        switch (direction) {
            case "ArrowUp": newY -= step; break;
            case "ArrowDown": newY += step; break;
            case "ArrowLeft": newX -= step; break;
            case "ArrowRight": newX += step; break;
        }

        updatePosition(newX, newY);
    }

    function updatePosition(x, y) {
        if (isValidMove(x, y)) {
            playerX = x;
            playerY = y;
            player.style.left = playerX + "px";
            player.style.top = playerY + "px";
        }

        if (checkCollision(player, love)) {
            message.textContent = "Ihr habt euch gefunden! ❤️";
            player.style.backgroundColor = "purple";
        }
    }

    function isValidMove(x, y) {
        if (x < 0 || y < 0 || x > (gameContainer.clientWidth - player.clientWidth) || y > (gameContainer.clientHeight - player.clientHeight)) {
            return false;
        }

        for (let obstacle of obstacles) {
            if (checkCollision({ offsetLeft: x, offsetTop: y, offsetWidth: player.clientWidth, offsetHeight: player.clientHeight }, obstacle)) {
                return false;
            }
        }
        return true;
    }

    function checkCollision(obj1, obj2) {
        const rect1 = obj1.current.getBoundingClientRect();
        const rect2 = obj2.current.getBoundingClientRect();
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }
});
