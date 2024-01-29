const filesystem = require('./node_modules/graceful-fs/graceful-fs');
const inquirer = require('inquirer');
const { Circle, Square, Triangle } = require('./shapes');

class Svg {
  constructor() {
    this.textElement = '';
    this.shapeElement = '';
  }
  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }
  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }
  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }
}

const questions = [
  {
    type: 'list',
    name: 'pixel-image',
    message: 'What shape would you like your logo to be?',
    choices: ['Circle', 'Square', 'Triangle'],
  },
  {
    type: 'input',
    name: 'shape',
    message:'What color would you like the logo to be? (OR a hexadecimal number):',
  },
  {
    type: 'input',
    name: 'text',
    message: 'Enter 3 letters to be the text of your logo:',
  },
  {
    type: 'input',
    name: 'text-color',
    message:
      'What color would you like the text to be? (OR enter a hexadecimal number):',
  },
];

function writeToFile(fileName, data) {
  console.log('Writing [' + data + '] to file [' + fileName + ']');
  filesystem.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Congratulations, you have Generated a logo.svg!');
  });
}

async function init() {
  console.log('Starting init');
  let svgString = '';
  const svgFile = 'Your-Logo.svg';

  const answers = await inquirer.prompt(questions);

  let userText = '';
  if (answers.text.length > 0 && answers.text.length < 4) {
    userText = answers.text;
  } else {
    console.log('Invalid user text field detected! Please enter 1-3 characters, no more and no less');
    return;
  }
  console.log(`User text: [${userText}]`);

  const userFontColor = answers['text-color'];
  console.log(`User font color: [${userFontColor}]`);

  const userShapeColor = answers.shape;
  console.log(`User shape color: [${userShapeColor}]`);

  const userShapeType = answers['pixel-image'];
  console.log(`User entered shape = [${userShapeType}]`);

  let userShape;
  if (userShapeType === 'Square' || userShapeType === 'square') {
    userShape = new Square();
    console.log('User selected Square shape');
  } else if (userShapeType === 'Circle' || userShapeType === 'circle') {
    userShape = new Circle();
    console.log('User selected Circle shape');
  } else if (userShapeType === 'Triangle' || userShapeType === 'triangle') {
    userShape = new Triangle();
    console.log('User selected Triangle shape');
  } else {
    console.log('Invalid shape!');
    return;
  }
  userShape.setColor(userShapeColor);

  const svg = new Svg();
  svg.setTextElement(userText, userFontColor);
  svg.setShapeElement(userShape);
  svgString = svg.render();

  console.log(`Displaying shape:\n\n${svgString}`);

  console.log('Shape generation complete!');
  console.log('Writing shape to file...');
  writeToFile(svgFile, svgString);
}

init();
