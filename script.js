document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const love = document.getElementById("love");
    const obstacles = document.querySelectorAll(".obstacle");
    const message = document.getElementById("message");

    let playerX = 10;
    let playerY = 10;
    const step = 40; // Größe eines Schrittes
    const gridSize = 40; // Ein Emoji hat eine feste Größe von 40px
    const gameWidth = 400;
    const gameHeight = 400;

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

        // Aktualisiere Position nur, wenn es eine gültige Bewegung ist
        if (isValidMove(newX, newY)) {
            playerX = newX;
            playerY = newY;
            player.style.left = playerX + "px";
            player.style.top = playerY + "px";
        }

        // Prüfen, ob sich die Tauben getroffen haben
        if (playerX === parseInt(love.style.left) && playerY === parseInt(love.style.top)) {
            message.textContent = "Die Tauben haben sich gefunden! 💕";
            player.textContent = "💑";  // Ändert das Emoji zu verliebten Tauben
        }
    }

    function isValidMove(x, y) {
        // Begrenzung des Spielfelds
        if (x < 0 || y < 0 || x >= gameWidth || y >= gameHeight) {
            return false;
        }

        // Kollision mit Hindernissen prüfen
        for (let obstacle of obstacles) {
            let obsX = parseInt(obstacle.style.left);
            let obsY = parseInt(obstacle.style.top);

            if (x === obsX && y === obsY) {
                return false;
            }
        }
        return true;
    }
});
