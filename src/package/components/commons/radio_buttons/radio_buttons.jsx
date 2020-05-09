import { Tooltip } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import cn from 'classnames';

import { getHexFromTheme } from '@welovedevs/ui/styles/utils/styles_utils';

import styles from './radio_buttons_styles';

const useStyles = createUseStyles(styles);

const RadioButton = ({ option, color, backgroundColor, isSelected, onClick }) => {
    const theme = useTheme();
    const fgColor = useMemo(() => (isSelected ? backgroundColor : color), [isSelected, color, backgroundColor, theme]);
    const bgColor = useMemo(() => (isSelected ? color : backgroundColor), [isSelected, color, backgroundColor, theme]);
    const fgHexColor = useMemo(() => getHexFromTheme(theme, fgColor), [theme, fgColor]);
    const bgHexColor = useMemo(() => getHexFromTheme(theme, bgColor), [theme, bgColor]);
    const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);
    const classes = useStyles({ color: fgHexColor, backgroundColor: bgHexColor, borderColor: hexColor });
    const clickHandler = useCallback(() => onClick(option), [option]);

    return (
        <Tooltip title={option.label}>
            <button type="button" className={cn(classes.button, classes.withColor)} onClick={clickHandler}>
                {option.icon ? <option.icon className={classes.icon} /> : option.label}
            </button>
        </Tooltip>
    );
};

const RadioButtons = ({ options, value, className, color = 'default', backgroundColor, onChange = () => {} }) => {
    const classes = useStyles();
    return (
        <div className={cn(classes.container, className)}>
            {options.map((option) => {
                let selected = option.key === value?.key;
                return (
                    <RadioButton
                        key={option.key}
                        option={option}
                        color={color}
                        backgroundColor={backgroundColor}
                        isSelected={selected}
                        onClick={onChange}
                    />
                );
            })}
        </div>
    );
};

export default RadioButtons;
