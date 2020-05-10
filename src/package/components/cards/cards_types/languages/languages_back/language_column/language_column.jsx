import React from 'react';
import { useIntl } from 'react-intl';

import { createUseStyles } from 'react-jss';

import { Tooltip, Typography } from '@welovedevs/ui';
import { getProfileText } from '../../../../../../utils/profile_translation';

import { styles } from './language_column_styles';

const useStyles = createUseStyles(styles);

const LanguageColumnComponent = ({
    component: Component = 'div',
    color,
    style,
    item: { value, language, level } = {},
    children,
    itemsSize
}) => {
    const intl = useIntl();
    const classes = useStyles({ value, color, itemsSize });

    return (
        <Tooltip
            open
            customClasses={{ container: classes.popper }}
            title={`${getProfileText(language, { intl })}: ${value}%, ${getProfileText(level, { intl })}`}
        >
            <Component className={classes.container} style={style}>
                <Typography variant="h2" color="light" customClasses={{ container: classes.typography }}>
                    {children}
                </Typography>
            </Component>
        </Tooltip>
    );
};

export const LanguageColumn = LanguageColumnComponent;
