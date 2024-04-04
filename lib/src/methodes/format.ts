// --------------------------------------------------
// FORMAT METHODES
// --------------------------------------------------
// Includes:
// useTokenDisplay

export const useTokenDisplay = (value: string | number, precision = 8, enforce = false): string => {
    const number = typeof value === 'number' ? value : parseFloat(value);
    
    if (Number.isNaN(number)) return '0';

    const precisionUnderFlow = precision < 0;

    return number.toLocaleString('EN', {
        maximumFractionDigits: precisionUnderFlow ? 1 : precision,
        minimumFractionDigits: enforce ? precision : 0,
    });

};
