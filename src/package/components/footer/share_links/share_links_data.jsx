import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CopyWrapper } from '../../commons/copy_wrapper/copy_wrapper';

import { ReactComponent as XingIcon } from '../../../assets/icons/brands/xing.svg';
import { ReactComponent as LinkedInIcon } from '../../../assets/icons/brands/linkedin.svg';
import { ReactComponent as ShareIcon } from '../../../assets/icons/share.svg';

export const SHARE_LINKS_DATA = Object.freeze({
    xing: {
        icon: XingIcon,
        tooltipTranslation: (
            <FormattedMessage
                id="Footer.profileLinks.myProfileOn"
                defaultMessage="My profile on {platform}"
                values={{ platform: 'Xing' }}
            />
        ),
        getLink: () => `https://www.xing.com/profile/David_Bauske`
    },
    linkedIn: {
        icon: LinkedInIcon,
        tooltipTranslation: (
            <FormattedMessage
                id="Footer.profileLinks.myProfileOn"
                defaultMessage="My profile on {platform}"
                values={{ platform: 'LinkedIn' }}
            />
        ),
        getLink: () => `https://www.linkedin.com/in/david-bauske/`
    },
    copyShareUrl: {
        icon: (props) => (
            <CopyWrapper value={(typeof window === 'undefined' ? {} : window).location?.href}>
                <ShareIcon {...props} />
            </CopyWrapper>
        ),
        tooltipTranslation: <FormattedMessage id="Footer.shareLinks.copyUrl" defaultMessage="Copy profile's URL" />
    }
});
