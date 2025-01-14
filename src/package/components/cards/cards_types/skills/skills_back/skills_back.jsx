import React, { memo, useCallback, useMemo, useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles, useTheme } from 'react-jss';

import { getColorsFromCardVariant } from '../../../../../utils/styles/styles_utils';
import Dropdown from '../../../../commons/dropdown/dropdown';

import { ProfileCardTitle } from '../../../../commons/profile_card/profile_card_title/profile_card_title';
import SkillsBarChart from './skills_bar_chart/skills_bar_chart';

import { styles } from './skills_back_styles';
import { useCardVariant } from '../../../../hooks/profile_card_hooks/use_card_variant';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';
import { NoSkill } from './no_skill/no_skill';

const useStyles = createUseStyles(styles);

const DEFAULT_SKILL_TAG = 'overview';
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
    const [skillTag, setSkillTag] = useState(DEFAULT_SKILL_TAG);
    const onTagChange = useCallback((option) => setSkillTag(option.key), [setSkillTag]);

    const classes = useStyles({ variant });
    const hasSkill = useMemo(() => existsAndNotEmpty(data?.skills), [data]);

    const options = useMemo(
        () => [
            { key: 'overview', label: formatMessage({ id: 'Skills.tags.overview' }) },
            { key: 'language', label: formatMessage({ id: 'Skills.tags.languages' }) },
            { key: 'database', label: formatMessage({ id: 'Skills.tags.database' }) },
            { key: 'frontend', label: formatMessage({ id: 'Skills.tags.frontend' }) },
            { key: 'backend', label: formatMessage({ id: 'Skills.tags.backend' }) },
            { key: 'embedded', label: formatMessage({ id: 'Skills.tags.embedded' }) },
            { key: 'tool', label: formatMessage({ id: 'Skills.tags.tools' }) },
            { key: 'mobile', label: formatMessage({ id: 'Skills.tags.mobile' }) },
            { key: 'os', label: formatMessage({ id: 'Skills.tags.os' }) }
        ],
        [formatMessage]
    );

    const activeSkills = useMemo(
        () =>
            (data.skills ?? [])
                .filter((skill) => skill.tags.indexOf(skillTag) !== -1)
                .sort((a, b) => b.value - a.value),
        [data, skillTag]
    );

    if (!hasSkill) {
        return <NoSkill {...{ handleAddButtonClick }} />;
    }

    return (
        <div className={classes.container}>
            <Dropdown
                options={options}
                value={options.find((o) => o.key === skillTag)}
                color={colorKeys.color}
                size="small"
                backgroundColor={colorKeys.backgroundColor}
                onChange={onTagChange}
                className={classes.chartSwitch}
            />
            <SkillsBarChart variant={variant} data={activeSkills} />
        </div>
    );
};
export const SkillsBack = memo(SkillsBackComponent);
