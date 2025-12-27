import React, {useMemo} from 'react';
import StyledText from "@/src/shared/StyledText";
import PageLayout from "@/src/shared/PageLayout";
import {StyleSheet, View} from "react-native";
import Card from "@/src/shared/Card";
import ButtonGroup from "@/src/shared/ButtonGroup";
import {BORDER_RADIUS, COLORS, SPACING} from "@/src/constants/style";
import StatisticsCategory from "@/src/shared/StatisticsCategory";
import {useDarkTheme} from "@/src/hooks/useDarkTheme";
import {StyledButton} from "@/src/shared/StyledButton";

const Header = () => {
    return <StyledText theme={'dark'} fontSize={'3xl'} fontWeight={'600'} style={{marginTop: 8}}>Статистика</StyledText>
}

const options = [{label: 'Неделя', value: 'week'}, {label: 'Месяц', value: 'month'}, {label: 'Год', value: 'year'}]
const Body = () => {
    const {theme} = useDarkTheme()
    return <View style={style.body}>
        <Card>
            <ButtonGroup
                autoSelect
                data={options}
                renderButton={({text, active, onPress}) =>
                    <StyledButton style={style.button} onPress={onPress} colors={active ? [COLORS[theme].primary, COLORS[theme].primary] : [COLORS[theme].grey, COLORS[theme].grey]}>
                        <StyledText theme={'dark'}>{text}</StyledText>
                    </StyledButton>
                }
            />
        </Card>
        <View style={style.bodyInner}>
            <Card style={style.statisticsCategory}>
                <StyledText fontSize={'xl'} fontWeight={'600'}>Расходы по категориям</StyledText>
                <StatisticsCategory progressLine={{progress: 20}} category={'Еда'} amount={111110}/>
                <StatisticsCategory progressLine={{progress: 20}} category={'Еда'} amount={10}/>
                <StatisticsCategory progressLine={{progress: 20}} category={'Еда'} amount={10}/>
                <StatisticsCategory progressLine={{progress: 20}} category={'Еда'} amount={10}/>
            </Card>
            <Card>
                <StyledText style={{marginBottom: 30}} fontSize={'xl'} fontWeight={'600'}>График расходов</StyledText>
            </Card>
        </View>
    </View>
}

const StatisticsPage = () => {
    return (
        <PageLayout
            headerRender={() => <Header />}
            bodyRender={() => <Body />}
        />
    );
};

const style = StyleSheet.create({
    body: {
        paddingVertical: SPACING.md,
    },
    bodyInner: {
        rowGap: SPACING.lg,
        marginTop: SPACING.md
    },
    statisticsCategory: {
        rowGap: SPACING.lg
    },
    button: {
        borderRadius: BORDER_RADIUS.sm
    }
})

export default StatisticsPage;