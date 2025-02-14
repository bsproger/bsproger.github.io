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
        // Spielfeldgrenzen prüfen
        if (x < 0 || y < 0 || x > (gameContainer.clientWidth - player.clientWidth) || y > (gameContainer.clientHeight - player.clientHeight)) {
            return false;
        }

        // Kollision mit Hindernissen prüfen
        for (let obstacle of obstacles) {
            if (checkCollisionObject(player, obstacle, x, y)) {
                return false;
            }
        }
        return true;
    }

    function checkCollisionObject(obj1, obj2, x, y) {
        // Position und Größe manuell berechnen
        let obj1X = x;
        let obj1Y = y;
        let obj1Width = obj1.clientWidth;
        let obj1Height = obj1.clientHeight;

        let obj2X = obj2.offsetLeft;
        let obj2Y = obj2.offsetTop;
        let obj2Width = obj2.clientWidth;
        let obj2Height = obj2.clientHeight;

        return !(
            obj1X + obj1Width < obj2X ||  // Links vorbei
            obj1X > obj2X + obj2Width ||  // Rechts vorbei
            obj1Y + obj1Height < obj2Y || // Oben vorbei
            obj1Y > obj2Y + obj2Height    // Unten vorbei
        );
    }

    function checkCollision(obj1, obj2) {
        return checkCollisionObject(obj1, obj2, obj1.offsetLeft, obj1.offsetTop);
    }
});
