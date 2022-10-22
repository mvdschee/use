import markdown from '../vendor/drawdown.js';
// --------------------------------------------------
// DOM METHODES
// --------------------------------------------------
// Includes:
// useAvatar

import { useColor } from './style';

export const useAvatar = (account: string): string => {
    return `<svg x="0" y="0" viewbox="0 0 32 32" style="overflow:hidden;border-radius:50%;width:100%;height:100%;background-color:${useColor(
        account,
        { offset: 0.7 }
    )}">
<rect x="0" y="0" width="32" height="32" transform="translate(-8 0)" fill="${useColor(account, {
        offset: 0.85,
    })}"></rect>
<rect x="0" y="0" width="32" height="32" transform="translate(-20 10)" fill="${useColor(account, {
        offset: 0.7,
    })}"></rect>
<rect x="0" y="0" width="32" height="32" transform="translate(4 15)" fill="${useColor(account, {
        offset: 0.8,
    })}"></rect>
<rect x="0" y="0" width="32" height="32" transform="translate(-16 20)" fill="${useColor(account, {
        offset: 0.9,
    })}"></rect>
</svg>`;
};

export const useMarkdown = (source: string): HTMLDivElement => {
    try {
        const html = markdown(source);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const div = doc.createElement('div');

        div.innerHTML = doc.body.innerHTML;

        return div;
    } catch (error) {
        console.error(error);
        return document.createElement('div');
    }
};
