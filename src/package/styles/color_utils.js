import chroma from 'chroma-js';
import { getHexFromPaletteColor } from '../utils/styles/styles_utils';

export function increaseContrast(color, reference, ratio = 1) {
    if (chroma(color).luminance() > chroma(reference).luminance()) {
        return chroma(color).brighten(ratio).css();
    } else {
        return chroma(color).darken(ratio).css();
    }
}

export function getFooterColor(theme) {
    return chroma(getHexFromPaletteColor(theme, 'light')).darken(3).css();
}
