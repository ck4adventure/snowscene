/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__snow_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__snow_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__snow_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__flake__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__flake___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__flake__);



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



  const flake = new __WEBPACK_IMPORTED_MODULE_1__flake___default.a(x, y, r, d, a, i, ctx);

  particles.push(flake);
}


// function animate () {
//   requestAnimationFrame(animate);
//   ctx.clearRect(0,0,innerWidth, innerHeight);
//   for (var i = 0; i < particles.length; i++) {
//     particles[i].snow();
//   }
//
// }
var stop = false;
var fps, fpsInterval, startTime, now, then, elapsed;

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
        // Put your drawing code here
          ctx.clearRect(0,0,innerWidth, innerHeight);
          for (var i = 0; i < particles.length; i++) {
            particles[i].snow();
          }
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function Snow (W, H, ctx, particles) {
  this.W = W;
  this.H = H;
  this.ctx = ctx;
  this.particles = particles;

  this.update = function (values) {
    //pass in a values object
    
  };

  this.draw = function () {
    ctx.clearRect( 0, 0, W, H);

    //set color
    ctx.fillStyle = "rgba(228,228,218, 0.6)";
    // const gradient = ctx.createLinearGradient(0,0,0,H);
    // gradient.addColorStop(0, "pink");
    // gradient.addColorStop(0.5, "yellow");
    // gradient.addColorStop(0.7, "white");
    // gradient.addColorStop(1.0, "orange");
    // ctx.fillStyle = gradient;

    //surreal halo effect
    ctx.shadowBlur = 6;
    ctx.shadowColor = "white";

    //actual draw
    ctx.beginPath();
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      ctx.moveTo(p.x, p.y);
      // just a circle for each snowflke
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    // may need to move snow function

  };



  //originally with a set angle 0 for each dot, regardless
  //let angle = 0;
  //this is what updates the positions, the vectors for snowfall
  this.snow = function () {
    // here it would be incremented for each time
    // angle += 0.01;
    for(let i = 0; i < particles.length; i++) {
      let p = particles[i];
      //currently updating the individual angle inside the for loop
      p.a += 0.01;

      //TODO set downward velocity through here
      // p.y += Math.cos(angle+p.d) + 1 + p.r/2; //old y with angle
      p.y += Math.cos(p.a + p.d) + 1 + p.r/2;
      // p.x += Math.sin(p.a)*1;
      //added in density as an extra factor in the side to side movement
      p.x += Math.sin(p.a + p.d) * 1;

      // code to get the particles to wrap
      // here we start by grabbing them if out of bounds
      if(p.x > W+5 || p.x < -5 || p.y > H) {
        if(i%10 > 0) //66.67% of the flakes %3 //%10 seems to create less border bunching
        {
          particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d, a: p.a };
        }
        else
        {
          //If the flake is exitting from the right
          if(Math.sin(p.a) > 0)
          {
            //Enter from the left
            particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d, a: p.a };
          }
          else
          {
            //Enter from the right
            particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d, a: p.a };
          }
        }
      }
    }
    //end of snow function below
  };
//END OF SNOW
}

 module.exports = Snow;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Flake (x, y, r, d, a, i, ctx) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.d = d;
  this.a = a;
  this.i = i;

  this.draw = function () {
    ctx.fillStyle = "rgba(228, 228, 218, 0.6)";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
    ctx.fill();
  };

  this.update = function () {
    this.a += 0.01;
    // this.y += Math.cos( this.a + this.d) + 1 + this.r/2;
    this.y += Math.cos( this.a + this.d ) + 0.1 + this.r/2;
    this.x += Math.sin( this.a + this.d ) * 1;

    if(this.x > innerWidth + 5 || this.x < -5 || this.y > innerHeight) {
      if( this.i % 10 > 0 ) {
        this.x = Math.random()*innerWidth;
        this.y = -10;
      } else {
        //exiting from the right
        if (Math.sin(this.a) > 0) {
          //enter from the left
          this.x = -5;
          this.y = Math.random()*innerHeight;
        } else {
          //enter from the right
          this.x = innerWidth + 5;
          this.y = Math.random()*innerHeight;
        }
      }
    }


  };

  this.snow = function () {
    this.draw();
    this.update();
  };
}

module.exports = Flake;


/***/ })
/******/ ]);