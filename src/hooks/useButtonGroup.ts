import type {TouchableOpacityProps,GestureResponderEvent} from "react-native";
import {useMemo, useState} from "react";
import {ButtonGroupProps} from "@/src/shared/ButtonGroup";
import {LinearGradientProps} from "expo-linear-gradient";

export const useButtonGroup = (text: string[], activeColor?: LinearGradientProps["colors"], color?: LinearGradientProps["colors"], onPress?: TouchableOpacityProps['onPress']): ButtonGroupProps => {
    const [active, setActive] = useState(text[0])
    const buttons = useMemo(() => text.map((item) => {
        return {text: item, colors: active === item ? activeColor : color, onPress: (e: GestureResponderEvent) => {
                setActive(item)
                if (onPress) {
                    onPress(e)
                }
            }
        }
    }), [active, activeColor, color, onPress, text])
    return {buttons}
}