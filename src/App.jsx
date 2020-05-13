import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import isArray from 'lodash/isArray';
import mergeWith from 'lodash/mergeWith';
import omit from 'lodash/omit';
import cloneDeep from 'lodash/cloneDeep';
import download from 'downloadjs';
import { Button } from '@welovedevs/ui';
import moment from 'moment';
import { BrowserRouter, Switch, Route, useHistory, useParams } from 'react-router-dom';

import JsonStub from './data/resume.json';
import DeveloperProfile from './package';
import { ReactComponent as SaveIcon } from './package/assets/icons/drop_file.svg';
import { ReactComponent as GermanFlag } from './package/assets/icons/de.svg';
import { ReactComponent as EnglishFlag } from './package/assets/icons/en.svg';

import { styles } from './app_styles';
import RadioButtons from './package/components/commons/radio_buttons/radio_buttons';

const useStyles = createUseStyles(styles);
const mergeFunction = (objValue, srcValue, key) => {
    console.log({ objValue, srcValue, key });
    if (!objValue || isArray(objValue)) {
        return srcValue;
    }
    return undefined;
};

const mode = process.env.REACT_APP_MODE || 'readOnly';

const DEFAULT_LANGUAGE = 'en';
const languageOptions = [
    { key: 'en', label: 'English', icon: EnglishFlag },
    { key: 'de', label: 'Deutsch', icon: GermanFlag }
];

function loadSelectedLanguage() {
    return window.localStorage.getItem('locale');
}

function storeSelectedLanguage(locale) {
    window.localStorage.setItem('locale', locale);
}

function getMatchingNavigatorLanguage() {
    const list = window.navigator.languages ?? [window.navigator.language];
    return list.map((code) => code.split(/[-_]/g)[0]).find((code) => languageOptions.find((op) => op.key === code));
}

function getInitialLanguage() {
    const result = loadSelectedLanguage() ?? getMatchingNavigatorLanguage() ?? DEFAULT_LANGUAGE;
    moment.locale(result);
    return result;
}

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <LanguageRedirect />
                </Route>
                <Route path="/:locale">
                    <ProfileRoot />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

function LanguageRedirect() {
    const history = useHistory();
    const locale = getInitialLanguage();
    history.replace(`/${locale}`);
    return null;
}

function ProfileRoot() {
    const classes = useStyles();
    const [data, setData] = useState(omit(JsonStub, 'resumeCustomization'));
    const history = useHistory();
    const { locale } = useParams();

    const onEdit = useCallback((newData) => setData(mergeWith(cloneDeep(data), newData, mergeFunction)), [
        JSON.stringify(data)
    ]);
    const [customization, setCustomization] = useState(JsonStub.resumeCustomization || {});

    const onCustomizationChanged = useCallback(setCustomization, [data]);

    const handleClick = useCallback(async () => {
        // eslint-disable-next-line no-undef
        const blob = new Blob([JSON.stringify({ ...data, resumeCustomization: customization })], {
            type: 'text/plain; charset=utf-8'
        });
        download(
            blob,
            `${`Resume-${data?.basics?.name || 'Developer'}`.replace(' ', '-')}.json`,
            'text/plain; charset=utf-8'
        );
    }, [JSON.stringify(data), JSON.stringify(customization)]);

    const onChangeLanguage = useCallback((languageOption) => {
        const newLocale = languageOption.key;
        storeSelectedLanguage(newLocale);
        moment.locale(newLocale);
        history.push(`/${newLocale}`);
    }, []);

    return (
        <DeveloperProfile
            mode={mode}
            data={data}
            onEdit={onEdit}
            onCustomizationChanged={onCustomizationChanged}
            options={{
                locale,
                // side: 'back',
                apiKeys: {
                    giphy: process.env.REACT_APP_GIPHY
                },
                endpoints: {
                    devicons:
                        'https://firebasestorage.googleapis.com/v0/b/jechercheundev.appspot.com/o/technologies%2Ftechnologies_list.json?alt=media&token=459028ba-d9bc-4480-a3c4-88633afab7e2'
                },
                customization
            }}
            additionalNodes={{
                banner: {
                    actionsButtons: [
                        // <Button variant="outlined" onClick={handleClick} color={'light'} key="export" size="small">
                        //     <SaveIcon className={classes.saveIcon} />
                        //     <FormattedMessage id="Profile.header.jsonResume.download" defaultMessage="Export" />
                        // </Button>,
                        <RadioButtons
                            key="language"
                            color="light"
                            backgroundColor="dark"
                            size="small"
                            options={languageOptions}
                            value={languageOptions.find((lo) => lo.key === locale)}
                            onChange={onChangeLanguage}
                        />
                    ]
                }
            }}
        />
    );
}

export default App;
