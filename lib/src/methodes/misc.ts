// --------------------------------------------------
// LOG METHODES
// --------------------------------------------------
// Includes:
// useLog

/**
 * Logs a message to the console with a specified type and timestamp.
 *
 * @param {string} msg - The message to be logged.
 * @param {'info' | 'warn' | 'error' | 'status'} type - The type of log message. Defaults to 'status'.
 * @return {void}
 */
export const useLog = (msg: string, type: 'info' | 'warn' | 'error' | 'status' = 'status') => {
    const status =
        type === 'status'
            ? ''
            : type === 'info'
            ? ' \x1b[32m[INFO]'
            : type === 'warn'
            ? ' \x1b[33m[WARN]'
            : ' \x1b[31m[ERROR]';

    console.log(`\x1b[90m${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}${status} \x1b[0m${msg}`);
};
