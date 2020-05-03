import React from 'react';

import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';

import { Tooltip, Typography } from '@welovedevs/ui';

import { styles } from './contact_info_row_styles';

const useStyles = createUseStyles(styles);

export const ContactInfoRow = ({ icon: Icon, translation, value, link = false }) => {
    const classes = useStyles();
    const { formatMessage } = useIntl();
    return (
        <div className={classes.container}>
            <Tooltip title={formatMessage(translation)}>
                <button className={classes.button} type="button">
                    <Icon className={classes.icon} />
                </button>
            </Tooltip>
            <Typography customClasses={{ container: classes.typography }} color="light">
                {link ? <a href={typeof link === 'string' ? `${link}:${value}` : value}>{value}</a> : value}
            </Typography>
        </div>
    );
};
