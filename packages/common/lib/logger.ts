type TextColor = 'blue' | 'cyan' | 'default' | 'green' | 'red' | 'yellow';

type TextStyle = 'normal' | 'bold' | 'dim' | 'italic' | 'underlined' | 'reverse';

type PrintMethod = Extract<keyof Console, 'error' | 'info' | 'log' | 'warn'>;

type PrintColor = Extract<keyof Text, 'red' | 'cyan' | 'default' | 'green' | 'yellow'>;

const TEXT_COLORS: Record<TextColor, string> = {
    blue: '\u001b[94m',
    cyan: '\u001b[96m',
    default: '',
    green: '\u001b[32m',
    red: '\u001b[91m',
    yellow: '\u001b[93m'
};

const TEXT_STYLES: Record<TextStyle, string> = {
    normal: '',
    bold: '\u001b[1m',
    dim: '\u001b[2m',
    italic: '\u001b[3m',
    underlined: '\u001b[4m',
    reverse: '\u001b[7m'
};

const ANSI_RESET_CODE = '\u001b[0m';

const ANSI_RESET_CODE_REGEXP = /\u001b\[0m/g;

export class Text {
    public blue(content: any, style?: TextStyle): any {
        return this.getText(content, 'blue', style);
    }

    public cyan(content: any, style?: TextStyle): any {
        return this.getText(content, 'cyan', style);
    }

    public default(content: any, style?: TextStyle): any {
        return this.getText(content, 'default', style);
    }

    public green(content: any, style?: TextStyle): any {
        return this.getText(content, 'green', style);
    }

    public red(content: any, style?: TextStyle): any {
        return this.getText(content, 'red', style);
    }

    public yellow(content: any, style?: TextStyle): any {
        return this.getText(content, 'yellow', style);
    }

    private getText(content: any, color: TextColor, style: TextStyle = 'normal'): any {
        if (typeof content === 'string' || typeof content === 'number') {
            const textStyle = `${TEXT_COLORS[color]}${TEXT_STYLES[style]}`;
            const textContent = typeof content === 'string'
                ? content.replace(ANSI_RESET_CODE_REGEXP, `${ANSI_RESET_CODE}${textStyle}`)
                : content;
    
            return `${textStyle}${textContent}${ANSI_RESET_CODE}`;
        } else {
            return content;
        }
    }
}

export class LoggerOptions {
    public addNewLine: boolean = false;
    public noColors: boolean = false;
    public timestamp: boolean = false;

    constructor(options: Partial<LoggerOptions> = {}) {
        Object.assign(this, options);
    }
}

export class Logger {
    private console: Console;

    constructor(
        private text: Text,
        private consoleFactory: () => Console
    ) {
        this.console = this.consoleFactory();
    }

    public error(content: any, ...args: any): void {
        this.printMessage('error', 'red', content, ...args);
    }

    public info(content: any, ...args: any): void {
        this.printMessage('info', 'cyan', content, ...args);
    }

    public message(content: any, ...args: any): void {
        this.printMessage('log', 'default', content, ...args);
    }

    public success(content: any, ...args: any): void {
        this.printMessage('log', 'green', content, ...args);
    }

    public warning(content: any, ...args: any): void {
        this.printMessage('warn', 'yellow', content, ...args);
    }

    public raw(...args: any): void {
        this.console.log(...args);
    }

    public clear(): void {
        this.console.clear();
    }

    private printMessage(method: PrintMethod,  color: PrintColor, content: any, ...args: any): void {
        const options = args[args.length - 1] instanceof LoggerOptions ? args.pop() : new LoggerOptions();
        const segments: string[] = [ this.text[options.noColors ? 'default' : color](content), ...args ];

        if (options.timestamp) {
            segments.unshift(this.text.default(`[${new Date().toLocaleTimeString()}]`, 'dim'));
        }

        if (options.addNewLine) {
            segments.push(`\n`);
        }

        this.console[method](...segments);
    }
}
