import React, { memo, useContext, useMemo } from 'react';

import cn from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';
import { FormattedMessage } from 'react-intl';

import { Tooltip } from '@welovedevs/ui';
import { useMediaQuery } from '@material-ui/core';
import { getFooterColor } from '../../styles/color_utils';
import { DeveloperProfileContext } from '../../utils/context/contexts';
import { getHexFromPaletteColor } from '../../utils/styles/styles_utils';
import { mapSkillsFromJsonResume } from '../cards/cards_types/skills/data/mapping';

import { ShareLinks } from './share_links/share_links';

import { ReactComponent as Logo } from '../../assets/icons/brands/welovedevs.svg';
import { ReactComponent as GithubLogo } from '../../assets/icons/brands/github.svg';
import { ReactComponent as Cookie } from '../../assets/icons/emoji_cookie.svg';

import { styles } from './footer_styles';

const useStyles = createUseStyles(styles);

const LegalSection = () => {
    const classes = useStyles();
    const theme = useTheme();
    const footerColor = useMemo(() => getFooterColor(theme), [theme]);

    const { data } = useContext(DeveloperProfileContext);
    const imprintData = useMemo(() => data?.imprint || {}, [data]);

    return (
        <div className={classes.legal}>
            <div className={classes.legalBlock}>
                <h3>
                    <FormattedMessage id="Footer.legal.cookiesHeading" />
                </h3>
                <p>
                    <FormattedMessage id="Footer.legal.cookies1" />
                    <Cookie width={24} height={24} stroke={footerColor} className={classes.cookieEmoji} />
                    <FormattedMessage id="Footer.legal.cookies2" />
                    &nbsp;
                    <a href="https://knowyourmeme.com/memes/come-to-the-dark-side">
                        <FormattedMessage id="Footer.legal.cookies3" />
                    </a>
                </p>
            </div>
            <div className={classes.legalBlock}>
                <h3>
                    <FormattedMessage id="Footer.legal.imprint.heading" />
                </h3>
                <p>
                    <FormattedMessage id="Footer.legal.imprint.responsible" />
                    <br />
                    {imprintData.name}
                    <br />
                    {imprintData.address}
                    <br />
                    {imprintData.zip}
                    <br />
                    {imprintData.city}, {imprintData.country}
                    <br />
                    {imprintData.email}
                </p>
            </div>
        </div>
    );
};

const FooterComponent = () => {
    const classes = useStyles();
    const theme = useTheme();
    const { screenSizes } = theme;

    const useSmallLayout = useMediaQuery(
        `(max-width: ${screenSizes.medium - (screenSizes.medium - screenSizes.small) / 2}px)`,
        { defaultMatches: true }
    );

    if (useSmallLayout) {
        return (
            <footer className={classes.wrapper}>
                <div className={cn(classes.container, useSmallLayout && classes.smallLayoutContainer)}>
                    <div className={classes.wldLogoGithubLogoContainer}>
                        <a
                            className={classes.logoLink}
                            href="https://welovedevs.com"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <Logo className={classes.logo} />
                        </a>
                        <Tooltip
                            title={
                                <FormattedMessage
                                    id="Footer.github.tooltip"
                                    defaultMessage="Create your own developer profile!"
                                />
                            }
                        >
                            <a
                                className={classes.githubLink}
                                href="https://github.com/welovedevs/developer-profile"
                                target="_bank"
                                rel="noreferer noopener"
                            >
                                <GithubLogo className={classes.githubLogo} />
                            </a>
                        </Tooltip>
                    </div>
                    <ShareLinks useSmallLayout />
                </div>
                <LegalSection />
            </footer>
        );
    } else {
        return (
            <footer className={classes.wrapper}>
                <div className={classes.container}>
                    <a
                        className={classes.logoLink}
                        href="https://welovedevs.com"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <Logo className={classes.logo} />
                    </a>
                    <ShareLinks />
                    <Tooltip
                        title={
                            <FormattedMessage
                                id="Footer.github.tooltip"
                                defaultMessage="Create your own developer profile!"
                            />
                        }
                    >
                        <a
                            className={classes.githubLink}
                            href="https://github.com/Oromis/resume"
                            target="_bank"
                            rel="noreferer noopener"
                        >
                            <GithubLogo className={classes.githubLogo} />
                        </a>
                    </Tooltip>
                </div>
                <LegalSection />
            </footer>
        );
    }
};

export const Footer = memo(FooterComponent);
