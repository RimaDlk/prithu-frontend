import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, IMAGES, SIZES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import Button from '../../components/button/Button';
import OTPTextInput from 'react-native-otp-textinput';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

type OtpScreenProps = StackScreenProps<RootStackParamList, 'Otp'>;

const Otp = ({ navigation } : OtpScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [show, setshow] = React.useState(true);

    const [inputFocus, setFocus] = React.useState({
        onFocus1: false,
        onFocus2: false
    })

    return (
        <SafeAreaView style={[GlobalStyleSheet.container,{padding:0, flex: 1 }]}>
            <KeyboardAvoidingView
            style={{flex: 1}}
            //behavior={Platform.OS === 'ios' ? 'padding' : ''}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ backgroundColor: COLORS.secondary, flex: 1 }}>
                        <View style={{ alignItems: 'center' }}>
                            <LinearGradient colors={['rgba(255, 255, 255, 0.00)', 'rgba(255, 255, 255, 0.08)']} style={GlobalStyleSheet.cricleGradient1}>
                            </LinearGradient>
                            <LinearGradient colors={['rgba(255, 255, 255, 0.00)', 'rgba(255, 255, 255, 0.08)']} style={GlobalStyleSheet.cricleGradient2}>
                            </LinearGradient>
                            <View
                                style={{
                                    paddingTop: 40,
                                    paddingBottom: 20
                                }}
                            >
                                <Image
                                    style={{ width: 80, height: 80 }}
                                    source={IMAGES.logo}
                                />
                            </View>
                            <Text style={GlobalStyleSheet.formtitle}>Enter Code</Text>
                            <Text style={GlobalStyleSheet.forndescription}>Please enter your credentials to access your account and detail</Text>
                        </View>
                        <View style={[GlobalStyleSheet.loginarea, { backgroundColor: colors.card }]}>
                            
                            <View style={{alignItems:'center',marginBottom:20}}>
                                <OTPTextInput 
                                    tintColor={colors.background}
                                    inputCount={4}
                                    textInputStyle={{
                                        borderBottomWidth:0,
                                        height:48,
                                        width:48,
                                        borderRadius:SIZES.radius,
                                        backgroundColor:colors.input,
                                        //color:colors.title,
                                    }}
                                    
                                />
                            </View> 

                            <View style={{ marginTop: 10 }}>
                                <Button title="Next"
                                    onPress={() => navigation.navigate('ChangePassword')}
                                />
                            </View>

                            <View style={{ flex: 1 }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                                <Text style={{ ...FONTS.font, color: colors.text }}>Already have an account
                                </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    <Text style={{ ...FONTS.font, color: COLORS.primary, textDecorationLine: 'underline', textDecorationColor: '#2979F8', marginLeft: 5 }}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Otp;