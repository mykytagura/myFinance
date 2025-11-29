import React from 'react';
import {Text, TextProps} from "react-native";
import {COLORS, FONT_SIZE} from "@/src/constants/style";
import {useDarkTheme} from "@/src/hooks/useDarkTheme";

type StyledTextProps = TextProps & {
    fontSize?: keyof typeof FONT_SIZE;
    color?: keyof typeof COLORS.light.text,
    theme?: 'light' | 'dark'
}

const StyledText = ({
    fontSize = 'base',
    color = 'primary',
    theme,
    ...props
}: StyledTextProps) => {
    const {theme: theme_} = useDarkTheme()
    return (
        <Text
            {...props}
            style={{
                fontSize: FONT_SIZE[fontSize],
                color: theme ?  COLORS[theme].text[color] : COLORS[theme_].text[color]
            }}
        />
    );
};

export default StyledText;