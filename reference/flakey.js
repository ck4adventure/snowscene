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
    if(this.x > innerWidth + this.r || this.x < -this.r || this.y > innerHeight) {
      //%10 original //x widths were 5, -5 above
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

  // this.light = function () {
  //   this.a += 0.01;
  //   // this.y += Math.cos( this.a + this.d) + 1 + this.r/2;
  //   this.y += Math.cos( this.a + this.d ) + 0.1 + this.r/2;
  //   this.x += Math.sin( this.a + this.d ) + this.wind;
  //
  //   if(this.x > innerWidth + this.r || this.x < -this.r || this.y > innerHeight) {
  //     //%10 original //x widths were 5, -5 above
  //     if( this.i % 10 > 0 ) {
  //       this.x = Math.random()*innerWidth;
  //       this.y = -10;
  //     } else {
  //       //exiting from the right
  //       if (Math.sin(this.a) > 0) {
  //         //enter from the left
  //         this.x = -5;
  //         this.y = Math.random()*innerHeight;
  //       } else {
  //         //enter from the right
  //         this.x = innerWidth + 5;
  //         this.y = Math.random()*innerHeight;
  //       }
  //     }
  //   }
  // };


  this.snow = function () {
    this.draw();
    this.light();
  };
}

module.exports = Flake;
