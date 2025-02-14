import {
    getColorsFromCardVariant,
    getHexFromPaletteColor,
    withCustomVerticalScrollbar
} from '../../../../../utils/styles/styles_utils';

export const styles = (theme) => ({
    container: ({ variant }) => ({
        display: 'flex',
        flexWrap: 'wrap',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '100%',
        ...withCustomVerticalScrollbar(
            getHexFromPaletteColor(theme, getColorsFromCardVariant(theme, variant).backBackgroundColor)
        )
    }),
    otherSkillsContainer: {
        width: '100%',
        margin: `0px ${theme.miscellaneous.spacing * 5}px`,
        paddingBottom: theme.miscellaneous.spacing * 2
    },
    chartSwitch: {
        position: 'absolute',
        top: 34,
        right: 24
    }
});
