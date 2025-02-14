document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const love = document.getElementById("love");
    const obstacles = document.querySelectorAll(".obstacle");
    const message = document.getElementById("message");

    let playerX = 10;
    let playerY = 10;
    const step = 40; // Rastergröße für präzise Bewegung

    // Steuerung mit Tastatur
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

        if (isValidMove(newX, newY)) {
            playerX = newX;
            playerY = newY;
            player.style.left = playerX + "px";
            player.style.top = playerY + "px";
        }

        if (checkCollision(player, love)) {
            message.textContent = "Die Tauben haben sich gefunden! 💕";
            player.textContent = "💑"; // Wechselt das Emoji zu verliebten Tauben
        }
    }

    function isValidMove(x, y) {
        const gameContainer = document.getElementById("game-container");

        // Spielfeldbegrenzung prüfen
        if (x < 0 || y < 0 || x >= gameContainer.clientWidth || y >= gameContainer.clientHeight) {
            return false;
        }

        // Hindernis-Kollision prüfen
        for (let obstacle of obstacles) {
            if (checkCollision({ offsetLeft: x, offsetTop: y, offsetWidth: step, offsetHeight: step }, obstacle)) {
                return false;
            }
        }
        return true;
    }

    function checkCollision(obj1, obj2) {
        return (
            obj1.offsetLeft < obj2.offsetLeft + obj2.offsetWidth &&
            obj1.offsetLeft + obj1.offsetWidth > obj2.offsetLeft &&
            obj1.offsetTop < obj2.offsetTop + obj2.offsetHeight &&
            obj1.offsetTop + obj1.offsetHeight > obj2.offsetTop
        );
    }
});
