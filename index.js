const userDefined = ['bg', 'fg'];

const modifiers = ['dim', 'bold', 'italic', 'underline', 'strikethrough', 'inverse'];

const colors = {
    black:  '#000000',
    red:    '#EF4444',
    green:  '#22C55E',
    yellow: '#FDE047',
    blue:   '#3B82F6',
    magenta: '#E879F9',
    cyan:   '#22D3EE',
    white:  '#FFFFFF',
    gray:   '#71717A'
};

for (const c in colors) {
    if (Object.hasOwnProperty.call(colors, c)) {
        colors['bg'+c[0].toUpperCase()+c.slice(1)] = colors[c];
    }
}

const defaultConfig = {
    bg: null,
    fg: null,
    dim: false,
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    inverse: false,
};

class Chalk {
    constructor(options = { nest: false }) {
        /**
         * @private api
         */
        this._isNested = !!options?.nest;
        /**
         * @private api
         */
        this._config = Object.assign({}, defaultConfig);

        const $self = this;

        for (const color in colors) {
            if (Object.hasOwnProperty.call(colors, color)) {
                Object.defineProperty($self, color, {
                    get() {
                        if (!this._isNested) {
                            return $self._create(true)[color];
                        }
                        if (colors[color].length > 0) {
                            $self._config[color.startsWith('bg') ? 'bg' : 'fg'] = colors[color];
                        }
                        return $self._create(false);
                    }
                });
            }
        }

        for (const item of modifiers) {
            Object.defineProperty($self, item, {
                get() {
                    if (!this._isNested) {
                        return $self._create(true)[item];
                    }
                    $self._config[item] = true;
                    return $self._create(false);
                }
            });
        }

        for (const style of userDefined) {
            Object.defineProperty($self, style, {
                get() {
                    if (!this._isNested) {
                        return $self._create(true)[style];
                    }
                    return (val) => {
                        $self._config[style] = val;
                        return $self._create(false);
                    };
                }
            });
        }

    }

    /**
     * @private api
     * @param {boolean} flag
     */
    _create(flag) {
        const $self = !flag ? this : new Chalk({ nest: true });
        const fn = $self.toString.bind($self);
        Object.setPrototypeOf(fn, $self);
        return fn;
    }

    /**
     * @private
     */
    _reset() {
        if (!this._isNested) {
            this._config = Object.assign({}, defaultConfig);
        }
    }

    toJSON() {
        return this.toString();
    }

    toString() {
        const args = arguments;
        const argsLen = arguments.length;
        let data = String(args[0]);

        if (argsLen === 0) {
            return '';
        }

        if (argsLen > 1) {
            for (let i = 1; i < argsLen; i++) {
                data += ' ' + args[i];
            }
        }

        const { bg, fg, bold, italic, underline, strikethrough, dim, inverse } = this._config;

        const wrap = bg || fg || dim;

        const bgColor = inverse ? fg : bg;
        const fgColor = inverse ? bg : fg;

        const output = (wrap ? '<span style="' : '') +
        (bgColor ? 'background-color:' + bgColor + ';' : '') +
        (fgColor ? 'color:' + fgColor + ';' : '') +
        (dim ? 'opacity:0.5;' : '') +
        (wrap ? '">' : '') +
        (bold ? '<b>' : '') +
        (underline ? '<u>' : '') +
        (strikethrough ? '<s>' : '') +
        (italic ? '<i>' : '') +
        (data || '') +
        (italic ? '</i>' : '') +
        (strikethrough ? '</s>' : '') +
        (underline ? '</u>' : '') +
        (bold ? '</b>' : '') +
        (wrap ? '</span>' : '');

        this._reset();

        return output;
    }
}

export default new Chalk();
