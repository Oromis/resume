import chroma from 'chroma-js';

export function increaseContrast(color, reference, ratio = 1) {
    if (chroma(color).luminance() > chroma(reference).luminance()) {
        return chroma(color).brighten(ratio).css();
    } else {
        return chroma(color).darken(ratio).css();
    }
}
