// Selection of Animation
playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e) {
    playerState = e.target.value;
})

// Canvas SetUp
const canvas = document.getElementById('canvas1');
const ctx  = canvas.getContext('2d');
// Set Size of canvas
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// Adding Animation Img
const playerImage = new Image();
playerImage.src = "shadow_dog.png";
// playerImg Size
const spriteWidth = 575;
const spritHeight = 523; 

// Animation Spead Cantrol
gameFrame = 0;
const staggerFrame = 5;

// Animation States And Frames
const spriteAnimatons = [];
const animationStates = [
    {
        name : 'idle',
        frames : 7,
    },
    {
        name : 'jump',
        frames : 7,
    },
    {
        name : 'fall',
        frames : 7
    },
    {
        name : 'run',
        frames : 9
    },
    {
        name : 'dizzy',
        frames : 7
    },
    {
        name : 'sit',
        frames : 4
    },
    {
        name : 'roll',
        frames : 7
    },
    {
        name : 'bite',
        frames : 7
    },
    {
        name : 'ko',
        frames : 12
    },
    {
        name : 'gethit',
        frames : 4
    }
];
// Calc frams
animationStates.forEach((state, index) => {
    let frames = {
        loc : [],
    }
    for (i = 0; i < state.frames; i++) {
        positionX = i * spriteWidth;
        positionY = index * spritHeight;
        frames.loc.push({
            x : positionX,
            y : positionY,
        });
    }
    spriteAnimatons[state.name] = frames;
});

// Main Animation Loop
function animate() {
    // clear prev paint from canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // position of animation
    let position = Math.floor(gameFrame / staggerFrame) % spriteAnimatons[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimatons[playerState].loc[position].y;
    console.log(frameX, frameY)

    // drawImg()
    /* drawImage(Img, sx, sy, sw, sh, dx, dy, dw, dh)
     * Img -> src of img
     * s   -> sorce (Img)
     * d   -> destination (canvas)
     * x,y -> x-axis and y-axis codinates
     * w,h -> width and hight
     */
    ctx.drawImage(playerImage, 
        frameX , frameY , 
        spriteWidth, spritHeight, 
        0, 0, 
        spriteWidth, spritHeight
    )

    gameFrame++;
    // infinit recursion call
    requestAnimationFrame(animate)
}
animate();