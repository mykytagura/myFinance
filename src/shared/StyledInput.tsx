import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from "react-native";
import {BORDER_RADIUS, COLORS, FONT_SIZE, SPACING} from "@/src/constants/style";
import StyledText from "@/src/shared/StyledText";
import {useDarkTheme} from "@/src/hooks/useDarkTheme";

export interface StyledInputProps extends TextInputProps {
    label?: string
}

const StyledInput = ({label, ...props}: StyledInputProps) => {
    const {theme} = useDarkTheme()
    return (
        <View style={style.inputWrapper}>
            {label && <StyledText>{label}</StyledText>}
            <TextInput
                style={[style.input, {borderColor: COLORS[theme].border_alt, color: COLORS[theme].text.primary, backgroundColor: COLORS[theme].surfaceLight}]}
                placeholderTextColor={COLORS[theme].text.tertiary}
                {...props}
            />
        </View>
    );
};

const style = StyleSheet.create({
    inputWrapper: {
        rowGap: SPACING.sm
    },
    input: {
        borderWidth: 1,
        borderRadius: BORDER_RADIUS.md,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,

        fontWeight: '400',
        fontSize: FONT_SIZE.xl
    }
})

export default StyledInput;