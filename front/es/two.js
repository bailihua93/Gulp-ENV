
async function f() {
  return 'hello world';
}

f().then(v => console.log(v));

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
console.log(p.toString());
