import React, { memo, useCallback, useMemo, useRef } from 'react';

import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { config, useSpring, useChain } from 'react-spring';

import { ProfileCardTitle } from '../../../../commons/profile_card/profile_card_title/profile_card_title';
import SkillsBarChart from './skills_bar_chart/skills_bar_chart';

import SkillsPieChart from './skills_pie_chart/skills_pie_chart';
import OtherSkills from './other_skills/other_skills';

import { styles } from './skills_back_styles';
import { useCardVariant } from '../../../../hooks/profile_card_hooks/use_card_variant';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';
import { NoSkill } from './no_skill/no_skill';

const useStyles = createUseStyles(styles);

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

    const classes = useStyles({ variant });
    const hasSkill = useMemo(() => existsAndNotEmpty(data?.skills), [data]);

    if (!hasSkill) {
        return <NoSkill {...{ handleAddButtonClick }} />;
    }

    return (
        <div className={classes.container}>
            <SkillsBarChart variant={variant} data={data.skills ?? []} />
        </div>
    );
};
export const SkillsBack = memo(SkillsBackComponent);
