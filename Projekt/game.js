const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerImage = new Image();
playerImage.src = 'images_game/fisher.png';

const fishImages = [new Image(), new Image()];
fishImages[0].src = 'images_game/fish1.png';
fishImages[1].src = 'images_game/fish2.png';

const diamondFishImage = new Image();
diamondFishImage.src = 'images_game/diamond_fish.png';

const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0
};

const fish = [];
const diamondFish = {
    x: Math.random() * (canvas.width - 50),
    y: Math.random() * (canvas.height - 50),
    width: 50,
    height: 50,
    caught: false
};

function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawFish() {
    fish.forEach(f => {
        const fishImage = fishImages[Math.floor(Math.random() * fishImages.length)];
        ctx.drawImage(fishImage, f.x, f.y, f.width, f.height);
    });
}

function drawDiamondFish() {
    if (!diamondFish.caught) {
        ctx.drawImage(diamondFishImage, diamondFish.x, diamondFish.y, diamondFish.width, diamondFish.height);
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    player.x += player.dx;
    player.y += player.dy;

    detectWalls();
}

function detectWalls() {
    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    if (player.y < 0) {
        player.y = 0;
    }

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

function update() {
    clear();

    drawPlayer();
    drawFish();
    drawDiamondFish();

    newPos();

    requestAnimationFrame(update);
}

function moveUp() {
    player.dy = -player.speed;
}

function moveDown() {
    player.dy = player.speed;
}

function moveRight() {
    player.dx = player.speed;
}

function moveLeft() {
    player.dx = -player.speed;
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        moveLeft();
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        moveUp();
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        moveDown();
    }
}

function keyUp(e) {
    if (
        e.key === 'ArrowRight' ||
        e.key === 'Right' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Left' ||
        e.key === 'ArrowUp' ||
        e.key === 'Up' ||
        e.key === 'ArrowDown' ||
        e.key === 'Down'
    ) {
        player.dx = 0;
        player.dy = 0;
    }
}

function createFish() {
    for (let i = 0; i < 5; i++) {
        fish.push({
            x: Math.random() * (canvas.width - 50),
            y: Math.random() * (canvas.height - 50),
            width: 50,
            height: 50
        });
    }
}

createFish();
update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
