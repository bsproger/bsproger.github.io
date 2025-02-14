document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const love = document.getElementById("love");
    const obstacles = document.querySelectorAll(".obstacle");
    const message = document.getElementById("message");
    const startGyroButton = document.getElementById("startGyro");

    let playerX = 10;
    let playerY = 10;
    const step = 5; // Kleinere Schritte für sanfte Bewegung
    const gameContainer = document.getElementById("game-container");

    let gyroEnabled = false;

    // Steuerung mit Tastatur (Fallback für Desktop)
    document.addEventListener("keydown", function (event) {
        handleMove(event.key);
    });

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
        const rect1 = obj1.getBoundingClientRect();
        const rect2 = obj2.getBoundingClientRect();
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

    // Gyroskop aktivieren
    startGyroButton.addEventListener("click", function () {
        if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
            DeviceOrientationEvent.requestPermission().then((permissionState) => {
                if (permissionState === "granted") {
                    gyroEnabled = true;
                    window.addEventListener("deviceorientation", handleGyro);
                    startGyroButton.style.display = "none";
                } else {
                    alert("Gyroskop-Zugriff verweigert!");
                }
            }).catch(console.error);
        } else {
            alert("Dieses Gerät unterstützt kein Gyroskop oder es wird automatisch aktiviert.");
            gyroEnabled = true;
            window.addEventListener("deviceorientation", handleGyro);
            startGyroButton.style.display = "none";
        }
    });

    function handleGyro(event) {
        if (!gyroEnabled) return;

        let x = event.gamma; // Links-Rechts-Kippen
        let y = event.beta;  // Vor-Zurück-Kippen

        if (x > 5) {
            playerX += step;
        } else if (x < -5) {
            playerX -= step;
        }

        if (y > 5) {
            playerY += step;
        } else if (y < -5) {
            playerY -= step;
        }

        updatePosition(playerX, playerY);
    }
});