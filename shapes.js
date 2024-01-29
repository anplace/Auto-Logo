// Creates a class that defines a shape with a color property and a method to set the color.
class Shape {
  constructor() {
    this.color = '';
  }
  setColor(color) {
    this.color = color;
  }
}
// Creates a class to create a circle with specific paramaters and a given color.
class Circle extends Shape {
  render() {
    return `<circle cx="50%" cy="50%" r="100" fill="${this.color}"/>`;
  }
}

// Creates a class to create a square with specific paramaters and a given color.
class Square extends Shape {
  render() {
    return `<rect x="50" height="200" width="200" fill="${this.color}"/>`;
  }
}

// Creates a class to create a triangle with specific paramaters and a given color.
class Triangle extends Shape {
  render() {
    return `<polygon points="50,250 250,250 150,50" fill="${this.color}"/>`;
  }
}

module.exports = { Circle, Square, Triangle };
