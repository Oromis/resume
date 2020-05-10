import React, { memo, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { getProfileText } from '../../../../../utils/profile_translation';
import { ProfileCardSection } from '../../../../commons/profile_card/profile_card_section/profile_card_section';
import { ProfileCardSectionTitle } from '../../../../commons/profile_card/profile_card_section_title/profile_card_section_title';
import { ProfileCardAnimatedBack } from '../../../../commons/profile_card/profile_card_animated_back/profile_card_animated_back';
import { ProfileCardSectionSubtitle } from '../../../../commons/profile_card/profile_card_section_subtitle/profile_card_section_subtitle';
import { ProfileCardSectionText } from '../../../../commons/profile_card/profile_card_section_text/profile_card_section_text';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';
import { NoStudies } from './no_studies/no_studies';
import styles from './studies_back_styles';

const useStyles = createUseStyles(styles);
const Study = ({ study }) => {
    const { startDate, endDate, area, studyType, institution, logo, finalGrade, specialization } = study;
    const intl = useIntl();
    const title = institution;
    const classes = useStyles();
    const body = useMemo(() => {
        const bodyParts = [];
        if (studyType) {
            bodyParts.push(studyType);
            if (area) {
                bodyParts.push(', ');
            }
        }
        if (area) {
            bodyParts.push(area);
        }

        return bodyParts;
    }, [study]);

    const date = useMemo(() => {
        const startYear = startDate.year();
        const endYear = typeof endDate?.year === 'function' ? endDate.year() : null;
        if (startDate.isValid() && endDate.isValid() && startYear !== endYear) {
            return `${startYear} - ${endYear}`;
        } else if (endDate.isValid()) {
            return endYear;
        } else {
            return '';
        }
    }, [startDate, endDate]);
    const schoolName = getProfileText(title, { intl });
    const details = [];
    if (date) {
        details.push(<span key="date">{date}</span>);
    }
    if (finalGrade) {
        if (details.length > 0) {
            details.push(<br key="br-grade" />);
        }
        details.push(
            <span key="grade">
                <FormattedMessage id="Studies.back.finalGrade" />
                {': '}
                {getProfileText(finalGrade, { intl })}
            </span>
        );
    }
    if (specialization) {
        if (details.length > 0) {
            details.push(<br key="kr-spec" />);
        }
        details.push(
            <span key="spec">
                <FormattedMessage id="Studies.back.specialization" />
                {': '}
                {getProfileText(specialization, { intl })}
            </span>
        );
    }

    return (
        <ProfileCardSection>
            <div className={classes.headRow}>
                <img src={logo} alt={schoolName} className={classes.logo} />
                <ProfileCardSectionTitle containerClasses={classes.schoolName}>{schoolName}</ProfileCardSectionTitle>
            </div>
            <ProfileCardSectionSubtitle>{body}</ProfileCardSectionSubtitle>
            {details.length > 0 && <p>{details}</p>}
        </ProfileCardSection>
    );
};

const Content = ({ data, handleAddButtonClick }) => {
    const hasEducation = useMemo(() => existsAndNotEmpty(data), [data]);

    if (!hasEducation) {
        return <NoStudies {...{ handleAddButtonClick }} />;
    }
    return data?.map((study, index) => <Study key={`study_${index}_${study.id}`} study={study} />);
};

const StudiesBackComponent = ({ data: { education: data }, handleAddButtonClick }) => {
    const { formatMessage } = useIntl();
    return (
        <ProfileCardAnimatedBack title={formatMessage({ id: 'Studies.back.title' })}>
            <Content {...{ data, handleAddButtonClick }} />
        </ProfileCardAnimatedBack>
    );
};

export const StudiesBack = memo(StudiesBackComponent);
