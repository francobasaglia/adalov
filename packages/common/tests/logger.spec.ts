import { Logger, Text } from '../lib/logger';

describe('Text class', () => {
    let text: Text;

    beforeEach(() => {
        text = new Text();
    });

    describe('blue method', () => {
        it('should call getText method', () => {
            const getTextSpy = jest.spyOn<any, 'getText'>(text, 'getText');

            text.blue('Sample text');

            expect(getTextSpy).toHaveBeenCalledTimes(1);
            expect(getTextSpy).toHaveBeenCalledWith('Sample text', 'blue', undefined)
        });
    });

    describe('cyan method', () => {
        it('should call getText method', () => {
            const getTextSpy = jest.spyOn<any, 'getText'>(text, 'getText');

            text.cyan('Sample text');

            expect(getTextSpy).toHaveBeenCalledTimes(1);
            expect(getTextSpy).toHaveBeenCalledWith('Sample text', 'cyan', undefined)
        });
    });

    describe('default method', () => {
        it('should call getText method', () => {
            const getTextSpy = jest.spyOn<any, 'getText'>(text, 'getText');

            text.default('Sample text');

            expect(getTextSpy).toHaveBeenCalledTimes(1);
            expect(getTextSpy).toHaveBeenCalledWith('Sample text', 'default', undefined)
        });
    });

    describe('green method', () => {
        it('should call getText method', () => {
            const getTextSpy = jest.spyOn<any, 'getText'>(text, 'getText');

            text.green('Sample text');

            expect(getTextSpy).toHaveBeenCalledTimes(1);
            expect(getTextSpy).toHaveBeenCalledWith('Sample text', 'green', undefined)
        });
    });

    describe('red method', () => {
        it('should call getText method', () => {
            const getTextSpy = jest.spyOn<any, 'getText'>(text, 'getText');

            text.red('Sample text');

            expect(getTextSpy).toHaveBeenCalledTimes(1);
            expect(getTextSpy).toHaveBeenCalledWith('Sample text', 'red', undefined)
        });
    });

    describe('yellow method', () => {
        it('should call getText method', () => {
            const getTextSpy = jest.spyOn<any, 'getText'>(text, 'getText');

            text.yellow('Sample text');

            expect(getTextSpy).toHaveBeenCalledTimes(1);
            expect(getTextSpy).toHaveBeenCalledWith('Sample text', 'yellow', undefined)
        });
    });

    describe('getText method', () => {
        it('should return a blue text', () => {
            expect(text['getText']('Sample text', 'blue')).toEqual('\u001b[94mSample text\u001b[0m');
        });

        it('should return a cyan text', () => {
            expect(text['getText']('Sample text', 'cyan')).toEqual('\u001b[96mSample text\u001b[0m');
        });
    
        it('should return a default text', () => {
            expect(text['getText']('Sample text', 'default')).toEqual('Sample text\u001b[0m');
        });
    
        it('should return a green text', () => {
            expect(text['getText']('Sample text', 'green')).toEqual('\u001b[32mSample text\u001b[0m');
        });
    
        it('should return a red text', () => {
            expect(text['getText']('Sample text', 'red')).toEqual('\u001b[91mSample text\u001b[0m');
        });
    
        it('should return a yellow text', () => {
            expect(text['getText']('Sample text', 'yellow')).toEqual('\u001b[93mSample text\u001b[0m');
        });

        it('should not modify the content when it is not number or string type', () => {
            expect(text['getText']([1, 2, 3], 'red')).toEqual([1, 2, 3]);
        });

        it('should restore the previous text styles when content is string type, one time', () => {
            expect(text['getText'](`First style, ${text['getText']('Second style', 'red', 'bold')}, first style again`, 'blue')).toEqual('\u001b[94mFirst style, \u001b[91m\u001b[1mSecond style\u001b[0m\u001b[94m, first style again\u001b[0m');
        });

        it('should restore the previous text styles when content is string type, several times', () => {
            expect(text['getText'](`First style, ${text['getText']('Second style', 'red', 'bold')}, first style again. ${text['getText']('Now green style', 'green', 'italic')}, and finally first style.`, 'blue')).toEqual('\u001b[94mFirst style, \u001b[91m\u001b[1mSecond style\u001b[0m\u001b[94m, first style again. \u001b[32m\u001b[3mNow green style\u001b[0m\u001b[94m, and finally first style.\u001b[0m');
        });

        it('should restore the previous text styles when content is number type', () => {
            expect(text['getText'](`First style, ${text['getText'](1234, 'red', 'bold')}, first style again`, 'blue')).toEqual('\u001b[94mFirst style, \u001b[91m\u001b[1m1234\u001b[0m\u001b[94m, first style again\u001b[0m');
        });
    });
});

describe('Logger class', () => {
    let logger: Logger;

    beforeAll(() => {
        const text = new Text();
        const consoleFactory = (): Console => ({
            Console: jest.fn(),
            assert: jest.fn(),
            clear: jest.fn(),
            count: jest.fn(),
            countReset: jest.fn(),
            debug: jest.fn(),
            dir: jest.fn(),
            dirxml: jest.fn(),
            error: jest.fn(),
            group: jest.fn(),
            groupCollapsed: jest.fn(),
            groupEnd: jest.fn(),
            info: jest.fn(),
            log: jest.fn(),
            table: jest.fn(),
            time: jest.fn(),
            timeEnd: jest.fn(),
            timeLog: jest.fn(),
            trace: jest.fn(),
            warn: jest.fn(),
            profile: jest.fn(),
            profileEnd: jest.fn(),
            timeStamp: jest.fn()
        });
        
        logger = new Logger(text, consoleFactory);
    });

    describe('error method', () => {
        it('should call printMessage method with "error" and "red" params', () => {
            const printMessageSpy = jest.spyOn<any, 'printMessage'>(logger, 'printMessage');
            
            logger.error('Sample text');
            
            expect(printMessageSpy).toHaveBeenCalledWith('error', 'red', 'Sample text');
        });
    });

    describe('info method', () => {
        it('should call printMessage method with "info" and "cyan" params', () => {
            const printMessageSpy = jest.spyOn<any, 'printMessage'>(logger, 'printMessage');
            
            logger.info('Sample text');
            
            expect(printMessageSpy).toHaveBeenCalledWith('info', 'cyan', 'Sample text');
        });
    });

    describe('message method', () => {
        it('should call printMessage method with "log" and "default" params', () => {
            const printMessageSpy = jest.spyOn<any, 'printMessage'>(logger, 'printMessage');
            
            logger.message('Sample text');
            
            expect(printMessageSpy).toHaveBeenCalledWith('log', 'default', 'Sample text');
        });
    });

    describe('success method', () => {
        it('should call printMessage method with "log" and "green" params', () => {
            const printMessageSpy = jest.spyOn<any, 'printMessage'>(logger, 'printMessage');
            
            logger.success('Sample text');
            
            expect(printMessageSpy).toHaveBeenCalledWith('log', 'green', 'Sample text');
        });
    });

    describe('warning method', () => {
        it('should call printMessage method with "warn" and "yellow" params', () => {
            const printMessageSpy = jest.spyOn<any, 'printMessage'>(logger, 'printMessage');
            
            logger.warning('Sample text');
            
            expect(printMessageSpy).toHaveBeenCalledWith('warn', 'yellow', 'Sample text');
        });
    });

    describe('raw method', () => {
        it('should call log method from private console text', () => {
            const logSpy = jest.spyOn<Console, 'log'>(logger['console'], 'log');

            logger.raw('Sample text');

            expect(logSpy).toHaveBeenCalledWith('Sample text');
        });
    });

    describe('clear method', () => {
        it('should call clear method from private console instance', () => {
            const clearSpy = jest.spyOn<Console, 'clear'>(logger['console'], 'clear');

            logger.clear();

            expect(clearSpy).toHaveBeenCalled();
        });
    });
});
