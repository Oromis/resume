import React from 'react';

import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';

import { Tooltip, Typography } from '@welovedevs/ui';

import { styles } from './contact_info_row_styles';

const useStyles = createUseStyles(styles);

export const ContactInfoRow = ({ icon: Icon, translation, value, link = false }) => {
    const classes = useStyles();
    const { formatMessage } = useIntl();
    const innerContent = (
        <Typography color="light">
            <Icon className={classes.icon} /> {value}
        </Typography>
    );
    return (
        <div className={classes.container}>
            <Tooltip title={formatMessage(translation)}>
                {link ? (
                    <a href={typeof link === 'string' ? `${link}:${value}` : value}>{innerContent}</a>
                ) : (
                    innerContent
                )}
            </Tooltip>
        </div>
    );
};
