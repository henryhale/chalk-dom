const userDefined = ['bg', 'fg'];

const modifiers = ['dim', 'bold', 'italic', 'underline', 'strikethrough'];

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
        
        const { bg, fg, bold, italic, underline, strikethrough, dim } = this._config;
        
        const wrap = bg || fg || dim;

        const output = (wrap ? '<span style="' : '') +
        (this._config.bg ? 'background-color:' + this._config.bg + ';' : '') +
        (this._config.fg ? 'color:' + this._config.fg + ';' : '') + 
        (this._config.dim ? 'opacity:0.5;' : '') +
        (wrap ? '">' : '') +
        (this._config.bold ? '<b>' : '') +
        (this._config.underline ? '<u>' : '') +
        (this._config.strikethrough ? '<s>' : '') +
        (this._config.italic ? '<i>' : '') +
        (data || '') +
        (this._config.italic ? '</i>' : '') +
        (this._config.strikethrough ? '</s>' : '') +
        (this._config.underline ? '</u>' : '') +
        (this._config.bold ? '</b>' : '') +
        (wrap ? '</span>' : '');

        this._reset();
        
        return output;
    }
}

export default new Chalk();
