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

    return `hsla(${+(hash / offset).toFixed(0)}, 70%, 50%, ${(args?.alpha || 1) * 100}%)`;
};
