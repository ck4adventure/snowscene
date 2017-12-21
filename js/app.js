import Snow from './snow.js';
import Flake from './flake';

const canvas = document.createElement('canvas');
canvas.id = 'snow';
// canvas.height = 800;
// canvas.width = 1200;
canvas.height = window.innerHeight * 0.8;
canvas.width = window.innerWidth * 0.8;
const container = document.getElementById('container');
container.appendChild(canvas);

const ctx = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;
});

//pixel sizes for snow flake dots //4
const snowFlakeSizeMax = 4;
const snowFlakeSizeMin = 1;

//TODO eventually get the density as a ratio to window size,
// currently is literal count of points //220
const snowFallParticles = 800; //mp

var particles = [];
for (let i = 0; i < snowFallParticles; i++) {
  // console.log(i);
    let x = Math.random()*W;
    let y = Math.random()*H; //old r +1
    let r = Math.random() * snowFlakeSizeMax + snowFlakeSizeMin; //can make the snow bigger or larger, which also affects speed
    let d = Math.random() * 220; //density ranging from near zero to 219
    let a = Math.random(); //starting angle before it hits the vector equation

  const flake = new Flake(x, y, r, d, a, i, ctx);
  particles.push(flake);
}


//ANIMATION
var stop = false;
var fpsInterval, startTime, now, then, elapsed;

startAnimating(25);

function startAnimating(fps) {
  fpsInterval = 1000/fps;
  then = Date.now();
  startTime = then;
  console.log(startTime);
  animate();
}


function animate() {
    //able to stop
    if (stop) {
      return;
    }
    // request another frame
    requestAnimationFrame(animate);
    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;
    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);
        // actual drawing code here
          ctx.clearRect(0,0,innerWidth, innerHeight);
          for (var i = 0; i < particles.length; i++) {
            particles[i].snow();
          }
    }
}
animate();
