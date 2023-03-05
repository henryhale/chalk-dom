import c from "../index.js";

const app = document.getElementById('app');

function log(...data) {
    app.innerHTML += `<div>${data.join(' ')}</div>`;    
}

/**
 * Examples originally from
 * 
 * ->   Chalk   (https://github.com/chalk/chalk)
 * 
 */

log(c.blue('Hello World!'));

// Combine styled and normal strings
log(c.blue('Hello') + ' World' + c.red('!'));

// Compose multiple styles using the chainable API
log(c.blue.bgRed.bold('Hello World!'));

// Pass in multiple arguments
log(c.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// Nest styles
log(c.red('Hello', c.underline.bgBlue('World') + '!'));

// Nest styles of the same type even (color, underline, background)
log(c.green(
	'I am a green line ' +
	c.blue.underline.bold('with a blue substring') +
	' that becomes green again!'
));

// ES2015 template literal
log(c.gray(`
CPU: ${c.red('90%')}
RAM: ${c.green('40%')}
DISK: ${c.yellow('70%')}
`));

// Reusability
const error = c.bold.bgRed.white;
const warning = c.italic.bg('orange');

log(error('Error!'));
log(warning('Warning!'));


// Custom Styles with .bg (background) or .fg (foreground - text color)
log(c.bg('#009900')('Hello, Dev!'));
log(
    c.bg('#009900').fg('rgba(0,255,0, 0.85)').underline('**Code Daily**'),
);

log('<div style="margin: 2rem 0"></div>');

// All Styles
log(
    c.white.bold('bold'),
    c.white.dim('dim'),    
    c.white.italic('italic'),
    c.white.underline('underline'),    
    c.white.strikethrough('strikethrough'),    
    c.black('black'),
    c.red('red'),
    c.green('green'),
    c.yellow('yellow'),
    c.blue('blue'),
    c.magenta('magenta'),
    c.cyan('cyan'),
    c.white('white'),
    c.gray('gray'),
    c.bgBlack.white('bgBlack'),
    c.bgRed('bgRed'),
    c.bgGreen('bgGreen'),
    c.bgYellow('bgYellow'),
    c.bgBlue.white('bgBlue'),
    c.bgMagenta('bgMagenta'),
    c.bgCyan('bgCyan'),
    c.bgWhite('bgWhite'),
    c.bgGray('bgGray'),
);
