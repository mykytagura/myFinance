import React, {useEffect, useState} from 'react';
import StyledText from "@/src/shared/StyledText";
import {useDarkTheme} from "@/src/hooks/useDarkTheme";
import {StyleSheet, View} from "react-native";
import {COLORS, SPACING} from "@/src/constants/style";
import StyledInput from "@/src/shared/StyledInput";
import StyledPicker from "@/src/shared/StyledPicker";
import StyledRadioButtons from "@/src/shared/StyledRadioButtons";
import {StyledButton} from "@/src/shared/StyledButton";

const MakeTransactionPage = () => {
    const {theme} = useDarkTheme()
    const [selectedValue, setSelectedValue] = useState('');
    const [card, setCard] = useState('')
    const [transaction, setTransaction] = useState('')
    return (
        <View style={[style.modal, {backgroundColor: COLORS[theme].surface}]}>
            <StyledText fontWeight={'600'} fontSize={'xl'} style={style.heading}>Добавить операцию</StyledText>
            <StyledInput label={'Название'} placeholder={'Продукты'} />
            <StyledInput label={'Сумма (₴)'} placeholder={'0.00'} keyboardType={'numeric'} />
            <StyledRadioButtons
                label={'Тип транзакции'}
                fullWidth
                onChange={setTransaction}
                renderButton={({text, active, onPress}) => (
                    <StyledButton
                        colors={active
                            ? text === 'Доход' ? [COLORS[theme].income, COLORS[theme].income] : [COLORS[theme].expense, COLORS[theme].expense]
                            : [COLORS[theme].grey, COLORS[theme].grey]}
                        onPress={onPress}
                        style={{paddingVertical: SPACING.md}}
                    >
                        <StyledText theme={'dark'} fontSize={'lg'} fontWeight={'600'}>{text}</StyledText>
                    </StyledButton>
                )}
                data={[
                    {label: 'Доход', value: 'income'},
                    {label: 'Расход', value: 'expense'}
                ]}
            />
            <StyledPicker
                label="Категория"
                placeholder="Выберите категорию"
                value={selectedValue}
                options={[
                    { label: 'Еда', value: 'food' },
                    { label: 'Транспорт', value: 'transport' },
                    { label: 'Развлечения', value: 'fun' },
                ]}
                onChange={(value) => setSelectedValue(value.toString())}
            />
            <StyledPicker
                label="Карта"
                placeholder="Выберите карту"
                value={card}
                options={[
                    { label: 'MasterCard ***123', value: 'ms' },
                    { label: 'Visa ***124', value: 'visa' },
                    { label: 'Наличные', value: 'cash' },
                ]}
                onChange={(value) => setCard(value.toString())}
            />
        </View>
    );
};

const style = StyleSheet.create({
    modal: {
        flex: 1,
        rowGap: SPACING.lg,
        paddingVertical: SPACING.xl,
        paddingHorizontal: SPACING.md
    },
    heading: {
        alignSelf: 'center',
        paddingBottom: SPACING.md
    },
    select: {
        marginTop: SPACING.md * -1
    }
})

export default MakeTransactionPage;