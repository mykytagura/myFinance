import React, {ReactNode} from 'react';
import {BORDER_RADIUS, COLORS} from "@/src/constants/style";
import {LinearGradient, LinearGradientProps} from "expo-linear-gradient";

interface IconWithBackgroundProps extends Omit<LinearGradientProps, "children" | "colors"> {
    icon: ReactNode
    colors?: LinearGradientProps["colors"]
    width: number
}

const IconWithBackground = ({icon, colors, style, width, ...props}: IconWithBackgroundProps) => {
    return (
        <LinearGradient
            style={[{
                borderRadius: BORDER_RADIUS.md,
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: 1,
                width
            }, style]}
            colors={colors ? colors : [COLORS.light.primary, COLORS.light.secondary]}
            {...props}
        >
            {icon}
        </LinearGradient>
    );
};

export default IconWithBackground;