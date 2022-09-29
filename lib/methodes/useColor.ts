export const useToColor = (str: string, offset = 1): string => {
    const stringUniqueHash = [...str].reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return `hsl(${(stringUniqueHash % 360) / offset}, 70%, 50%)`;
};
