/* eslint-disable no-console */

interface Logger {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    info: (...args: any[]) => void;
}

const createLogger = (): Logger => {
    if (import.meta.env.DEV) {
        return {
            log: (...args: any[]) => console.log(...args),
            warn: (...args: any[]) => console.log(...args),
            error: (...args: any[]) => console.log(...args),
            info: (...args: any[]) => console.log(...args),
        };
    }

    return {
        log: () => {},
        warn: (...args: any[]) => console.log(...args),
        error: (...args: any[]) => console.log(...args),
        info: () => {},
    };
};

const logger = createLogger();

export default logger;
