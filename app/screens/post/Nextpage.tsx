import React from 'react';
import { View, Text, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { IMAGES, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { ScrollView } from 'react-native-gesture-handler';

const Nextpage = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

  return (
    <SafeAreaView style={{backgroundColor:colors.card,flex:1}}>
        <Header
            title="New Post"
            post={true}
        />
        <KeyboardAvoidingView
          style={{flex: 1}}
          //behavior={Platform.OS === 'ios' ? 'padding' : ''}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flex:1}}
          >
            <View style={[GlobalStyleSheet.container,{padding:0}]}>
                <View style={{ paddingVertical: 30, backgroundColor: 'rgba(71,90,119,.25)' }}>
                    <Image
                        style={{
                             height: SIZES.width < SIZES.container ? SIZES.width - (SIZES.width * (20 / 100)) : SIZES.container - (SIZES.container * (20 / 100)),
                            width: '100%',
                            resizeMode: 'contain'
                        }}
                        source={IMAGES.profilepic11}
                    />
                </View>
            </View>
            <View style={[GlobalStyleSheet.container,{marginTop:20}]}>
                <Text style={[GlobalStyleSheet.inputlable, { color: colors.title, opacity: .6 }]}>Write a caption...</Text>
                <View
                    style={[
                        GlobalStyleSheet.inputBox, {
                            borderColor: colors.border,
                            borderWidth: 1,
                            paddingLeft: 20,
                            height: 'auto'
                        },
                    ]}
                >
                    <TextInput
                        multiline
                        numberOfLines={5}
                        style={[GlobalStyleSheet.input, { color: colors.title, height: 'auto', paddingTop: 10, paddingRight: 10, paddingBottom:10,textAlignVertical: 'top' }]}
                        defaultValue={`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.\n.\n.\n.\n #Nature #Photography #Ballon`}
                    />
                </View>   
            </View>
          </ScrollView>

        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Nextpage