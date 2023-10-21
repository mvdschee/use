// --------------------------------------------------
// SEARCH METHODES
// --------------------------------------------------
// Includes:
// useSearch

interface Options {
    items: string[];
    sorted_items?: {
        [key: string]: string[];
    };
    options?: {
        distance?: number;
        results_count?: number;
        results_count_alt?: number;
    };
}

export const useSearch = ({ items, sorted_items, options }: Options) => {
    const config = {
        distance: 3,
        results_count: 8,
        results_count_alt: 16,
        ...options,
    };

    return function search(input: string): string[] {
        const globalReg = new RegExp(input.replace(/\s+/g, '|'), 'i');

        const char = input.charAt(0);
        const sortedItems = sorted_items?.[char] ? sorted_items[char] : [];

        const list: {
            match: string[];
            alt: string[];
        } = {
            match: [],
            alt: [],
        };

        const wordsMatch = (item: string): void => {
            if (globalReg.test(item)) list['match'].push(item);
            return;
        };

        const AltMatch = (item: string): void => {
            if (levenshtein(item, input || '') <= config.distance) list['alt'].push(item);
            return;
        };

        const reachedCapMatch = () => {
            return list['match'].length >= config.results_count;
        };

        const reachedCapAlt = () => {
            return list['alt'].length >= config.results_count_alt;
        };

        const il = sortedItems.length;
        for (let i = 0; i < il; i++) {
            wordsMatch(sortedItems[i]);
            AltMatch(sortedItems[i]);

            if (reachedCapMatch() || reachedCapAlt()) break;
        }

        if (!(reachedCapMatch() || reachedCapAlt())) {
            const l = items.length;
            for (let i = 0; i < l; i++) {
                wordsMatch(items[i]);
                AltMatch(items[i]);

                if (reachedCapMatch() || reachedCapAlt()) break;
            }
        }

        const results = new Set([...sortResults(input, list['match']), ...sortResults(input, list['alt'])]);

        return [...results].slice(0, config.results_count);
    };

    function sortResults(text: string, items: string[]): string[] {
        return items.sort((a, b) => {
            const i = levenshtein(text, a);
            const j = levenshtein(text, b);
            if (i > j) return 1;
            if (i < j) return -1;
            return 0;
        });
    }

    function levenshtein(s: string, t: string): number {
        if (!s.length) return t.length;
        if (!t.length) return s.length;
        const tl = t.length;
        const sl = s.length;
        const arr: number[][] = [];
        for (let i = 0; i <= tl; i++) {
            arr[i] = [i];
            for (let j = 1; j <= sl; j++) {
                arr[i][j] =
                    i === 0
                        ? j
                        : Math.min(
                              arr[i - 1][j] + 1,
                              arr[i][j - 1] + 1,
                              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                          );
            }
        }
        return arr[tl][sl];
    }
};
