import React, { useCallback, useContext, useMemo } from 'react';

import { ProfileCard } from '../../../commons/profile_card/profile_card';
import { mapSkillsFromJsonResume } from '../skills/data/mapping';
import { validateSkillsComplete } from '../skills/data/validator';
import { InterestedByFront } from './interested_by_front/interested_by_front';
import { FlatObjectToJsonResume, JsonResumeToFlatObject } from '../../utils/data_mapping';
import { InterestedByEditDialog } from './interested_by_edit_dialog/interested_by_edit_dialog';

import { interestedByMapping } from './data/mapping';
import { interestedByValidationSchema, validateInterestedByComplete } from './data/validator';
import { DeveloperProfileContext } from '../../../../utils/context/contexts';
import { useMode } from '../../../hooks/use_mode';

const InterestedByCardComponent = ({ variant, side }) => {
    const [mode] = useMode();

    const { data, onEdit, isEditing } = useContext(DeveloperProfileContext);
    const mappedData = useMemo(() => mapSkillsFromJsonResume(data), [data]);

    const onDialogEdited = useCallback(
        (editedData) => {
            onEdit(FlatObjectToJsonResume(editedData, interestedByMapping));
        },
        [onEdit]
    );

    const isComplete = useMemo(() => validateSkillsComplete(mappedData), [mappedData]);

    if (!isComplete && mode !== 'edit') {
        return null;
    }
    return (
        <>
            <ProfileCard
                kind="interested_by"
                data={mappedData}
                isComplete={isComplete}
                isEditingProfile={isEditing}
                sides={{
                    front: (props) => <InterestedByFront {...props} />
                }}
                editDialog={{
                    component: InterestedByEditDialog,
                    validationSchema: interestedByValidationSchema,
                    onEdit: onDialogEdited
                }}
                variant={variant}
                side={side}
            />
        </>
    );
};

export const InterestedByCard = InterestedByCardComponent;
