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
export const useColor = (str: string, args: useColorArgs): string => {
    const stringUniqueHash = [...str].reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return `hsla(${(stringUniqueHash % 360) / (args?.offset || 1)}, 70%, 50%, ${(args?.alpha || 1) * 100}%)`;
};
