export interface ChalkOptions {
    nest?: boolean;
}

export interface ChalkConstructor {
    (options?: ChalkOptions): Chalk;
}

export interface Chalk {
    
    constructor: ChalkConstructor;

    bg(color: string): this;
    fg(color: string): this;

    readonly dim: this;
    readonly bold: this;
    readonly italic: this;
    readonly underline: this;
    readonly strikethrough: this;

    readonly black: this;
    readonly red: this;
    readonly green: this;
    readonly yellow: this;
    readonly blue: this;
    readonly magenta: this;
    readonly cyan: this;
    readonly white: this;
    readonly gray: this;

    readonly bgBlack: this;
    readonly bgRed: this;
    readonly bgGreen: this;
    readonly bgYellow: this;
    readonly bgBlue: this;
    readonly bgMagenta: this;
    readonly bgCyan: this;
    readonly bgWhite: this;
    readonly bgGray: this;

}

export default Chalk;
