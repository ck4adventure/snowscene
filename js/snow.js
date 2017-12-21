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
