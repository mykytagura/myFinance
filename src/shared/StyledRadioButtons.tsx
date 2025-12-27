import React from 'react';
import {StyleSheet, View} from "react-native";
import ButtonGroup, {ButtonGroupProps} from "@/src/shared/ButtonGroup";
import {SPACING} from "@/src/constants/style";
import StyledText from "@/src/shared/StyledText";

interface StyledRadioButtonsProps extends ButtonGroupProps {
    label: string
}

const StyledRadioButtons = ({label, renderButton, data, ...props}: StyledRadioButtonsProps) => {
    return (
        <View style={style.wrapper}>
            <StyledText>{label}</StyledText>
            <ButtonGroup renderButton={renderButton} data={data} {...props}/>
        </View>
    );
};

const style = StyleSheet.create({
    wrapper: {
        rowGap: SPACING.md
    }
})

export default StyledRadioButtons;