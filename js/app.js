

const canvas = document.createElement('canvas');
canvas.id = 'snow';
// canvas.height = 800;
// canvas.width = 1200;
canvas.height = window.innerHeight * 0.8;
canvas.width = window.innerWidth * 0.8;
const container = document.getElementById('container');
container.appendChild(canvas);

window.onload = function() {
  const canvas = document.getElementById("snow");
  //after getting canvas we loaded, set to top left corner
  // canvas.style.position = 'absolute';
  // canvas.style.top = 0;
  // canvas.style.left = 0;

  const W = canvas.width;
  const H = canvas.height;

//pixel sizes for snow flake dots //4
  const snowFlakeSizeMax = 2;
  const snowFlakeSizeMin = 0.5;
  //TODO eventually get the density as a ratio to window size,
  // currently is literal count of points 220
  const snowFallDensity = 1000;

  const ctx = canvas.getContext('2d');
  //TODO: set this number to a variable
  let mp = 800;
  var particles = [];
  for (let i = 0; i < mp; i++) {
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H, //old r +1
      r: Math.random()*3+1, //can make the snow bigger or larger, which also affects speed
      d: Math.random()*220, //density
      a: Math.random(), //starting angle before it hits the vector equation

    });
  }

  function draw() {
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
    ctx.beginPath();
    for (let i = 0; i < mp; i++) {
      const p = particles[i];

      ctx.moveTo(p.x, p.y);
      // just a circle for each snowflke
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    update();
  }
  //originally with a set angle 0 for each dot, regardless
  //let angle = 0;
  //this is what updates the positions, the vectors for snowfall
  function update() {
    // here it would be incremented for each time
    // angle += 0.01;

    for(let i = 0; i < mp; i++) {
      let p = particles[i];
      //currently updating the angle inside the for loop
      p.a += 0.01;

      //TODO set downward velocity through here
      // p.y += Math.cos(angle+p.d) + 1 + p.r/2; //old y with angle
      p.y += Math.cos(p.a + p.d) + 1 + p.r/2;
      // p.x += Math.sin(p.a)*1;
      //added in density as an extra factor in the side to side movement
      p.x += Math.sin(p.a + p.d) * 1;

      // code to get the particles to wrap
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
  }
  setInterval(draw, 40);
};
