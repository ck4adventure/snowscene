

const canvas = document.createElement('canvas');
canvas.id = 'snow';
canvas.height = 800;
canvas.width = 1000;

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

  const ctx = canvas.getContext('2d');
  //TODO: set this number to a variable
  let mp = 225;
  var particles = [];
  for (let i = 0; i < mp; i++) {
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*4+1, //can make the snow bigger or larger, which also affects speed
      d: Math.random()*mp,
      a: Math.random(),
      // a: 0
    });
  }

  function draw() {
    ctx.clearRect( 0, 0, W, H);

    ctx.fillStyle = "rgba(232,232,227, 1)";
    ctx.beginPath();
    for (let i = 0; i < mp; i++) {
      const p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    update();
  }

   let angle = 0;
  function update() {
     angle += 0.01;
    for(let i = 0; i < mp; i++) {
      let p = particles[i];
      // p.y += 1;
      // p.x += 1;
      p.a += 0.01;
      // p.y += Math.cos(angle+p.d) + 1 + p.r/2;

      //TODO set downward velocity through here
      p.y += Math.cos(p.a + p.d) + 1 + p.r/2;
      p.x += Math.sin(p.a + p.d) * 1;

      // code to get the particles to wrap
      if(p.x > W+5 || p.x < -5 || p.y > H) {
        if(i%3 > 0) //66.67% of the flakes
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
