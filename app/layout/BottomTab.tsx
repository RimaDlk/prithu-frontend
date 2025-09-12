import { useEffect, useRef, useState } from 'react';
import { Image, Platform, TouchableOpacity, View, Animated, Text, Dimensions } from 'react-native';
import { COLORS, SIZES, FONTS, IMAGES } from '../constants/theme';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { GlobalStyleSheet } from '../constants/styleSheet';

type Props = {
    state: any,
    navigation: any,
    descriptors: any
    postListRef: any;
}

const BottomTab = ({ state, descriptors, navigation, postListRef }: Props) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [tabWidth, setWidth] = useState(wp('100%'));
    const [profilePic, setProfilePic] = useState<string | null>(null);  //new here 
    const [activeAccountType, setActiveAccountType] = useState<string | null>(null);

    const lastTap = useRef<number>(0);


    // ✅ Fetch active account type
    useEffect(() => {
        const fetchAccountType = async () => {
            try {
                const storedType = await AsyncStorage.getItem('activeAccountType');
                if (storedType) {
                    setActiveAccountType(storedType);
                }
            } catch (error) {
                console.log('Error fetching account type:', error);
            }
        };
        fetchAccountType();
    }, []);

    const handleHomePress = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
            postListRef.current?.scrollToTop(); //  works now
        } else {
            navigation.navigate('Home');
        }

        lastTap.current = now;
    };

    // Filter tabs first based on account type
 const filteredRoutes = state.routes.filter(
  (route: any) => !(route.name === 'Reels' && activeAccountType !== 'Creator')
);
    
  // tab width should be divided by number of visible routes
const tabWD =
  tabWidth < SIZES.container ? tabWidth / filteredRoutes.length : SIZES.container / filteredRoutes.length;


    const circlePosition = useRef(
        new Animated.Value(0),
    ).current;

    Dimensions.addEventListener('change', val => {
        setWidth(val.window.width);
    });

    //  fetch profile image from backend like in Profile screen
    const fetchProfilePic = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (!userToken) {
                console.warn("No user token found in AsyncStorage");
                return;
            }

            const res = await fetch("http://192.168.1.14:5000/api/get/profile/detail", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`, // pass token here
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                console.error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
                return;
            }

            const data = await res.json();

            if (data?.profile) {
                const profileData = data.profile;
                const fixedAvatar = profileData.profileAvatar


                setProfilePic(fixedAvatar);

                // If you want the full details, store them in state too
                //   setProfileDetails(profileData); 
            }
        } catch (err) {
            console.error("Error fetching profile picture:", err);
        }
    };


    useEffect(() => {
        fetchProfilePic();
    }, []);


// Animate based on filtered index
useEffect(() => {
  Animated.spring(circlePosition, {
    toValue: state.index * tabWD,
    useNativeDriver: true,
  }).start();
}, [state.index, tabWidth, activeAccountType]);


    const onTabPress = (index: number) => {
        const tabW =
            tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5; // Adjust this according to your tab width

        Animated.spring(circlePosition, {
            toValue: index * tabW,
            useNativeDriver: true,
        }).start();
    };


    return (
        <View
            style={[{
                backgroundColor: colors.card,
                shadowColor: 'rgba(0, 0, 0, 0.60)',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: .1,
                shadowRadius: 5,
                //position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
            }, Platform.OS === 'ios' && {
                backgroundColor: colors.card,
            }]}
        >
            <View
                style={[{
                    height: 60,
                    backgroundColor: theme.dark ? colors.background : colors.card,
                    paddingTop: 5
                }, Platform.OS === 'web' && { paddingTop: 10 }]}>
                <View style={[GlobalStyleSheet.container, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                }]}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: [{ translateX: circlePosition }],
                        }}
                    >
                        <View
                            style={{
                                height: 40,
                                width: 40,
                                borderRadius: 38,
                                backgroundColor: COLORS.primary,
                                opacity: .15,
                                marginTop: 5,
                            }}
                        />
                    </Animated.View>
{filteredRoutes.map((route: any, index: any) => {
  const { options } = descriptors[route.key];
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

  // ✅ find correct focus state by comparing keys
  const isFocused = state.routes[state.index].key === route.key;

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (label === 'Home') {
                handleHomePress();
                return;
            }

            if (label === 'Reels') {
                navigation.navigate('createpost');
                return;
            }

            if (label === 'Chat') {
                navigation.navigate('Reels');
                return;
            }

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ name: route.name, merge: true });
                onTabPress(index);
            }
        };

        return (
            <TouchableOpacity
                key={index}
                activeOpacity={.8}
                onPress={onPress}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'center',
                    marginTop: 5,
                }}
            >
                {label === 'Profile' ? (
                    <Image
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: 50,
                            borderWidth: isFocused ? 2 : 0,
                            borderColor: isFocused ? COLORS.primary : 'transparent',
                        }}
                        source={
                            profilePic
                                ? { uri: profilePic }
                                : IMAGES.profile
                        }
                    />
                ) : (
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                            opacity: isFocused ? 1 : .4,
                            tintColor: isFocused ? COLORS.primary : colors.text,
                        }}
                        source={
                            label == 'Home'
                                ? IMAGES.home
                                : label == 'Search'
                                ? IMAGES.search
                                : label == 'Reels'
                                ? IMAGES.plus
                                : label == 'Chat'
                                ? IMAGES.reels
                                : null
                        }
                    />
                )}
            </TouchableOpacity>
        );
    })}

                </View>
            </View>
        </View>
    );
};


export default BottomTab;