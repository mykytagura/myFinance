import React from 'react';
import {TouchableOpacity, StyleSheet, TouchableOpacityProps, View} from "react-native";
import {BORDER_RADIUS, COLORS, OPACITY} from "@/src/constants/style";
import {LinearGradient, LinearGradientProps} from "expo-linear-gradient";

export interface ButtonProps extends Omit<LinearGradientProps, "colors"> {
    colors?: LinearGradientProps["colors"],
    onPress?: TouchableOpacityProps['onPress'],
    activeOpacity?: number,
}

export const StyledButton = ({children, colors, style, activeOpacity = OPACITY.active, ...props}: ButtonProps) => {
    return (
        <TouchableOpacity activeOpacity={activeOpacity} onPress={props.onPress}>
            <LinearGradient
                style={[styles.button, style]}
                colors={colors ? colors : [COLORS.light.primary, COLORS.light.secondary]}
                {...props}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
};

interface ButtonWithShadowProps extends ButtonProps {
    shadowColor?: string
    shadowOffset?: { width: number, height: number }
    shadowOpacity?: number
    shadowRadius?: number
    elevation?: number
}

export const ButtonWithShadow = ({
                                     shadowColor = COLORS.light.secondary,
                                     shadowOffset = {width: 0, height: 10},
                                     shadowOpacity = 1,
                                     shadowRadius = 10,
                                     elevation = 10,
                                     ...props
                                 }: ButtonWithShadowProps) => {
    return (
        <TouchableOpacity>
            <View style={{
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
                elevation,
            }}>
                <StyledButton {...props}/>
            </View>
        </TouchableOpacity>
    );
};

export const StyledTextButton = ({activeOpacity = 0.7, ...props}: ButtonProps) => {
    return <StyledButton {...props} activeOpacity={activeOpacity} colors={['transparent', 'transparent']}/>
}


const styles = StyleSheet.create({
    button: {
        borderRadius: BORDER_RADIUS.lg,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
