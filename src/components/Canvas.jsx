//in prevoius assignments and CA also of FWD-2 and FWD-3 i have used similer kinds of canvas element now it's varint for react where
// we put this whole in use effect and dependencey of emplty arry means render once

import React, { useEffect } from "react";

function Canvas() {
  useEffect(() => {
  
    //use of 2d context 
    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    // here we define our colour pallet
    const colors = ["white", "skyblue", "gray"];

    const gravity = 1;
    const friction = 0.7;

    const balls = [];

    function randomIntFromRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function randomColor(colors) {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function Ball(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = color;

      this.update = () => {
        if (this.y + this.radius + this.dy > canvas.height) {
          this.dy = -this.dy;
          this.dy = this.dy * friction;
          this.dx = this.dx * friction;
        } else {
          this.dy += gravity;
        }

        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
          this.dx = -this.dx * friction;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      };

      this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
      };
    }

    function init() {
      if (!canvas.width || !canvas.height) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      balls.length = 0;

      for (let i = 0; i < 80; i++) {
        const radius = randomIntFromRange(8, 20);
        const x = randomIntFromRange(radius, canvas.width - radius);
        const y = randomIntFromRange(0, canvas.height - radius);
        const dx = randomIntFromRange(-2, 2);
        const dy = randomIntFromRange(-2, 2);
        const color = randomColor(colors);
        balls.push(new Ball(x, y, dx, dy, radius, color));
      }
    }

    //an recursive funtiom animate to clear and =animate new balls
    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach((ball) => ball.update());
    }

    init();
    animate();

    
    // adding some event handlers for invocking up the funtion

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener("click", () => {
      init();
    });

    window.addEventListener("resize", resizeHandler);

    const mouseMoveHandler = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const clickHandler = () => {
      init();
    };

// with the useffect thing i am cleaning up some of my event which ii didn't want to be called when render is done 

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("click", clickHandler);
    };
  }, []);

  return <canvas></canvas>;
}

export default Canvas;
