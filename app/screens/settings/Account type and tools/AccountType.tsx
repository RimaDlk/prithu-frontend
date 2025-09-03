import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '../../../layout/Header';
import { GlobalStyleSheet } from '../../../constants/styleSheet';
import { useTheme } from '@react-navigation/native';


const AccountType = ({ navigation }: any) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const options = [
        { id: '1', text: 'Personal Account' },
        { id: '2', text: 'Creator Account' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <Header title="Account Type" />
            <View style={[GlobalStyleSheet.container, { marginTop: 10 }]}>
                {options.map((opt) => (
                    <TouchableOpacity
                        key={opt.id}
                        style={{
                            height: 50,
                            justifyContent: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                        }}
                        onPress={() => {
                            if (opt.text === 'Creator Account') {
                                navigation.navigate('CreatorAccount');
                            } else if (opt.text === 'Personal Account') {
                                navigation.navigate('PersonalAccount'); // 👈 navigate to your new screen
                            } else {
                                alert(`Selected: ${opt.text}`);
                            }
                        }}
                    >
                        <Text style={{ fontSize: 16, color: colors.title }}>
                            {opt.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default AccountType;
