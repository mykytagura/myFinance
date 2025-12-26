import React from 'react';
import {Text, TextProps, TextStyle} from "react-native";
import {COLORS, FONT_SIZE} from "@/src/constants/style";
import {useDarkTheme} from "@/src/hooks/useDarkTheme";

type StyledTextProps = TextProps & {
    fontSize?: keyof typeof FONT_SIZE;
    color?: keyof typeof COLORS.light.text,
    theme?: 'light' | 'dark'
    fontWeight?: TextStyle["fontWeight"]
}

const StyledText = ({
    fontSize = 'base',
    color = 'primary',
    theme,
    style,
    fontWeight,
    ...props
}: StyledTextProps) => {
    const {theme: theme_} = useDarkTheme()
    return (
        <Text
            {...props}
            style={[{
                fontSize: FONT_SIZE[fontSize],
                color: theme ?  COLORS[theme].text[color] : COLORS[theme_].text[color],
                fontWeight
            }, style]}
        />
    );
};

export default StyledText;