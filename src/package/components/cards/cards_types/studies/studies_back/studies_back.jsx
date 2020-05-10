import React, { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { getProfileText } from '../../../../../utils/profile_translation';
import { ProfileCardSection } from '../../../../commons/profile_card/profile_card_section/profile_card_section';
import { ProfileCardSectionTitle } from '../../../../commons/profile_card/profile_card_section_title/profile_card_section_title';
import { ProfileCardAnimatedBack } from '../../../../commons/profile_card/profile_card_animated_back/profile_card_animated_back';
import { ProfileCardSectionSubtitle } from '../../../../commons/profile_card/profile_card_section_subtitle/profile_card_section_subtitle';
import { ProfileCardSectionText } from '../../../../commons/profile_card/profile_card_section_text/profile_card_section_text';
import { existsAndNotEmpty } from '../../../utils/exists_and_not_empty';
import { NoStudies } from './no_studies/no_studies';

const Study = ({ study }) => {
    const { startDate, endDate, area, studyType, institution } = study;
    const intl = useIntl();
    const title = institution;
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
    return (
        <ProfileCardSection>
            <ProfileCardSectionTitle>{getProfileText(title, { intl })}</ProfileCardSectionTitle>
            <ProfileCardSectionSubtitle>{body}</ProfileCardSectionSubtitle>
            {date && <ProfileCardSectionText>{date}</ProfileCardSectionText>}
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
