// --------------------------------------------------
// TIME METHODES
// --------------------------------------------------
// Includes:
// useCountDown

export const useCountDown = (startTime: number, now: number): string => {
    if (!startTime) return '0';

    const diff = startTime - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    let result = '';
    if (days > 0) {
        result += `${days}D `;
    }
    if (days > 0 || hours > 0) {
        result += `${hours}H `;
    }

    if (days > 0 || hours > 0 || minutes > 0) {
        result += `${minutes}M `;
    }

    if (days > 0 || hours > 0 || minutes > 0 || seconds >= 0) {
        result += `${seconds}S `;
    }

    if (result.length === 0) return '0';

    return result;
};
