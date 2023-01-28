// --------------------------------------------------
// STYLE METHODES
// --------------------------------------------------
// Includes:
// useColor

interface useColorArgs {
    /**
     * Adjusting color rang by offset
     * @default 1
     */
    offset?: number;
    /**
     * changing color transparency
     * @default 1
     */
    alpha?: number;

    /**
     * output color format as rgba
     * @default false
     */
    rgba?: boolean;
}

/*
 * Util to transform a string to a color
 * Useful for account based personalisations
 */
export const useColor = (str: string | null, args?: useColorArgs): string => {
    const source = str || '0';

    const stringUniqueHash = [...source].reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const hash = stringUniqueHash % 360;
    let offset = args?.offset || 1;

    if (hash < 50) offset -= 0.4;
    else if (hash < 130) offset += 0.1;

    const color = `hsla(${+(hash / offset).toFixed(0)}, 70%, 50%, ${(args?.alpha || 1) * 100}%)`;

    return args?.rgba ? hslaToRgba(color) : color;
};

// convert hsla to rgba
const hslaToRgba = (hsla: string): string => {
    let r: number, g: number, b: number, a: number;
    let h: number, s: number, l: number;
    let m: number, c: number, x: number;

    hsla = hsla.replace(/hsla?\(|\)/g, '').replace(/%| /g, '');
    [h, s, l, a] = hsla.split(',').map((v) => +v);

    c = (1 - Math.abs(2 * l - 1)) * s;
    x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    m = l - c / 2;

    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    return `rgba(${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round((b + m) * 255)}, ${a})`;
};
