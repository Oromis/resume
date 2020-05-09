import chroma from 'chroma-js';
import { increaseContrast } from '../../../styles/color_utils';
import { getColorsFromCardVariant, getHexFromPaletteColor } from '../../../utils/styles/styles_utils';

const borderRadius = 5;

export default {
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: ({ color = 'red', backgroundColor = 'blue', borderColor = 'white' } = {}) => ({
        height: 'fit-content',
        width: 'fit-content',
        maxWidth: '100%',
        padding: [8, 14],
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        color,
        backgroundColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        border: [1, 'solid', borderColor],
        transition: 'color 0.3s, background-color 0.3s',

        '&:first-child': {
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius
        },

        '&:last-child': {
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: borderRadius
        },

        '&:hover': {
            backgroundColor: increaseContrast(backgroundColor, color, 1)
        },

        '&:active': {
            backgroundColor: backgroundColor
        }
    }),
    icon: ({ color } = {}) => ({
        height: 22,
        width: 22,
        stroke: color,
        fill: color
    })
};
