/* a vector constructor */
// function Vector(x, y) {
//   this.x = x || 0
//   this.y = y || 0
// }

function Vector() {
  if (!arguments.length) throw new Error('Vector requires at least one number argument')
  for (var i = 0; i < arguments.length; i++) {
    if (isNaN(arguments[i])) throw new Error('Vector components must be numbers')
    this[i] = arguments[i]
  }
  this.dimensions = arguments.length
}

/* returns magnitude of vector */
Vector.prototype.magnitude = function() {
  var s = 0
  for (var i = 0; i < this.dimensions; i++) {
    s += this[i]*this[i]
  }
  return Math.sqrt(s)
}

/* returns distance between two vectors */
Vector.prototype.distance = function() {
  if (!arguments.length) throw new Error('Vector distance method requires at least one argument')
  var v
  if (arguments.length === 1 && arguments[0] instanceof Vector) {
    v = arguments[0]
  } else {
    v = arguments
  }
  if (this.dimensions !== v.dimensions && this.dimensions !== v.length) throw new Error('Vector dimensions must match to find distance between')
  var s = 0
  for (var i = 0; i < this.dimensions; i++) {
    s += (this[i] - v[i])*(this[i] - v[i])
  }
  return Math.sqrt(s)
}

/* returns sum of two vectors, or  */
Vector.prototype.plus = function(x, y) {
  if (this.dimensions !== v.dimensions) throw new Error('Vector dimensions must match to add')
  // TODO: RETURN HERE TO CONTINUE WORKING
  if (!y && y !== 0) {
    x = x.x
    y = x.y
  }

  return new Vector(this.x + x, this.y + y)
}

/* sugar for plus */
Vector.prototype.move = function(x, y) {
  this.plus(x, y)
}

/* return difference of two vectors */
Vector.prototype.minus = function(x, y) {
  if (!y && y !== 0) {
  //   console.log('Vector minus no y', x, y)
    // x = x.x
    // y = x.y

    return new Vector(this.x - x.x, this.y - x.y)
  }

  // console.log('Vector minus x,y',  x, y)

  return new Vector(this.x - x, this.y - y)
}

/* returns product of scalar and vector */
Vector.prototype.times = function(c) {
  return new Vector(c * this.x, c * this.y)
}

/* return dot product of two vectors */
Vector.prototype.dot = function(v) {
  return this.x*v.x + this.y*v.y
}

/* if vector as argument is given, returns angle of separation between two vectors*/
/* otherwise, returns angle to positive x-axis */
Vector.prototype.angle = function(x, y) {
  if (!x && x !== 0) {
    x = 1
    y = 0
  } else if (!y && y !== 0) {
    x = x.x
    y = x.y
  }

  var cos = (this.x*x + this.y*y) / (this.magnitude() * Math.sqrt(x*x + y*y))
  cos = (isNaN(cos)) ? 1 : cos

  // console.log('cos', cos)
  return (this.y >= 0) ? Math.acos(cos) : -Math.acos(cos)
}

/* projects the vector onto another */
Vector.prototype.project = function(x, y) {
  if (!y && y !== 0) {
    x = x.x
    y = x.y
  }

  var coef = (this.x*x + this.y*y) / (x*x + y*y)
  return new Vector(coef * x, coef * y)
}

/* rotates the Vector n radians */
Vector.prototype.rotation = function(n) {
  /* if n is undefined return a random rotation */
  if (!n/* && n !== 0*/) {
    // n = Math.PI * Math.random()
    n = 0
  }

  /* compute magnitude and angle of new vector */
  var r = this.magnitude()
  var angle = this.angle() + n
  // console.log('r, angle', r, angle)

  /* compute Cartesian components of new vector */
  var x = r * Math.cos(angle)
  var y = r * Math.sin(angle)

  // console.log('x y', x, y)
  return new Vector(x, y)
}

Vector.prototype.unit = function(x, y) {
  if (!x || !y) {
    var magnitude = this.magnitude()
    return new Vector(this.x/magnitude, this.y/magnitude)
  }

  var magnitude = Math.sqrt(x*x + y*y)
  return new Vector(x/magnitude, y/magnitude)
}

module.exports = Vector
