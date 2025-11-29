import React, {ReactNode} from 'react';
import {ScrollView, View, StyleSheet} from "react-native";
import StyledSafeAreaView from "@/src/shared/StyledSafeAreaView";
import {useDarkTheme} from "@/src/hooks/useDarkTheme";
import {COLORS, SPACING} from "@/src/constants/style";

interface PageLayoutProps {
    headerRender?: () => ReactNode
    bodyRender: () => ReactNode
    offsetTopBody?: number
    footerRender?: () => ReactNode
}

const PageLayout = ({headerRender, bodyRender, offsetTopBody = 40, footerRender, ...props}: PageLayoutProps) => {
    const {theme} = useDarkTheme()

    return (
        <StyledSafeAreaView>
            <ScrollView
                bounces={false}
                alwaysBounceVertical={false}
                alwaysBounceHorizontal={false}
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
            >
                <View style={[style.header, {marginBottom: offsetTopBody * 2}]}>
                    {headerRender && headerRender()}
                </View>
                <View style={{backgroundColor: COLORS[theme].background}}>
                    <View style={[style.body, {marginTop: offsetTopBody * -1}]}>
                        {bodyRender()}
                    </View>
                </View>
                {footerRender &&
                    <View style={[style.footer, {backgroundColor: COLORS[theme].background}]}>{footerRender()}</View>
                }
            </ScrollView>
        </StyledSafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {paddingTop: SPACING.xl, paddingHorizontal: SPACING.sm},
    body: {paddingHorizontal: SPACING.sm},
    footer: {paddingHorizontal: SPACING.sm}
})

export default PageLayout;