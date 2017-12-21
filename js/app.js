// import Snow from './snow.js';
import Flake from './flake';

//ANIMATION
var stop = false;
var fpsInterval, startTime, now, then, elapsed;

var particles = [];

const canvas = document.createElement('canvas');
canvas.id = 'snow';

canvas.height = window.innerHeight * 0.8;
canvas.width = window.innerWidth * 0.8;
const container = document.getElementById('container');
container.appendChild(canvas);

const ctx = canvas.getContext('2d');

var W = canvas.width;
var H = canvas.height;

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;
  W = canvas.width;
  H = canvas.height;
  createSnowflakes();

});

//pixel sizes for snow flake dots - my fav is max 4
const snowFlakeSizeMin = 1;

//TODO eventually get the density as a ratio to window size,
// currently is literal count of points //220

//snowflake count slider
var densitySliderEl = document.getElementsByClassName('slider')[0];
var currentDensityEl = document.getElementById('currentDensity');

currentDensityEl.innerHTML = densitySliderEl.value;
var snowFallParticles = parseInt(densitySliderEl.value);

densitySliderEl.oninput = function() {
  // stop = true;
  snowFallParticles = parseInt(this.value);
  createSnowflakes();
  // stop = false;
  currentDensityEl.innerHTML = this.value;
};

//snowflake max size slider
var maxSizeSliderEl = document.getElementsByClassName('slider')[1];
var currentMaxSizeEl = document.getElementById('currentMaxSize');

currentMaxSizeEl.innerHTML = maxSizeSliderEl.value;
var snowFlakeSizeMax = parseInt(maxSizeSliderEl.value);

maxSizeSliderEl.oninput = function() {
  snowFlakeSizeMax = parseInt(this.value);
  createSnowflakes();
  currentMaxSizeEl.innerHTML = this.value;
};




function createSnowflakes () {
  particles = [];
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
}



//ANIMATION
startAnimating(25);

function startAnimating(fps) {
  fpsInterval = 1000/fps;
  then = Date.now();
  startTime = then;
  // console.log(startTime);
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
createSnowflakes();
animate();
