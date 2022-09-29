import { useToColor } from './useColor.ts';

export const useAvatar = (account: string): string => {
    return `<svg x="0" y="0" viewbox="0 0 32 32" style="overflow:hidden;border-radius:50%;background-color:${useToColor(
        account,
        0.7
    )}">
<rect x="0" y="0" width="32" height="32" transform="translate(-8 0)" fill="${useToColor(account, 0.85)}"></rect>
<rect x="0" y="0" width="32" height="32" transform="translate(-20 10)" fill="${useToColor(account, 0.7)}"></rect>
<rect x="0" y="0" width="32" height="32" transform="translate(4 15)" fill="${useToColor(account, 0.8)}"></rect>
<rect x="0" y="0" width="32" height="32" transform="translate(-16 20)" fill="${useToColor(account, 0.9)}"></rect>
</svg>`;
};
