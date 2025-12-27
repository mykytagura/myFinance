import React, { useRef, useState } from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    FlatList,
    Modal,
    LayoutRectangle,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import StyledText from '@/src/shared/StyledText';
import { BORDER_RADIUS, COLORS, SPACING } from '@/src/constants/style';
import { useDarkTheme } from '@/src/hooks/useDarkTheme';

export interface DropdownOption {
    label: string;
    value: string | number;
}

interface Props {
    label?: string;
    value?: string | number;
    options: DropdownOption[];
    placeholder?: string;
    onChange: (value: string | number) => void;
}

const StyledDropdown = ({
    label,
    value,
    options,
    placeholder = 'Выбрать',
    onChange,
}: Props) => {
    const { theme } = useDarkTheme();
    const ref = useRef<View>(null);
    const [open, setOpen] = useState(false);
    const [layout, setLayout] = useState<LayoutRectangle | null>(null);

    const selected = options.find(o => o.value === value);

    const openDropdown = () => {
        ref.current?.measureInWindow((x, y, width, height) => {
            setLayout({ x, y, width, height });
            setOpen(true);
        });
    };

    return (
        <>
            <View style={styles.wrapper}>
                {label && <StyledText>{label}</StyledText>}

                <Pressable
                    ref={ref}
                    style={[
                        styles.input,
                        {
                            backgroundColor: COLORS[theme].surfaceLight,
                            borderColor: COLORS[theme].border_alt,
                        },
                    ]}
                    onPress={openDropdown}
                >
                    <StyledText
                        fontSize="xl"
                        style={{
                            color: selected
                                ? COLORS[theme].text.primary
                                : COLORS[theme].text.tertiary,
                        }}
                    >
                        {selected?.label ?? placeholder}
                    </StyledText>

                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={24}
                        color={COLORS[theme].text.primary}
                    />
                </Pressable>
            </View>

            {/* MODAL */}
            <Modal transparent visible={open}>
                <Pressable style={styles.overlay} onPress={() => setOpen(false)} />

                {layout && (
                    <View
                        style={[
                            styles.dropdown,
                            {
                                top: layout.y + layout.height * 2.3,
                                left: layout.x,
                                width: layout.width,
                                backgroundColor: COLORS[theme].surfaceLight,
                                borderColor: COLORS[theme].border_alt,
                            },
                        ]}
                    >
                        <FlatList
                            data={options}
                            keyExtractor={i => i.value.toString()}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    style={[
                                        styles.item,
                                        {
                                            borderTopWidth: index === 0 ? 0 : 1,
                                            borderColor: COLORS[theme].border_alt,
                                        },
                                    ]}
                                    onPress={() => {
                                        onChange(item.value);
                                        setOpen(false);
                                    }}
                                >
                                    <StyledText fontSize="xl">{item.label}</StyledText>
                                </Pressable>
                            )}
                        />
                    </View>
                )}
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        rowGap: SPACING.sm,
    },
    input: {
        borderWidth: 1,
        borderRadius: BORDER_RADIUS.md,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    dropdown: {
        position: 'absolute',
        borderWidth: 1,
        borderRadius: BORDER_RADIUS.md,
        overflow: 'hidden',
        elevation: 10,
    },
    item: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
    },
});

export default StyledDropdown;
