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

// from canvas on was originally packed into the window.onload, but it seems
// a bit much to keep track of, can refactor it back in later
// window.onload = function() {};
// const canvas = document.getElementById("snow");
//after getting canvas we loaded, set to top left corner
// canvas.style.position = 'absolute';
// canvas.style.top = 0;
// canvas.style.left = 0;
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


function animate () {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth, innerHeight);
  for (var i = 0; i < particles.length; i++) {
    particles[i].snow();
  }

}

animate();
// var snow = new Snow(W, H, ctx, particles);
// const letItSnow = function () {
//   // Snow.update(particles);
//
//
//   snow.draw();
//   snow.snow();
// };
// // snow.draw();
//
// setInterval(letItSnow, 40);
