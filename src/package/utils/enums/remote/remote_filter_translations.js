import { defineMessages } from 'react-intl';

export const remoteSelectTranslations = defineMessages({
    never: {
        id: 'Developer.RemoteFrequency.Select.Never',
        defaultMessage: 'No'
    },
    occasionally: {
        id: 'Developer.RemoteFrequency.Select.Occasionally',
        defaultMessage: 'Occasionally'
    },
    regularly: {
        id: 'Developer.RemoteFrequency.Select.Regularly',
        defaultMessage: 'Regularly'
    },
    fullTime: {
        id: 'Developer.RemoteFrequency.Select.FullTime',
        defaultMessage: 'Full-time'
    },
    others: {
        id: 'Developer.RemoteFrequency.Select.Other',
        defaultMessage: 'Other'
    }
});

export const remoteDisplayTranslations = defineMessages({
    never: {
        id: 'Developer.RemoteFrequency.Display.never',
        defaultMessage: "I'm not interested in remote work"
    },
    occasionally: {
        id: 'Developer.RemoteFrequency.Display.occasionally',
        defaultMessage: "I'm interested in occasional remote work (a few times a month)"
    },
    regularly: {
        id: 'Developer.RemoteFrequency.Display.regularly',
        defaultMessage: "I'm interested in regular remote work (a few times a week)"
    },
    fullTime: {
        id: 'Developer.RemoteFrequency.Display.fullTime',
        defaultMessage: "I'm interested in full-time remote work"
    },
    others: {
        id: 'Developer.RemoteFrequency.Display.other',
        defaultMessage: 'Autres'
    }
});
