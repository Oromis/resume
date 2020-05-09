import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import cn from 'classnames';
import { createUseStyles } from 'react-jss';
import { FormattedMessage } from 'react-intl';

import { Typography } from '@welovedevs/ui';
import { ProfileCardPaddedFront } from '../../../../commons/profile_card/profile_card_padded_front/profile_card_padding_front';
import { CenterContentContainer } from '../../../../commons/center_content_container/center_content_container';
import { ProfileCardFrontTypography } from '../../../../commons/profile_card/profile_card_front_typography/profile_card_front_typography';
import { ProfileCardTitle } from '../../../../commons/profile_card/profile_card_title/profile_card_title';
import { useCardVariant } from '../../../../hooks/profile_card_hooks/use_card_variant';
import SkillsScatterChart from '../../skills/skills_back/skills_scatter_chart/skills_scatter_chart';

import { styles } from './interested_by_front_styles';
import { useCardSide } from '../../../../hooks/profile_card_hooks/use_card_side';
import { ProfileCardActions } from '../../../../commons/profile_card/profile_card_actions/profile_card_actions';
import { ProfileCardButton } from '../../../../commons/profile_card/profile_card_button/profile_card_button';
import { NoDataButton } from '../../../../commons/no_data_button/no_data_button';
import { SIDES } from '../../../../commons/profile_card/profile_card_side/side';

const useStyles = createUseStyles(styles);

const InterestedByFrontComponent = ({ data: { skills }, overrideColor, customClasses = {} }) => {
    const classes = useStyles({ overrideColor });
    return (
        <div className={classes.scroller}>
            <ProfileCardTitle>
                <FormattedMessage id="Skills.scatter.heading" defaultMessage="Skills" />
            </ProfileCardTitle>
            <Content
                {...{
                    skills,
                    overrideColor,
                    classes,
                    customClasses
                }}
            />
        </div>
    );
};

const Content = ({ skills, overrideColor, classes, customClasses }) => {
    const [variant] = useCardVariant();
    return <SkillsScatterChart variant={variant} data={skills ?? []} />;
};

export const InterestedByFront = memo(InterestedByFrontComponent);
