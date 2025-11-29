import {useColorScheme} from "react-native";

export const useDarkTheme = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark'
    const theme: 'light' | 'dark' = isDark ? 'dark' : 'light'
    return {isDark, theme}
}