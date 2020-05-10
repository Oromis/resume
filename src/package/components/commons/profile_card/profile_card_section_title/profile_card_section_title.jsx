import React from 'react';

import { createUseStyles } from 'react-jss';

import { Typography } from '@welovedevs/ui';

import { styles } from './profile_card_section_title_styles';

const useStyles = createUseStyles(styles);

const ProfileCardSectionTitleComponent = ({ children, containerClasses = null }) => {
    const classes = useStyles();
    return (
        <Typography variant="h2" component="h3" customClasses={{ container: [classes.container, containerClasses] }}>
            {children}
        </Typography>
    );
};

export const ProfileCardSectionTitle = ProfileCardSectionTitleComponent;
