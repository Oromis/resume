import React, { memo, useCallback, useMemo, useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles, useTheme } from 'react-jss';

import { getColorsFromCardVariant } from '../../../../../utils/styles/styles_utils';

import { ProfileCardTitle } from '../../../../commons/profile_card/profile_card_title/profile_card_title';
import RadioButtons from '../../../../commons/radio_buttons/radio_buttons';
import SkillsBarChart from './skills_bar_chart/skills_bar_chart';

import { styles } from './skills_back_styles';
import { useCardVariant } from '../../../../hooks/profile_card_hooks/use_card_variant';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';
import { NoSkill } from './no_skill/no_skill';

import { ReactComponent as BarChartIcon } from '../../../../../assets/icons/bar_chart.svg';
import { ReactComponent as ScatterChartIcon } from '../../../../../assets/icons/scatter_chart.svg';
import SkillsScatterChart from './skills_scatter_chart/skills_scatter_chart';

const useStyles = createUseStyles(styles);

const chartStyles = {
    bar: 'bar',
    scatter: 'scatter'
};

const SkillsBackComponent = ({ data, handleAddButtonClick }) => (
    <>
        <ProfileCardTitle>
            <FormattedMessage id="Skills.back.title" defaultMessage="Skills" />
        </ProfileCardTitle>
        <Content {...{ data, handleAddButtonClick }} />
    </>
);

const Content = ({ data, handleAddButtonClick }) => {
    const [variant] = useCardVariant();
    const theme = useTheme();
    const colorKeys = getColorsFromCardVariant(theme, variant);
    const { formatMessage } = useIntl();
    const [chartStyle, setChartStyle] = useState(chartStyles.bar);
    const onChartStyleChange = useCallback((option) => setChartStyle(option.key), [setChartStyle]);

    const classes = useStyles({ variant });
    const hasSkill = useMemo(() => existsAndNotEmpty(data?.skills), [data]);

    const options = useMemo(
        () => [
            { key: 'bar', label: formatMessage({ id: 'Skills.buttons.skill' }), icon: BarChartIcon },
            { key: 'scatter', label: formatMessage({ id: 'Skills.buttons.skillVsLove' }), icon: ScatterChartIcon }
        ],
        [formatMessage]
    );

    if (!hasSkill) {
        return <NoSkill {...{ handleAddButtonClick }} />;
    }

    return (
        <div className={classes.container}>
            <RadioButtons
                options={options}
                value={options.find((o) => o.key === chartStyle)}
                color={colorKeys.color}
                size="small"
                backgroundColor={colorKeys.backgroundColor}
                onChange={onChartStyleChange}
                className={classes.chartSwitch}
            />
            {chartStyle === chartStyles.bar ? (
                <SkillsBarChart variant={variant} data={data.skills ?? []} />
            ) : (
                <SkillsScatterChart variant={variant} data={data.skills ?? []} />
            )}
        </div>
    );
};
export const SkillsBack = memo(SkillsBackComponent);
