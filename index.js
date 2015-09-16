console.log("Here we go");
console.dir(Date.now());

var colors = ['#F00'];//,'#0F0','#00F','#FF0','#F0F','#0FF'];
var circles = colors.map(function(color){
  return new Circle(color);
});

function Circle (color) {
  this.target = {
    x: 0,
    y: 50,
  }
  this.color = color;
  this.x = window.innerWidth / 2;
  this.y = 50;
  this.dx = 0;
  this.dy = 0;
}

var friction = 0.01;
var gravity = 1.1;
Circle.prototype.step = function(d){
  this.dx /= gravity;
  this.dy /= gravity;
  this.dy += (this.target.y - this.y) * friction;
  this.dx += (this.target.x - this.x) * friction;

  this.x += this.dx;
  this.y += this.dy; 
}
Circle.prototype.draw = function(ctx){
  ctx.fillStyle = 'black';
  var path=new Path2D();
  path.arc(this.x,this.y,50,50,Math.PI*2,true);
//  ctx.fillRect(this.x, this.y,50,50);
  ctx.fill(path);
}

var left = true;
var ctx = document.getElementById('canvas').getContext('2d');
ctx.width = 1000;
ctx.height = 800;
window.addEventListener('click', function(event){
  console.log("CLICKED");
  var targetX = left ? 50 : window.innerWidth - 50;
  left = !left;
  circles.forEach(function(circle){
    circle.target.x = targetX;
  });
});

function draw(t) {
  ctx.fillStyle = 'white';
  ctx.clearRect(0,0, 2000, 1000)
  circles.forEach(function(circle){
    circle.step();
    circle.draw(ctx);
    ctx.restore();
  });
  window.requestAnimationFrame(draw);

}

window.requestAnimationFrame(draw);

/*
var heart = document.querySelector('.picker');
translateX(heart, window.width/2);


function translateX (el, px) {
  el.style.transform = "translateX(" + px + "px)";
  debugger;
}
*/
