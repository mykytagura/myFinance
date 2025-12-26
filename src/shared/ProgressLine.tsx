import {StyleSheet, View, type ViewProps} from "react-native";
import {BORDER_RADIUS, COLORS} from "@/src/constants/style";
import {useDarkTheme} from "@/src/hooks/useDarkTheme";

export interface progressLineProps extends ViewProps {
    progress: number
    progressColor?: Exclude<keyof typeof COLORS.light, 'text'>
}

const ProgressLine = ({ progress, progressColor, ...props}: progressLineProps) => {
    const {theme} = useDarkTheme()
    return (
        <View style={[style.baseLine, {backgroundColor: COLORS[theme].surfaceLight}]} {...props}>
            <View style={[style.progressLine, {
                width: `${progress}%`,
                backgroundColor: progressColor ? COLORS[theme][progressColor] : COLORS[theme].income}
            ]}/>
        </View>
    );
};

const style = StyleSheet.create({
    baseLine: {
        flex: 1,
        height: 10,
        borderRadius: BORDER_RADIUS.md,
        overflow: 'hidden'
    },
    progressLine: {
        height: 10,
    }
})

export default ProgressLine;