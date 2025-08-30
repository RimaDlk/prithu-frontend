import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Animated, Dimensions, Share, Alert, SafeAreaView } from 'react-native';
import { COLORS, FONTS, IMAGES, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { LinearGradient } from 'expo-linear-gradient';
import Followbtn from '../../components/button/Followbtn';
import Sharebtn from '../../components/button/Sharebtn';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import ProfilePostData from './ProfilePostData';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';




const data = [
  {
    id: '1',
    image: IMAGES.profilepic2,
    like:'164',
  },
  {
    id: '2',
    image: IMAGES.profilepic15,
    like: '132',
  },
  {
    id: '3',
    image: IMAGES.profilepic16,
    like: '30',
  },
  {
    id: '4',
    image: IMAGES.profilepic17,
    like: '154',
  },
  {
    id: '5',
    image: IMAGES.profilepic18,
    like: '100',
  },
  {
    id: '6',
    image: IMAGES.profilepic4,
    like: '1K',
  },
  {
    id: '7',
    image: IMAGES.profilepic10,
    like: '164',
  },
  {
    id: '8',
    image: IMAGES.profilepic11,
    like: '132',
  },
  {
    id: '9',
    image: IMAGES.profilepic12,
    like: '30',
  },
  {
    id: '10',
    image: IMAGES.profilepic13,
    like: '154',
  },
  {
    id: '11',
    image: IMAGES.profilepic14,
    like: '100',
  },
  {
    id: '12',
    image: IMAGES.profilepic1,
    like: '1K',
  }
]

const ReelsData = [
  {
    id: '1',
    image: IMAGES.profilepic19,
    like: '164k',
  },
  {
    id: '2',
    image: IMAGES.profilepic20,
    like: '12k',
  },
  {
    id: '3',
    image: IMAGES.profilepic21,
    like: '160k',
  },
  {
    id: '4',
    image: IMAGES.profilepic22,
    like: '134k',
  },
  {
    id: '5',
    image: IMAGES.profilepic5,
    like: '13k',
  },
  {
    id: '6',
    image: IMAGES.profilepic6,
    like: '4k',
  },
]

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({ navigation } : ProfileScreenProps) => {

  const [profile, setProfile] = useState<any>({
    displayName: '',
    username: '',
    bio: '',
    balance: '',
    profileAvatar: '',
  });

   const fetchProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      const res = await fetch(`http://192.168.1.77:5000/api/get/profile/detail/${userId}`);
      const data = await res.json();

      if (res.ok && data.profileSetting) {
        const profileData = data.profileSetting;

        // Fix image path
        const fixedAvatar = profileData.profileAvatar
          ? `http://192.168.1.77:5000/${profileData.profileAvatar.replace(/\\/g, '/')}`
          : '';

        setProfile({
          displayName: profileData.displayName || '',
          username: data.userName || '',
          bio: profileData.bio || '',
          balance: profileData.balance || '',
          profileAvatar: fixedAvatar,
        });
      } else {
        console.log('Error fetching profile:', data.message);
      }
    } catch (err) {
      console.error('Fetch profile error:', err);
      Alert.alert('Error fetching profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);



  const scrollRef = useRef<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const slideIndicator = scrollX.interpolate({
    inputRange: [0, SIZES.width],
    outputRange: [0, (SIZES.width - 30)/ 2],
    extrapolate: 'clamp',
  });

  const onPressTouch = (val:any) => {
    setCurrentIndex(val)
    scrollRef.current?.scrollTo({
      x: SIZES.width * val,
      animated: true,
    });
  }

  const theme = useTheme();
  const { colors } : {colors : any} = theme;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Share your profile link here.',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error :any) {
      Alert.alert(error.message);
    }
  };


  return (
    <SafeAreaView style={[GlobalStyleSheet.container,{padding:0, backgroundColor: theme.dark ? colors.background : colors.card, flex: 1 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
            style={{width:'100%',height:300,borderBottomLeftRadius:25,borderBottomRightRadius:25,overflow:'hidden'}}
            source={IMAGES.profilebackground}
          >
            <View style={GlobalStyleSheet.container}>
              <View style={[GlobalStyleSheet.flexalingjust,{marginTop:10}]}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                >
                  <Image
                    style={{ width: 18, height: 18, tintColor: '#fff' }}
                    source={IMAGES.arrowleft}
                  />
                </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}
              >
                  <View style={GlobalStyleSheet.background}>
                    <Image
                      style={[GlobalStyleSheet.image,{tintColor: COLORS.white }]}
                      source={IMAGES.setting}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View>
                <TouchableOpacity>
                  <View style={{ backgroundColor:'rgba(217, 217, 217, .6)',height:110,width:110,borderRadius:100,alignItems:'center',justifyContent:'center'}}>
                    <Image
                        style={{width:100,height:100,borderRadius:100}}
                        source={profile.profileAvatar ? { uri: profile.profileAvatar } : IMAGES.profile}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> navigation.navigate('EditProfile')}
                  style={{position:'absolute',bottom:0,right:0}}
                >
                  <View style={{ backgroundColor: '#001F50', width: 36, height: 36, borderRadius: 50, alignItems:'center',justifyContent:'center' }}>
                    <View style={{ backgroundColor: '#2979F8', width: 30, height: 30, borderRadius: 50, alignItems:'center',justifyContent:'center'}}>
                      <Image
                        style={{width:18,height:18,resizeMode:'contain'}}
                        source={IMAGES.write2}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{marginTop:20,alignItems:'center'}}>
                <Text style={{ ...FONTS.h6, ...FONTS.fontMedium, color: COLORS.white }}>{profile.displayName}</Text>
                <Text style={{ ...FONTS.font, ...FONTS.fontRegular, color: COLORS.white,opacity:.6,marginTop:5 }}>{profile.username}</Text>
              </View>
            {/* <View style={{ backgroundColor: 'rgba(255, 255, 255, .1)', height: 70, width: 300, borderRadius: 12, marginTop: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
              
                <View style={{ alignItems: 'center', width: '33.33%' }}>
                  <Text style={GlobalStyleSheet.textfont2}>54</Text>
                  <Text style={GlobalStyleSheet.titlefont}>Post</Text>
                </View>
                <View style={{ width: '33.33%' }}>
                <TouchableOpacity style={{ alignItems: 'center' }}
                  onPress={() => navigation.navigate('Followers')}
                >
                      <Text style={GlobalStyleSheet.textfont2}>1250</Text>
                      <Text style={GlobalStyleSheet.titlefont}>Followers</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '33.33%' }}>
                <TouchableOpacity style={{ alignItems: 'center', }}
                  onPress={() => navigation.navigate('Followers')}
                >
                    <Text style={GlobalStyleSheet.textfont2}>500</Text>
                    <Text style={GlobalStyleSheet.titlefont}>Following</Text>
                  </TouchableOpacity>
                </View>
              
                <LinearGradient colors={['rgba(255, 255, 255, 0.00) ', 'rgba(255, 255, 255, 0.20)', 'rgba(255, 255, 255, 0.00) ']}
                  style={{width:2,height:50,position:'absolute',right:100}}
                ></LinearGradient>
                <LinearGradient colors={['rgba(255, 255, 255, 0.00) ', 'rgba(255, 255, 255, 0.20)', 'rgba(255, 255, 255, 0.00) ']}
                  style={{ width: 2, height: 50, position: 'absolute', left: 100 }}
                ></LinearGradient>
              </View> */}
            </View>
        </ImageBackground>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10,marginTop:20}}>
          <Followbtn
            onPress={() => navigation.navigate('Suggestions')}
            title='Referrals'
          />
          <Sharebtn
            onPress={onShare}
            title='Share Profile'
          />
        </View>
        <View style={{marginHorizontal:15}}>
          <View 
            style={[
              GlobalStyleSheet.container, 
              { 
                backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : '#EFF3FA',
                padding:10,
                marginHorizontal:20,
                borderRadius:6,
                marginTop:20
              }
            ]}
          >
            <Text style={{...FONTS.fontXs,lineHeight:18,color:colors.title}}>{profile.bio}</Text>
          </View>
        </View>
        <View style={GlobalStyleSheet.container}>
          <View style={{flexDirection:'row',marginTop:10,marginBottom:0,}}>
            <TouchableOpacity
              onPress={() => onPressTouch(0)}
              style={GlobalStyleSheet.TouchableOpacity2}>
              <Image
                style={[{ width: 16, height: 16, tintColor: '#475A77' },currentIndex == 0 && {tintColor:COLORS.primary}]}
                source={IMAGES.profilepic}
              />
              <Text style={[{ ...FONTS.fontMedium, fontSize: 14, color:'#475A77', marginLeft: 5 },currentIndex == 0 && { color: COLORS.primary }]}>Save Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressTouch(1)}
              style={GlobalStyleSheet.TouchableOpacity2}>
              <Image
                style={[{ width: 16, height: 16, tintColor: '#475A77' }, currentIndex == 1 && { tintColor: COLORS.primary }]}
                source={IMAGES.reels}
              />
              <Text style={[{ ...FONTS.fontMedium, fontSize: 14, color: '#475A77', marginLeft: 5 }, currentIndex == 1 && { color: COLORS.primary }]}>Save Reels</Text>
            </TouchableOpacity>
            <Animated.View
              style={{
                backgroundColor: COLORS.primary,
                width: '50%',
                height: 2,
                position: 'absolute',
                bottom: 0,
                left: 0,
                transform: [{ translateX: slideIndicator }]
              }}>
            </Animated.View>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          ref={scrollRef}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(e:any) => {
            if (e.nativeEvent.contentOffset.x.toFixed(0) == SIZES.width.toFixed(0)) {
              setCurrentIndex(1)
            } else if (e.nativeEvent.contentOffset.x.toFixed(0) == 0) {
              setCurrentIndex(0)
            } else {
              setCurrentIndex(0)
            }
          }}
        >
          <View style={[GlobalStyleSheet.container,{marginTop: 5, width: SIZES.width,padding:0}]}>
            <ProfilePostData navigation={navigation} ProfilepicData={data} />
          </View>
          <View style={[GlobalStyleSheet.container,{marginTop: 5, width: SIZES.width,padding:0}]}>
            <View style={{flexDirection: 'row',flexWrap:'wrap' }}>
              {ReelsData.map((data,index) => {
                return (
                  <View key={index} style={{ width: '33.33%', padding: 2 }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ProfileReels')}
                    >
                        <Image
                          style={{width:'100%',height:null, aspectRatio:1/1.8, }}
                          source={data.image}
                      />
                      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.20)', position: 'absolute', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 3, top: 10, right: 10 }}>
                        <Image
                          style={{ width: 12, height: 12, resizeMode: 'contain', tintColor: '#fff' }}
                          source={IMAGES.eyeopen}
                        />
                        <Text style={{ ...FONTS.fontRegular, fontSize: 10, color: COLORS.white, lineHeight: 14 }}>{data.like}</Text>
                      </View>
                      </TouchableOpacity>
                  </View>
                )
              })}
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile;