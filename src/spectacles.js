export function confetti() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  
    // Make sure the canvas is in the foreground
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1000'; // Ensure canvas is on top
  
    var mp = 1000; // Max particles
    var particles = [];
    for (var i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W, // x-coordinate
        y: Math.random() * H, // y-coordinate
        r: Math.random() * 18 + 1, // radius
        d: Math.random() * mp, // density
        color: "rgba(" + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", 0.8)",
        tilt: Math.floor(Math.random() * 5) - 5
      });
    }
  
    // Draw the particles (confetti)
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < mp; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.tilt + p.r / 2, p.y + p.tilt);
        ctx.stroke();
      }
      update();
    }
  
    var angle = 0;
  
    function update() {
      angle += 0.01;
      for (var i = 0; i < mp; i++) {
        var p = particles[i];
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;
  
        // Respawn particles when they go off-screen
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) {
            particles[i] = {
              x: Math.random() * W,
              y: -10,
              r: p.r,
              d: p.d,
              color: p.color,
              tilt: p.tilt
            };
          }
        }
      }
    }
  
    // Start the confetti animation
    var intervalId = setInterval(draw, 20);
  
    // Stop confetti after a few seconds (e.g., 3 seconds)
    setTimeout(() => {
      clearInterval(intervalId); // Stop drawing
      ctx.clearRect(0, 0, W, H);  // Clear the canvas
      canvas.style.zIndex = '-1'; // Ensure canvas is on top
    }, 3000); // Adjust the duration (3000 ms = 3 seconds)

  }
  