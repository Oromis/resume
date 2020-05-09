import chroma from 'chroma-js';
import React, { useContext, useMemo } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { animated } from 'react-spring';
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { DEFAULT_TECHNO_HANDLE } from '../../../../../../utils/icons';
import { getColorsFromCardVariant, getHexFromPaletteColor } from '../../../../../../utils/styles/styles_utils';
import { useTechnologies } from '../../../../../hooks/technologies/use_technologies';
import { styles } from './skills_bar_chart_styles';

const marginSize = 8;
const iconSize = 24;
const margin = { top: marginSize, right: marginSize + iconSize, bottom: marginSize * 2, left: marginSize };

const ColorContext = React.createContext({});
const ColorProvider = ColorContext.Provider;

function IconLabel(props) {
    const { x, y, width, height, name } = props;
    const { technologies } = useTechnologies();
    const { theme, variantColors } = useContext(ColorContext);

    const techno = useMemo(() => {
        if (!technologies) {
            return null;
        }
        return technologies[name];
    }, [technologies, name]);

    const src = useMemo(() => {
        const hex = getHexFromPaletteColor(theme, variantColors.backgroundColor);
        const luminance = chroma(hex).luminance();
        if (luminance < 0.98) {
            return `https://process.filestackapi.com/output=format:png/negative/modulate=brightness:1000/compress/${
                techno?.handle || DEFAULT_TECHNO_HANDLE
            }`;
        }
        return `https://process.filestackapi.com/output=format:png/${techno?.handle || DEFAULT_TECHNO_HANDLE}`;
    }, [techno, theme, variantColors]);

    return (
        <image
            x={x + width + marginSize}
            y={y + height / 2 - iconSize / 2}
            width={iconSize}
            height={iconSize}
            dy={0}
            href={src}
        />
    );
}

const useStyles = createUseStyles(styles);
const SkillsBarChart = ({ data, variant }) => {
    const classes = useStyles();
    const theme = useTheme();

    const { contentColor, backgroundColor, variantColors } = useMemo(() => {
        const variantColors = getColorsFromCardVariant(theme, variant);
        return {
            contentColor: getHexFromPaletteColor(theme, variantColors.color),
            backgroundColor: getHexFromPaletteColor(theme, variantColors.backgroundColor),
            variantColors
        };
    }, [theme, variant]);

    return (
        <ColorProvider value={{ backgroundColor, theme, variantColors }}>
            <animated.div className={classes.wrapper}>
                <ResponsiveContainer minHeight={374} width="100%">
                    <BarChart data={data} layout="vertical" margin={margin} maxBarSize={8}>
                        <YAxis
                            dataKey="name"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            width={100}
                            stroke={contentColor}
                        />
                        <XAxis type="number" hide />
                        <Bar dataKey="value" fill={contentColor}>
                            <LabelList dataKey="name" content={IconLabel} position="insideEnd" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </animated.div>
        </ColorProvider>
    );
};

export default SkillsBarChart;
