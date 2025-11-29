import React from 'react';
import {router, Tabs} from "expo-router";
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import {COLORS} from "@/src/constants/style";
import {ButtonWithShadow} from "@/src/shared/Button";
import {useDarkTheme} from "@/src/hooks/useDarkTheme";

const _layout = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {isDark, theme} = useDarkTheme()
    const backgroundColor = isDark ? COLORS.dark.background : COLORS.light.background;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS[theme].primary,
                tabBarStyle: {
                    backgroundColor,
                    borderTopColor: isDark ? COLORS.dark.border : COLORS.light.border,
                },
            }}
        >
            <Tabs.Screen name={'index'} options={{ title: "Главная", tabBarIcon: ({color}) => <AntDesign name="home" size={24} color={color} /> }}/>
            <Tabs.Screen name={'statistics'} options={{ title: "Статистика", tabBarIcon: ({color}) => <Ionicons name="stats-chart" size={24} color={color} /> }}/>
            <Tabs.Screen name={'makeTransaction'} options={{
                title: 'Создать запись',
                tabBarButton: () =>
                    <ButtonWithShadow
                        activeOpacity={1}
                        onPress={() => { router.push('/makeTransaction') }}
                        style={{width: 60, height: 60, alignSelf: 'center', marginTop: -10}}
                    >
                        <AntDesign name="plus" size={24} color={COLORS.light.surface} />
                    </ButtonWithShadow>
            }}
            />
            <Tabs.Screen name={'wallet'} options={{ title: "Кошелек", tabBarIcon: ({color}) => <Ionicons name="wallet-outline" size={24} color={color} />}}/>
            <Tabs.Screen name={'profile'} options={{ title: "Профиль", tabBarIcon: ({color}) => <Feather name="settings" size={24} color={color} />}}/>
        </Tabs>
    );
};

export default _layout;