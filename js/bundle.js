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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flake__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flake___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__flake__);
// import Snow from './snow.js';


//ANIMATION
var stop = false;
var fpsInterval, startTime, now, then, elapsed;

var particles = [];

const canvas = document.createElement("canvas");
canvas.id = "snow";

canvas.height = window.innerHeight * 0.8;
// canvas.width = window.innerWidth * 0.8;
canvas.width = window.innerWidth;
const container = document.getElementById("container");
container.appendChild(canvas);

const ctx = canvas.getContext("2d");

var W = canvas.width;
var H = canvas.height;

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight * 0.8;
  canvas.width = window.innerWidth;

  W = canvas.width;
  H = canvas.height;
  createSnowflakes();
});

//pixel sizes for snow flake dots - my fav is max 4
const snowFlakeSizeMin = 1;

//TODO eventually get the density as a ratio to window size,
// currently is literal count of points //220

//snowflake count slider
var densitySliderEl = document.getElementsByClassName("slider")[0];
var currentDensityEl = document.getElementById("currentDensity");

currentDensityEl.innerHTML = densitySliderEl.value;
var snowFallParticles = parseInt(densitySliderEl.value);

densitySliderEl.oninput = function () {
  // stop = true;
  snowFallParticles = parseInt(this.value);
  createSnowflakes();
  // stop = false;
  currentDensityEl.innerHTML = this.value;
};

//snowflake max size slider
var maxSizeSliderEl = document.getElementsByClassName("slider")[1];
var currentMaxSizeEl = document.getElementById("currentMaxSize");

currentMaxSizeEl.innerHTML = maxSizeSliderEl.value;
var snowFlakeSizeMax = parseInt(maxSizeSliderEl.value);

maxSizeSliderEl.oninput = function () {
  snowFlakeSizeMax = parseInt(this.value);
  createSnowflakes();
  currentMaxSizeEl.innerHTML = this.value;
};

//wind drift slider
var windDriftSliderEl = document.getElementsByClassName("slider")[2];
var currentWindDriftEl = document.getElementById("currentWindDrift");

currentWindDriftEl.innerHTML = windDriftSliderEl.value;
var currentWindDriftLevel = parseInt(windDriftSliderEl.value);

windDriftSliderEl.oninput = function () {
  currentWindDriftLevel = parseInt(this.value);
  createSnowflakes();
  currentWindDriftEl.innerHTML = this.value;
};

function createSnowflakes() {
  particles = [];
  for (let i = 0; i < snowFallParticles; i++) {
    // console.log(i);
    let x = Math.random() * W;
    let y = Math.random() * H; //old r +1
    let r = Math.random() * snowFlakeSizeMax + snowFlakeSizeMin; //can make the snow bigger or larger, which also affects speed
    let d = Math.random() * 220; //density ranging from near zero to 219
    let a = Math.random(); //starting angle before it hits the vector equation
    let wind = currentWindDriftLevel;
    //let wind = 1;
    const flake = new __WEBPACK_IMPORTED_MODULE_0__flake___default.a(x, y, r, d, a, i, ctx, wind);
    particles.push(flake);
  }
}

//ANIMATION  25
startAnimating(25);

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
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
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < particles.length; i++) {
      particles[i].snow();
    }
  }
}
createSnowflakes();
animate();


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function Flake (x, y, r, d, a, i, ctx, wind) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.d = d;
  this.a = a;
  this.i = i;
  this.wind = wind;

  this.draw = function () {
    ctx.fillStyle = "rgba(228, 228, 218, 0.6)";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
    ctx.fill();
  };

  this.light = function () {
    this.a += 0.01;
    // this.y += Math.cos( this.a + this.d) + 1 + this.r/2;
    this.y += Math.cos( this.a + this.d ) + 0.5 + this.r/2;
    this.x += Math.sin( this.a + this.d ) + this.wind;

    //need to find a different way of recycling dots



    if (this.y > innerHeight) {
      //%10 original //x widths were 5, -5 above
      if ( this.i % 10 > 0 ) {
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
    } else if (this.x > innerWidth + this.r ) {
      //exiting on right side, push around to left
      this.x = -this.r;
    } else if (this.x < -this.r) {
      //exiting from the left side (shouldn't happen much)
       this.x = innerWidth + this.r;
    }
  };


  this.snow = function () {
    this.draw();
    this.light();
  };
}

module.exports = Flake;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map