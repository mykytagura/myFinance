import React from 'react';
import {View, ViewProps} from "react-native";
import {BORDER_RADIUS, COLORS, SPACING} from "@/src/constants/style";
import {useDarkTheme} from "@/src/hooks/useDarkTheme";

interface CardProps extends ViewProps {
    offset?: keyof typeof SPACING
    borderRadius?: keyof typeof BORDER_RADIUS
    backgroundColor?: Exclude<keyof typeof COLORS.light, 'text'>
}

const Card = ({children, style, offset = 'lg', borderRadius = 'lg', backgroundColor = 'surface', ...props}: CardProps) => {
    const {theme} = useDarkTheme()
    return (
        <View
            style={[{
                padding: SPACING[offset],
                borderRadius: BORDER_RADIUS[borderRadius],
                backgroundColor: COLORS[theme][backgroundColor]
            }, style]}
            {...props}
        >
            {children}
        </View>
    );
};

export default Card;