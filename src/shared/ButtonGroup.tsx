import React, {ReactNode, useState} from 'react';
import {StyleSheet, View, ViewProps} from "react-native";

export interface ButtonGroupProps extends ViewProps{
    renderButton: (params: {text: string, active: boolean, onPress: () => void}) => ReactNode
    data: { label: string, value: string }[],
    onChange?: (value: string) => void
    fullWidth?: boolean
    autoSelect?: boolean
}

const ButtonGroup = ({renderButton, data, onChange, fullWidth, autoSelect, ...props}: ButtonGroupProps) => {
    const [active, setActive] = useState( autoSelect ? data[0].value : null)
    return (
        <View style={[style.buttonGroup, props.style]} {...props}>
            {data.map(({label, value}) =>
                <View
                    style={fullWidth && {flex: 1}}
                    key={label}
                >
                    {renderButton({text: label, active: active === value, onPress: () => {
                            setActive(value)
                            if (onChange) {
                                onChange(value)
                            }
                        }})}
                </View>
            )}
        </View>
    );
};

const style = StyleSheet.create({
    buttonGroup: {
        flexDirection: 'row',
        columnGap: 8
    }
})

export default ButtonGroup;