import React, { memo, useCallback, useMemo } from 'react';

import { createUseStyles } from 'react-jss';
import { FormattedMessage, useIntl } from 'react-intl';

import { Typography } from '@welovedevs/ui';
import { getProfileText } from '../../../../../utils/profile_translation';
import { ProfileCardPaddedFront } from '../../../../commons/profile_card/profile_card_padded_front/profile_card_padding_front';
import { CenterContentContainer } from '../../../../commons/center_content_container/center_content_container';
import { ProfileCardFrontTypography } from '../../../../commons/profile_card/profile_card_front_typography/profile_card_front_typography';
import { ProfileCardActions } from '../../../../commons/profile_card/profile_card_actions/profile_card_actions';
import { ProfileCardButton } from '../../../../commons/profile_card/profile_card_button/profile_card_button';

import { SIDES } from '../../../../commons/profile_card/profile_card_side/side';
import { styles } from './studies_front_styles';
import { useCardSide } from '../../../../hooks/profile_card_hooks/use_card_side';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';
import { NoDataButton } from '../../../../commons/no_data_button/no_data_button';

const useStyles = createUseStyles(styles);

const StudiesFrontComponent = ({ data: { education: data }, handleAddButtonClick }) => {
    const classes = useStyles();
    const [side, setSide] = useCardSide();

    const handleButtonClick = useCallback(() => setSide(side === SIDES.FRONT ? SIDES.BACK : SIDES.FRONT), [
        side,
        setSide
    ]);

    const hasEducation = useMemo(() => existsAndNotEmpty(data), [data]);

    return (
        <>
            <ProfileCardPaddedFront>
                <CenterContentContainer customClasses={{ container: classes.container }}>
                    <Content {...{ hasEducation, data, handleAddButtonClick, classes }} />
                </CenterContentContainer>
            </ProfileCardPaddedFront>
            {hasEducation && (
                <ProfileCardActions>
                    <ProfileCardButton onClick={handleButtonClick}>
                        <FormattedMessage id="Studies.front.action" defaultMessage="All my studies" />
                    </ProfileCardButton>
                </ProfileCardActions>
            )}
        </>
    );
};

const Content = ({ hasEducation, data, handleAddButtonClick, classes }) => {
    const intl = useIntl();
    if (hasEducation) {
        return (
            <>
                <img src={data?.[0]?.logo} alt={data?.[0]?.institution} className={classes.uniLogo} />
                <ProfileCardFrontTypography classes={{ container: classes.typography }}>
                    <FormattedMessage
                        id="Studies.title"
                        defaultMessage="I graduated from {schoolName}"
                        values={{ schoolName: getProfileText(data?.[0]?.institution, { intl }) }}
                    />
                </ProfileCardFrontTypography>
            </>
        );
    }
    return (
        <div className={classes.noEducation}>
            <Typography variant="h3" component="h3" customClasses={{ container: classes.noEducationTypography }}>
                <FormattedMessage
                    id="Studies.front.noEducation"
                    defaultMessage="Vous n'avez pas encore ajouté de formations !"
                />
            </Typography>
            <NoDataButton
                handleAddButtonClick={handleAddButtonClick}
                classes={{
                    container: classes.addButton
                }}
            >
                <FormattedMessage id="Studies.noEducation.buttonLabel" defaultMessage="Ajouter une formation" />
            </NoDataButton>
        </div>
    );
};

export const StudiesFront = memo(StudiesFrontComponent);
