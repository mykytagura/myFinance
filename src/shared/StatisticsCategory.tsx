import React, {memo} from 'react';
import {StyleSheet, View} from "react-native";
import ProgressLine, {progressLineProps} from "@/src/shared/ProgressLine";
import {SPACING} from "@/src/constants/style";
import StyledText from "@/src/shared/StyledText";
import {formatCurrency} from "@/src/util/formatCurrency";

interface statisticsCategory {
    progressLine: progressLineProps,
    category: string,
    amount: number
}

const StatisticsCategory = memo(({ progressLine, category, amount}: statisticsCategory) => {
    amount = amount || 0
    return (
        <View style={style.wrapper}>
            <View style={style.line}>
                <StyledText fontSize={'lg'} fontWeight={'600'}>{category}</StyledText>
                <View style={style.amount}>
                    <StyledText fontSize={'xl'} fontWeight={'700'}>{formatCurrency(amount)}</StyledText>
                </View>
            </View>
            <View style={style.line}>
                <ProgressLine progress={progressLine.progress} progressColor={progressLine.progressColor}/>
                <StyledText color={'secondary'}>{progressLine.progress}%</StyledText>
            </View>
        </View>
    )
}, (prevProps, nextProps) => {
    return prevProps.amount === nextProps.amount && prevProps.category === nextProps.category && prevProps.progressLine.progress === nextProps.progressLine.progress
});

StatisticsCategory.displayName = 'StatisticsCategory';

const style = StyleSheet.create({
    wrapper: {
        width: '100%',
        rowGap: SPACING.sm
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: SPACING.md
    },
    amount: {
        flexDirection: 'row',
        columnGap: SPACING.xs,
        alignItems: 'center'
    }
})

export default StatisticsCategory;