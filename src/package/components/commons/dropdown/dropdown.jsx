import { getHexFromTheme } from '@welovedevs/ui/styles/utils/styles_utils';
import React, { useCallback, useMemo } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import styles from './dropdown_styles';
import cn from 'classnames';

const useStyles = createUseStyles(styles);
export default function Dropdown({ options, value, onChange, className, color, backgroundColor } = {}) {
    const theme = useTheme();
    const fgHexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);
    const bgHexColor = useMemo(() => getHexFromTheme(theme, backgroundColor), [theme, backgroundColor]);
    const hexColor = useMemo(() => getHexFromTheme(theme, color), [theme, color]);
    const classes = useStyles({ color: fgHexColor, backgroundColor: bgHexColor, borderColor: hexColor });

    const changeCallback = useCallback((event) => onChange(options.find((o) => o.key === event.currentTarget.value)), [
        onChange,
        options
    ]);
    return (
        <select onChange={changeCallback} className={cn(className, classes.select)}>
            {options.map((option) => (
                <option
                    key={option.key}
                    value={option.key}
                    selected={option.key === value?.key}
                    className={classes.option}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}
