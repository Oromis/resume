import { increaseContrast } from '../../../styles/color_utils';

const borderRadius = 5;

export default {
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    select: ({ color = 'red', backgroundColor = 'blue', borderColor = 'white' } = {}) => ({
        height: 'fit-content',
        width: 'fit-content',
        maxWidth: '100%',
        padding: [5, 14],
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        color,
        backgroundColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        border: [1, 'solid', borderColor],
        borderRadius: borderRadius,
        transition: 'color 0.3s, background-color 0.3s',

        '&:hover, &:focus': {
            backgroundColor: increaseContrast(backgroundColor, color, 1)
        },

        '&:active': {
            backgroundColor: backgroundColor
        }
    }),
    option: {
        paddingTop: 4,
        paddingBottom: 4
    }
};
