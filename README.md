<div align='center'>
<h1>Chalko</h1>
<p>for the browser</p>
<img src="./media/screenshot.png" alt="">
</div>
<br/>
<br/>
> Just like [chalk](https://github.com/chalk/chalk) but right in your browser.
<br/>
<br/>
## Features

- Expressive API
- Highly performant
- Ability to nest styles
- Customizable
- Doesn't extend `String.prototype`
- Clean and focused
- Actively maintained

## Install

```console
$ npm install chalko
```

## Usage

### HTML

```html
<div id='console'></div>
```

### JavaScript

```js
import chalko from 'chalko';

const consoleBox = document.getElementById('console');

function log(...data) {
    consoleBox.innerHTML += `<div>${data.join(' ')}</div>`;
}

log(chalko.blue('Hello World!'));
```

## Demo

To run the [demo](https://github.com/henryhale/chalko/blob/master/demo), clone this repo and simply open the [index.html](https://github.com/henryhale/chalko/blob/master/demo/index.html) file in your browser.

## API

The one difference with [inken](https://github.com/henryhale/inken) is styles can be chained with [chalko](https://github.com/henryhale/chalko).

```js
import chalko from 'chalko';

...

log(chalko.bgBlack.yellow.italic('Hello, World!'));
```

## Styles

### Modifiers

- `bold` - Make the text bold.
- `dim` - Make the text have lower opacity (sets css opacity to `0.5`).
- `italic` - Make the text italic.
- `underline` - Underline the text.
- `strikethrough` - Put a horizontal line through the center of the text.

### User defined

- `fg` - Set a custom foreground color (text color)
- `bg` - Set a custom background color

### Colors

- `black`
- `red`
- `green`
- `yellow`
- `blue`
- `magenta`
- `cyan`
- `white`
- `gray`

### Background colors

- `bgBlack`
- `bgRed`
- `bgGreen`
- `bgYellow`
- `bgBlue`
- `bgMagenta`
- `bgCyan`
- `bgWhite`
- `bgGray`

## Related

- [Inken](https://github.com/henryhale/inken) - terminal-like string styling for the browser

## LICENSE

Released under the [MIT License](https://github.com/henryhale/chalko/blob/master/LICENSE)
