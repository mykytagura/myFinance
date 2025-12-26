import React from 'react';
import StyledText from "@/src/shared/StyledText";
import PageLayout from "@/src/shared/PageLayout";
import {View, StyleSheet, ScrollView} from "react-native";
import Card from "@/src/shared/Card";
import IconWithBackground from "@/src/shared/IconWithBackground";
import {Feather, Ionicons} from "@expo/vector-icons";
import {BORDER_RADIUS, COLORS, SPACING} from "@/src/constants/style";
import {useDarkTheme} from "@/src/hooks/useDarkTheme";
import {StyledTextButton} from "@/src/shared/StyledButton";

const Header = () => {
    return <View style={style.header}>
        <View>
            <StyledText theme={'dark'}>Добро пожаловать 👋</StyledText>
            <StyledText theme={'dark'} fontSize={'3xl'} fontWeight={'600'} style={{marginTop: 8}}>Мои финансы</StyledText>
        </View>
    </View>
}

const Body = () => {
    const {theme} = useDarkTheme()
    return <View style={{rowGap: 20, paddingBottom: 40}}>
        <Card>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: COLORS[theme].border,
                borderBottomWidth: 1,
                paddingBottom: SPACING.md,
                marginBottom: SPACING.md
            }}>
                <View>
                    <StyledText color={'secondary'}>Общий баланс</StyledText>
                    <StyledText fontSize={'4xl'} fontWeight={'700'}>₴80 000</StyledText>
                </View>
                <IconWithBackground width={60} icon={<Ionicons name="wallet-outline" size={30} color='white' />} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{
                    flex: 1,
                    paddingRight: SPACING.md,
                    marginRight: SPACING.md,
                    borderRightColor: COLORS[theme].border,
                    borderRightWidth: 1,
                    rowGap: 10
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 8}}>
                        <IconWithBackground style={{borderRadius: BORDER_RADIUS.sm}} colors={[COLORS[theme].incomeLight, COLORS[theme].incomeLight]} icon={<Ionicons name="trending-up-sharp" size={20} color={COLORS[theme].income} />} width={30}/>
                        <StyledText color={'secondary'} fontSize={'sm'}>Доходы</StyledText>
                    </View>
                    <StyledText fontSize={'2xl'} fontWeight={'700'}>₴80 000</StyledText>
                </View>
                <View style={{
                    flex: 1,
                    rowGap: 10
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 8}}>
                        <IconWithBackground style={{borderRadius: BORDER_RADIUS.sm}} colors={[COLORS[theme].expenseLight, COLORS[theme].expenseLight]} icon={<Ionicons name="trending-down-sharp" size={20} color={COLORS[theme].expense} />} width={30}/>
                        <StyledText color={'secondary'} fontSize={'sm'}>Расходы</StyledText>
                    </View>
                    <StyledText fontSize={'2xl'} fontWeight={'700'}>₴80 000</StyledText>
                </View>
            </View>
        </Card>
        <ScrollView
            horizontal
            contentContainerStyle={{ gap: 12 }}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
        >
            <Card backgroundColor={'blue'} offset={'md'} style={{flex: 1, rowGap: 8, minWidth: 200}}>
                <Ionicons name="card-outline" size={24} color={COLORS.light.surface} />
                <StyledText theme={'dark'}>На картах</StyledText>
                <StyledText fontSize={'2xl'} theme={'dark'} fontWeight={'700'}>₴80 000</StyledText>
            </Card>
            <Card backgroundColor={'income'} offset={'md'} style={{flex: 1, rowGap: 8, minWidth: 200}}>
                <Ionicons name="card-outline" size={24} color={COLORS.light.surface} />
                <StyledText theme={'dark'}>На картах</StyledText>
                <StyledText fontSize={'2xl'} theme={'dark'} fontWeight={'700'}>₴80 000</StyledText>
            </Card>
            <Card backgroundColor={'income'} offset={'md'} style={{flex: 1, rowGap: 8, minWidth: 200}}>
                <Ionicons name="card-outline" size={24} color={COLORS.light.surface} />
                <StyledText theme={'dark'}>На картах</StyledText>
                <StyledText fontSize={'2xl'} theme={'dark'} fontWeight={'700'}>₴80 000</StyledText>
            </Card>
            <Card backgroundColor={'income'} offset={'md'} style={{flex: 1, rowGap: 8, minWidth: 200}}>
                <Ionicons name="card-outline" size={24} color={COLORS.light.surface} />
                <StyledText theme={'dark'}>На картах</StyledText>
                <StyledText fontSize={'2xl'} theme={'dark'} fontWeight={'700'}>₴80 000</StyledText>
            </Card>
            <Card backgroundColor={'income'} offset={'md'} style={{flex: 1, rowGap: 8, minWidth: 200}}>
                <Ionicons name="card-outline" size={24} color={COLORS.light.surface} />
                <StyledText theme={'dark'}>На картах</StyledText>
                <StyledText fontSize={'2xl'} theme={'dark'} fontWeight={'700'}>₴80 000</StyledText>
            </Card>
            <Card backgroundColor={'income'} offset={'md'} style={{flex: 1, rowGap: 8, minWidth: 200}}>
                <Ionicons name="card-outline" size={24} color={COLORS.light.surface} />
                <StyledText theme={'dark'}>На картах</StyledText>
                <StyledText fontSize={'2xl'} theme={'dark'} fontWeight={'700'}>₴80 000</StyledText>
            </Card>
            <Card backgroundColor={'income'} offset={'md'} style={{flex: 1, rowGap: 8, minWidth: 200}}>
                <Ionicons name="card-outline" size={24} color={COLORS.light.surface} />
                <StyledText theme={'dark'}>На картах</StyledText>
                <StyledText fontSize={'2xl'} theme={'dark'} fontWeight={'700'}>₴80 000</StyledText>
            </Card>
            <Card backgroundColor={'income'} offset={'md'} style={{flex: 1, rowGap: 8, minWidth: 200}}>
                <Ionicons name="card-outline" size={24} color={COLORS.light.surface} />
                <StyledText theme={'dark'}>На картах</StyledText>
                <StyledText fontSize={'2xl'} theme={'dark'} fontWeight={'700'}>₴80 000</StyledText>
            </Card>
        </ScrollView>
        <View style={{rowGap: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <StyledText fontSize={'xl'} fontWeight={'600'}>Последние операции</StyledText>
                <StyledTextButton activeOpacity={0.7}><StyledText style={{color: COLORS[theme].primary}}>Все</StyledText></StyledTextButton>
            </View>
            <Card offset={'md'}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
                        <Feather name="shopping-cart" size={24} color={COLORS[theme].text.primary} />
                        <View>
                            <StyledText fontSize={'xl'} fontWeight={'600'}>Продукты</StyledText>
                            <StyledText color={'secondary'}>25 ноя.</StyledText>
                        </View>
                    </View>
                    <StyledText fontSize={'xl'} fontWeight={'700'}>- 80 000 ₴</StyledText>
                </View>
            </Card>
            <Card offset={'md'}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
                        <Feather name="shopping-cart" size={24} color={COLORS[theme].text.primary} />
                        <View>
                            <StyledText fontSize={'xl'} fontWeight={'600'}>Продукты</StyledText>
                            <StyledText color={'secondary'}>25 ноя.</StyledText>
                        </View>
                    </View>
                    <StyledText fontSize={'xl'} fontWeight={'700'}>- 80 000 ₴</StyledText>
                </View>
            </Card>
            <Card offset={'md'}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
                        <Feather name="shopping-cart" size={24} color={COLORS[theme].text.primary} />
                        <View>
                            <StyledText fontSize={'xl'} fontWeight={'600'}>Продукты</StyledText>
                            <StyledText color={'secondary'}>25 ноя.</StyledText>
                        </View>
                    </View>
                    <StyledText fontSize={'xl'} fontWeight={'700'}>- 80 000 ₴</StyledText>
                </View>
            </Card>
            <Card offset={'md'}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
                        <Feather name="shopping-cart" size={24} color={COLORS[theme].text.primary} />
                        <View>
                            <StyledText fontSize={'xl'} fontWeight={'600'}>Продукты</StyledText>
                            <StyledText color={'secondary'}>25 ноя.</StyledText>
                        </View>
                    </View>
                    <StyledText fontSize={'xl'} fontWeight={'700'}>- 80 000 ₴</StyledText>
                </View>
            </Card>
            <Card offset={'md'}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
                        <Feather name="shopping-cart" size={24} color={COLORS[theme].text.primary} />
                        <View>
                            <StyledText fontSize={'xl'} fontWeight={'600'}>Продукты</StyledText>
                            <StyledText color={'secondary'}>25 ноя.</StyledText>
                        </View>
                    </View>
                    <StyledText fontSize={'xl'} fontWeight={'700'}>- 80 000 ₴</StyledText>
                </View>
            </Card>
        </View>
    </View>
}

const MainPage = () => {
    return <PageLayout
        headerRender={() => <Header />}
        bodyRender={() => <Body />}
        offsetTopBody={50}
    />
};

const style = StyleSheet.create({
    header: {
        flexDirection: 'row'
    }
})

export default MainPage;