import React from 'react';
import {StyleSheet, View} from "react-native";
import {ButtonProps, StyledButton} from "@/src/shared/StyledButton";
import StyledText from "@/src/shared/StyledText";

export interface ButtonGroupProps {
    buttons: (ButtonProps & {text: string})[]
}

const ButtonGroup = ({buttons}: ButtonGroupProps) => {
    return (
        <View style={style.buttonGroup}>
            {buttons.map(button => (
                    <StyledButton style={style.button} key={button.text} {...button}>
                        <StyledText theme={'dark'} fontWeight={'500'}>{button.text}</StyledText>
                    </StyledButton>
                )
            )}
        </View>
    );
};

const style = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    buttonGroup: {
        flexDirection: 'row',
        columnGap: 8
    }
})

export default ButtonGroup;