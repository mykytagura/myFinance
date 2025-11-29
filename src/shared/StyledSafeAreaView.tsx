import React from 'react';
import {SafeAreaView, SafeAreaViewProps} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "@/src/constants/style";
import {useDarkTheme} from "@/src/hooks/useDarkTheme";

const StyledSafeAreaView = ({children, ...props}: SafeAreaViewProps) => {
    const {theme} = useDarkTheme()
    return (
        <LinearGradient
            colors={[COLORS[theme].primary, COLORS[theme].secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView {...props} style={{flex: 1}} edges={['top']}>

                    {children}
            </SafeAreaView>
        </LinearGradient>
    );
};

export default StyledSafeAreaView;