import chroma from 'chroma-js';
import React, { useContext, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles, useTheme } from 'react-jss';
import { ScatterChart, ResponsiveContainer, XAxis, YAxis, Scatter, Tooltip, ZAxis } from 'recharts';
import { DEFAULT_TECHNO_HANDLE } from '../../../../../../utils/icons';
import { getColorsFromCardVariant, getHexFromPaletteColor } from '../../../../../../utils/styles/styles_utils';
import { useTechnologies } from '../../../../../hooks/technologies/use_technologies';
import { styles } from './skills_scatter_chart_styles';

import { ReactComponent as SmilingFace } from '../../../../../../assets/icons/emoji_joy.svg';
import { ReactComponent as FrowningFace } from '../../../../../../assets/icons/emoji_expressionless.svg';
import { ReactComponent as MuscleFlex } from '../../../../../../assets/icons/emoji_strong.svg';
import { ReactComponent as ThinkingFace } from '../../../../../../assets/icons/emoji_thinking.svg';

const marginSize = 8;
const iconSize = 24;
const margin = { top: marginSize, right: marginSize + iconSize, bottom: marginSize * 2, left: marginSize };

const ColorContext = React.createContext({});
const ColorProvider = ColorContext.Provider;

function IconLabel({ x, y, width, height, iconUrl } = {}) {
    return <image x={x - width / 2} y={y - height / 2} width={iconSize} height={iconSize} href={iconUrl} />;
}

const AxisLabel = ({ axisType, viewBox: { x, y, width, height }, children }) => {
    const isVert = axisType === 'yAxis';
    const cx = x + width / 2;
    const cy = y + height / 2;
    const rot = isVert ? `270 ${cx} ${cy}` : 0;
    return (
        <text
            x={cx}
            y={cy}
            transform={`rotate(${rot})`}
            textAnchor="middle"
            alignmentBaseline="central"
            fill="currentColor"
        >
            {children}
        </text>
    );
};

const PassionTick = ({ x, y, payload, fill }) => {
    const size = 32;
    const Emoji = payload.value === 0 ? FrowningFace : SmilingFace;
    x -= size;
    y -= size / 2;
    return <Emoji x={x} y={y} width={size} height={size} stroke={fill} fill={fill} />;
};

const SkillTick = ({ x, y, payload, fill }) => {
    const size = 32;
    const Emoji = payload.value === 0 ? ThinkingFace : MuscleFlex;
    x -= size / 2;
    return <Emoji x={x} y={y} width={size} height={size} stroke={fill} fill={fill} />;
};

const CustomTooltip = ({ payload }) => {
    const content = payload.find((pl) => pl.name === 'name')?.value;
    const style = { backgroundColor: '#000000A0', borderRadius: 5, padding: '6px 16px' };
    return <div style={style}>{content}</div>;
};

const useStyles = createUseStyles(styles);
const SkillsScatterChart = ({ data, variant }) => {
    const classes = useStyles();
    const theme = useTheme();
    const { formatMessage } = useIntl();
    const { technologies } = useTechnologies();

    const { contentColor, backgroundColor, variantColors } = useMemo(() => {
        const variantColors = getColorsFromCardVariant(theme, variant);
        return {
            contentColor: getHexFromPaletteColor(theme, variantColors.color),
            backgroundColor: getHexFromPaletteColor(theme, variantColors.backgroundColor),
            variantColors
        };
    }, [theme, variant]);

    const mergedData = useMemo(
        () =>
            data.map((skill) => {
                const techHandle = technologies?.[skill.name]?.handle ?? DEFAULT_TECHNO_HANDLE;
                const hex = getHexFromPaletteColor(theme, variantColors.backgroundColor);
                const luminance = chroma(hex).luminance();
                const iconUrl =
                    luminance < 0.98
                        ? `https://process.filestackapi.com/output=format:png/negative/modulate=brightness:1000/compress/${techHandle}`
                        : `https://process.filestackapi.com/output=format:png/${techHandle}`;
                return { ...skill, iconUrl };
            }),
        [data, technologies, variantColors, theme]
    );

    return (
        <ColorProvider value={{ backgroundColor, theme, variantColors }}>
            <div className={classes.wrapper}>
                <ResponsiveContainer minHeight={326} width="100%">
                    <ScatterChart margin={margin}>
                        <XAxis
                            dataKey="value"
                            type="number"
                            stroke={contentColor}
                            height={50}
                            label={(props) => (
                                <AxisLabel {...props}>{formatMessage({ id: 'Skills.scatter.skill' })}</AxisLabel>
                            )}
                            tick={SkillTick}
                            ticks={[0, 100]}
                        />
                        <YAxis
                            dataKey="passion"
                            type="number"
                            width={50}
                            stroke={contentColor}
                            label={(props) => (
                                <AxisLabel axisType="yAxis" {...props}>
                                    {formatMessage({ id: 'Skills.scatter.passion' })}
                                </AxisLabel>
                            )}
                            tick={PassionTick}
                            ticks={[0, 100]}
                        />
                        <ZAxis type="category" dataKey="name" />
                        <Tooltip isAnimationActive={false} content={CustomTooltip} />
                        <Scatter data={mergedData} fill={contentColor} shape={IconLabel} />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </ColorProvider>
    );
};

export default SkillsScatterChart;
