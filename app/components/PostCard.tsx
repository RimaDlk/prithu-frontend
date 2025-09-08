import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, IMAGES, SIZES } from '../constants/theme';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import LikeBtn from './likebtn/LikeBtn';
import { GlobalStyleSheet } from '../constants/styleSheet';
import { useTheme } from '@react-navigation/native';
import { Video } from 'expo-av';
import { Share } from "react-native"
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import BottomSheetComments from './bottomsheet/BottomSheetComments';
import { useRef } from 'react';
import CommentSheet from '../screens/comment/CommentSheet';



const PostCard = ({ id, name, profileimage, date, postimage, like, comment, posttitle, posttag, sheetRef, optionSheet, hasStory, reelsvideo, caption, background, visibleBoxes }: any) => {

    const navigation = useNavigation<any>();

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [isShow, setIsShow] = useState(false);

    const [show, setshow] = React.useState(true);

    const [mute, setmute] = React.useState(false);

    const video = React.useRef(null);

    const commentSheetRef = useRef(null);

    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: colors.border, marginHorizontal: -15 }}>
            <View style={[GlobalStyleSheet.flexalingjust, { paddingVertical: 10, paddingHorizontal: 15, paddingRight: 5 }]}>
                <View style={GlobalStyleSheet.flexaling}>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                hasStory == false ?
                                    navigation.navigate('AnotherProfile')
                                    :
                                    navigation.navigate('status', {
                                        name: name,
                                        image: profileimage,
                                        statusData: [IMAGES.profilepic11, IMAGES.profilepic12]
                                    })
                            }}
                        >
                            {
                                hasStory == true ?
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            style={{ width: 40, height: 40, borderRadius: 50 }}
                                            source={
                                                profileimage
                                                    ? { uri: profileimage }
                                                    : { uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }
                                            }
                                        />

                                        <Image
                                            style={{ width: 48, height: 48, position: 'absolute', resizeMode: 'contain' }}
                                            source={IMAGES.cricle}
                                        />
                                    </View>
                                    :
                                    <View>
                                        <Image
                                            style={{ width: 40, height: 40, borderRadius: 50 }}
                                            source={
                                                profileimage
                                                    ? { uri: profileimage }
                                                    : { uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }
                                            }
                                        />

                                    </View>
                            }

                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AnotherProfile')}
                        >
                            <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: colors.title }}>{name}</Text>
                        </TouchableOpacity>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 11, color: colors.text }}>{date}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {/* <TouchableOpacity
                        onPress={() => sheetRef.current.openSheet()}
                    >
                        <Image
                            style={{
                                width: 18,
                                height: 18,
                                margin: 10,
                                tintColor: colors.title,
                            }}
                            source={IMAGES.share}
                        />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => optionSheet.current.openSheet()}
                    >
                        <Image
                            style={{ width: 18, height: 18, margin: 10, tintColor: colors.title, }}
                            source={IMAGES.more}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {reelsvideo ?
                <TouchableOpacity
                    style={{
                        height: SIZES.width < SIZES.container ? SIZES.width - (SIZES.width * (0 / 100)) : SIZES.container - (SIZES.container * (0 / 100)),
                    }}

                    onPress={() => navigation.navigate('Reels')}
                >
                    {/* <Video
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%', }}
                        source={reelsvideo}
                        muted={mute}
                        repeat={true}
                        paused={visibleBoxes.includes(id) ? false : true }
                        
                    /> */}
                    <Video
                        ref={video}
                        source={reelsvideo}
                        useNativeControls={false}
                        resizeMode={'cover'}
                        isLooping
                        style={{
                            width: '100%',
                            height: '100%',
                            // position: 'absolute',
                        }}
                    />
                    <TouchableOpacity style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', bottom: 5, right: 5 }}
                        onPress={() => {
                            setmute(!mute)
                        }}
                    >
                        <View style={{
                            backgroundColor: 'rgba(0,0,0,.6)',
                            width: 30,
                            height: 30,
                            borderRadius: 50
                        }}></View>
                        <Image
                            style={[GlobalStyleSheet.image, { position: 'absolute', tintColor: COLORS.white }]}
                            source={mute ?
                                IMAGES.volumemute
                                :
                                IMAGES.volume
                            }
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
                : caption ?
                    <View
                        style={{
                            height: SIZES.width < SIZES.container ? SIZES.width - (SIZES.width * (20 / 100)) : SIZES.container - (SIZES.container * (20 / 100)),
                            backgroundColor: background,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <View>
                            <Text style={[GlobalStyleSheet.textfont, { ...FONTS.h4, color: COLORS.white }]}>{caption}</Text>
                        </View>

                    </View>
                    :
                    <View
                        style={{
                            height: SIZES.width < SIZES.container ? SIZES.width - (SIZES.width * (4 / 100)) : SIZES.container - (SIZES.container * (10 / 100)),
                        }}
                    >
                        <Swiper
                            height={'auto'}
                            showsButtons={false}
                            loop={false}
                            paginationStyle={{
                                bottom: 10,
                            }}
                            dotStyle={{
                                width: 5,
                                height: 5,
                                backgroundColor: 'rgba(255, 255, 255, 0.40)'
                            }}
                            activeDotStyle={{
                                width: 6,
                                height: 6,
                                backgroundColor: '#fff'
                            }}
                        >
                            {postimage.map((data: any, index: any) => {
                                return (
                                    <Image
                                        key={index}
                                        style={{ width: '100%', height: '100%' }}
                                        source={{ uri: data.image }}   // ✅ correct
                                        resizeMode="contain"
                                    />

                                )
                            })}
                        </Swiper>
                    </View>
            }
            <View style={{ paddingHorizontal: 20, paddingBottom: 20, paddingRight: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[GlobalStyleSheet.flexaling, { gap: 22 }]}>
                        <View style={GlobalStyleSheet.flexaling}>
                            <TouchableOpacity>
                                <LikeBtn
                                    color={colors.title}
                                    sizes={'sm'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('like')}
                            >
                                {/* <Text style={[GlobalStyleSheet.postlike, { color: colors.title }]}>{like}</Text> */}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                           onPress={() => commentSheetRef.current?.openSheet()} >
                              {/* <TouchableOpacity onPress={() => commentSheetRef.current?.openSheet()}></TouchableOpacity> */}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 22, height: 22, resizeMode: 'contain', tintColor: colors.title }}
                                    source={IMAGES.comment}
                                />
                                {/* <BottomSheetComments ref={commentSheetRef} /> */}

                                {/* <Text style={[GlobalStyleSheet.postlike, { color: colors.title }]}>{comment}</Text> */}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={async () => {
                                try {
                                    if (postimage && postimage.length > 0) {
                                        const imageUrl = postimage[0].image; // first image of post
                                        const fileUri = FileSystem.cacheDirectory + "sharedImage.jpg";

                                        // Download image to local cache
                                        const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

                                        // Share only if available
                                        if (await Sharing.isAvailableAsync()) {
                                            await Sharing.shareAsync(uri, {
                                                mimeType: "image/jpeg",
                                                dialogTitle: `Share ${name}'s post`,
                                                UTI: "public.jpeg", // for iOS
                                            });
                                        } else {
                                            alert("Sharing is not available on this device");
                                        }
                                    } else {
                                        alert("No image to share");
                                    }
                                } catch (error) {
                                    console.log("Error sharing image:", error);
                                }
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: colors.title }}
                                    source={IMAGES.share}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={async () => {
                                try {
                                    if (postimage && postimage.length > 0) {
                                        const imageUrl = postimage[0].image; // first image of post
                                        const fileUri = FileSystem.cacheDirectory + "downloadedImage.jpg";

                                        // Download image to local cache
                                        const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

                                        // Request permission
                                        const { status } = await MediaLibrary.requestPermissionsAsync();
                                        if (status === 'granted') {
                                            const asset = await MediaLibrary.createAssetAsync(uri);
                                            await MediaLibrary.createAlbumAsync("MyApp", asset, false); // optional: create album
                                            alert("Image saved to gallery!");
                                        } else {
                                            alert("Permission denied to save image.");
                                        }
                                    } else {
                                        alert("No image to download");
                                    }
                                } catch (error) {
                                    console.log("Error downloading image:", error);
                                }
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 28, height: 28, resizeMode: 'contain', tintColor: colors.title }}
                                    source={IMAGES.download} // add your download icon in IMAGES
                                />
                            </View>
                        </TouchableOpacity>



                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setshow(!show)
                            }}
                        >
                            <Image
                                style={{ width: 18, height: 18, resizeMode: 'contain', margin: 15, tintColor: show ? colors.title : colors.primary }}
                                source={
                                    show
                                        ?
                                        IMAGES.save
                                        :
                                        IMAGES.save2
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={{ marginTop: 5 }}>
                    <View style={{ paddingRight: 35 }}>
                        <Text numberOfLines={isShow ? 0 : 2} style={{ ...FONTS.fontRegular, color: colors.title, fontSize: 13 }}>{posttitle}</Text>
                        {isShow === false &&
                            <TouchableOpacity
                                onPress={() => setIsShow(true)}
                                style={{ position: 'absolute', bottom: -4, right: 0 }}
                            >
                                <Text style={{ ...FONTS.fontRegular, color: theme.dark ? 'rgba(255,255,255,0.5)' : 'rgba(71, 90, 119, 0.50)', fontSize: 13 }}>more</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <Text style={{ ...FONTS.fontRegular, color: theme.dark ? 'rgba(255,255,255,0.4)' : '#475A77', fontSize: 13 }}>{posttag}</Text>
                </View> */}
               
            </View>
             <CommentSheet ref={commentSheetRef} /> 
        </View>
    )
}

export default PostCard