var isplaying = false;
var audioElements = document.querySelectorAll('.audio-player');
var progress = document.getElementById("s1");
var image1 = document.getElementById('i1');
var image2 = document.getElementById('i2');
let currentlyPlayingAudio = null;
let currentAlbum = null; // Added variable to keep track of the current album

function playAudio(playerId, event) {
    event.preventDefault();
    const link = event.currentTarget;
    const album = link.closest('.album');
    const audioPlayer = document.getElementById(playerId);

    if (currentlyPlayingAudio === audioPlayer) {
        // Clicked on the same song twice
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
        album.classList.remove('cd-out');
        resetCDAnimation();
        currentlyPlayingAudio = null;
        currentAlbum = null; // Reset the current album
        image1.style.display = 'block';
        image2.style.display = 'none';
        
    } else {
        if (currentlyPlayingAudio) {
            currentlyPlayingAudio.pause();
            currentlyPlayingAudio.currentTime = 0;
            if (currentAlbum) {
                currentAlbum.classList.remove('cd-out');
                resetCDAnimation();
            }
        }

        if (album.classList.contains('cd-out')) {
            resetCDAnimation();
            audioPlayer.currentTime = 0;
            album.classList.remove('cd-out');
            currentlyPlayingAudio = null;
            currentAlbum = null; // Reset the current album
            image1.style.display = 'block';
            image2.style.display = 'none';
        } else {
            document.querySelectorAll('.album.cd-out').forEach(function (otherAlbum) {
                otherAlbum.classList.remove('cd-out');
            });

            album.classList.add('cd-out');
            document.getElementById('controlbox').classList.add('active');
            audioPlayer.play();
            
            currentlyPlayingAudio = audioPlayer;
            currentAlbum = album; // Update the current album

            audioPlayer.addEventListener('ended', function () {
                resetCDAnimation();
                album.classList.remove('cd-out');
                currentlyPlayingAudio = null;
                currentAlbum = null; // Reset the current album
                image1.style.display = 'block';
                image2.style.display = 'none';
            });

            animateCD(album.querySelector('.cd'));
        }
    }
}


function animateCD(cdElement) {
    image1.style.display = 'none';
    image2.style.display = 'block';
    cdElement.classList.add('cd-clicked');
    setTimeout(function () {
        cdElement.classList.remove('cd-clicked');
    }, 500);
}

audioElements.forEach(function (audio, index) {
    audio.onloadedmetadata = function () {
        progress.max = audio.duration;
        progress.value = audio.currentTime;
    };

    audio.addEventListener('timeupdate', function () {
        progress.value = audio.currentTime;
    });
});

function seekAudio() {
    if (currentlyPlayingAudio) {
        currentlyPlayingAudio.currentTime = progress.value;
    }
}

function resetCDAnimation() {
    document.getElementById('controlbox').classList.remove('active');
    if (currentAlbum) {
        currentAlbum.classList.remove('cd-out');
    }
}










//sparkle here
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let w, h, balls = [];
let mouse = {
    x: undefined,
    y: undefined
}
let rgb = [
    "rgb(255, 215, 0)", // Golden color
]

function init() {
    resizeReset();
    animationLoop();
}

function resizeReset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

function animationLoop() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    drawBalls();

    let temp = [];
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].time <= balls[i].ttl) {
            temp.push(balls[i]);
        }
    }
    balls = temp;

    requestAnimationFrame(animationLoop);
}

function drawBalls() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
    }
}

function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    for (let i = 0; i < 5; i++) {
        balls.push(new Ball());
    }
}

function mouseout() {
    mouse.x = undefined;
    mouse.y = undefined;
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

class Ball {

    constructor() {
        this.start = {
            x: mouse.x + getRandomInt(0, 0),
            y: mouse.y + getRandomInt(0, 0),
            size: getRandomInt(1, 2) // Further reduce particle size
        }
        this.end = {
            x: this.start.x - getRandomInt(-20, 20), // Reduce dispersion
            y: this.start.y - getRandomInt(-20, 20) // Reduce dispersion
        }

        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;

        this.style = "rgb(148, 87, 235)"; // Golden color

        this.time = 0;
        this.ttl = 120;
    }

    draw() {
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        if (this.time <= this.ttl) {
            let progress = 1 - (this.ttl - this.time) / this.ttl;

            this.size = this.start.size * (1 - easeOutQuart(progress));
            this.x = this.x + (this.end.x - this.x) * 0.01;
            this.y = this.y + (this.end.y - this.y) * 0.01;
        }
        this.time++;
    }
}

window.addEventListener("DOMContentLoaded", function () {
    init();

    // Append the canvas to the body and set its styles
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
});

window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);



document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflowX = 'hidden';
  });