// --------------------------------------------------
// FORMAT METHODES
// --------------------------------------------------
// Includes:
// useTokenDisplay

/**
 * Formats a given value as a string with a specified precision.
 *
 * @param {string | number} value - The value to be formatted.
 * @param {number} [precision=8] - The maximum number of digits after the decimal point.
 * @param {boolean} [enforce=false] - Whether to always display the specified number of digits after the decimal point.
 * @return {string} The formatted value as a string.
 */
export const useTokenDisplay = (value: string | number, precision = 8, enforce = false): string => {
    const number = typeof value === 'number' ? value : Number.parseFloat(value);

    if (Number.isNaN(number)) return '0';

    const precisionUnderFlow = precision < 0;

    return number.toLocaleString('EN', {
        maximumFractionDigits: precisionUnderFlow ? 1 : precision,
        minimumFractionDigits: enforce ? precision : 0,
    });
};
