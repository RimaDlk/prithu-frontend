// import React, { useEffect, useState } from "react";
// import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRoute, useNavigation } from "@react-navigation/native";

// const AnotherProfile = () => {
//   const route = useRoute<any>();
//   const navigation = useNavigation<any>();
//   const { feedId } = route.params || {}; // 👈 get feedId from PostCard

//     console.log("Route params:", route.params);
//     console.log("feedId received:", feedId); 

//   const [profile, setProfile] = useState<any>(null);
//   const [posts, setPosts] = useState<any[]>([]);

// useEffect(() => {
//   const fetchCreatorProfile = async () => {
//     if (!feedId) return;

//     try {
//       const token = await AsyncStorage.getItem("userToken");

//       const res = await fetch(
//         `http://192.168.1.14:5000/api/get/creator/detail/feed/${feedId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();
//       setProfile(data); // save profile data
//     } catch (err) {
//       console.log("Error fetching creator profile:", err);
//     }
//   };

//   fetchCreatorProfile();
// }, [feedId]);

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       {profile && (
//         <View style={{ alignItems: "center" }}>
//           <Image
//             source={{
//               uri:
//                 profile.avatar ||
//                 "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
//             }}
//             style={{ width: 80, height: 80, borderRadius: 40 }}
//           />
//           <Text style={{ fontSize: 18, fontWeight: "600" }}>
//             <Text>{profile?.name}</Text>
//           </Text>
//         </View>
//       )}

//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item._id}
//         numColumns={3}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={{ flex: 1 / 3, aspectRatio: 1, margin: 2 }}
//             onPress={() => navigation.navigate("ProfilePost", { postId: item._id })}
//           >
//             <Image
//               source={{ uri: `http://192.168.1.14:5000/${item.imagePath}` }}
//               style={{ width: "100%", height: "100%" }}
//             />
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// export default AnotherProfile;

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Share,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, IMAGES, SIZES } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import { LinearGradient } from "expo-linear-gradient";
import Followbtn from "../../components/button/Followbtn";
import Sharebtn from "../../components/button/Sharebtn";
import { useTheme, useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AnotherProfile = () => {
  const scrollRef = useRef<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [reels, setReels] = useState<any[]>([]);

  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { feedId } = route.params || {};

  // Fetch backend profile + posts
useEffect(() => {
  const fetchCreatorProfile = async () => {
    if (!feedId) return;
    try {
      const res = await fetch(
        `http://192.168.1.14:5000/api/get/creator/detail/feed/${feedId}`
      );
      const result = await res.json();

      if (res.ok) {
        setProfile(result.data.profile);   // ✅ correct
        // setPosts(result.data.posts || []); // only if backend adds
        // setReels(result.data.reels || []);
      } else {
        console.log("API error:", result.message);
      }
    } catch (err) {
      console.log("Error fetching creator profile:", err);
    }
  };
  fetchCreatorProfile();
}, [feedId]);


  const slideIndicator = scrollX.interpolate({
    inputRange: [0, SIZES.width],
    outputRange: [0, (SIZES.width - 30) / 2],
    extrapolate: "clamp",
  });

  const onPressTouch = (val: any) => {
    setCurrentIndex(val);
    scrollRef.current?.scrollTo({
      x: SIZES.width * val,
      animated: true,
    });
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: "Share your profile link here.",
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const [show, setShow] = useState(true);


 return (
  <SafeAreaView
    style={[
      GlobalStyleSheet.container,
      {
        padding: 0,
        backgroundColor: theme.dark ? colors.background : colors.card,
        flex: 1,
      },
    ]}
  >
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* 🔹 Background + Profile Info */}
      <ImageBackground
        style={{
          width: "100%",
          height: 360,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          overflow: "hidden",
        }}
        source={IMAGES.profilebackground}
      >
        <View style={GlobalStyleSheet.container}>
          <View style={[GlobalStyleSheet.flexalingjust, { marginTop: 10 }]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{ width: 18, height: 18, tintColor: "#fff" }}
                source={IMAGES.arrowleft}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
              <View style={GlobalStyleSheet.background}>
                <Image
                  style={[GlobalStyleSheet.image, { tintColor: COLORS.white }]}
                  source={IMAGES.share}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Picture */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "rgba(217, 217, 217, .6)",
                height: 110,
                width: 110,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ width: 100, height: 100, borderRadius: 100 }}
                source={{
                  uri:
                    profile?.profileAvatar ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                }}
              />
            </View>
          </TouchableOpacity>

          {/* Name + Username */}
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text
              style={{ ...FONTS.h6, ...FONTS.fontMedium, color: COLORS.white }}
            >
              {profile?.displayName || "User Name"}
            </Text>
            <Text
              style={{
                ...FONTS.font,
                ...FONTS.fontRegular,
                color: COLORS.white,
                opacity: 0.6,
                marginTop: 5,
              }}
            >
              @{profile?.userName || "username"}
            </Text>

          </View>
        </View>
      </ImageBackground>
{/* 
{profile.bio ? (
  <View style={{ marginTop: 15, marginHorizontal: 20 }}>
    <Text
      style={{
        ...FONTS.font,
        fontSize: 14,
        lineHeight: 20,
        color: colors.title,
        textAlign: "center",
      }}
    >
      {profile.bio}
    </Text>
  </View>
) : null} */}
 

      {/* 🔹 Buttons */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginTop: 20,
        }}
      >
        {show ? (
          <Followbtn title="Follow" onPress={() => setShow(!show)} />
        ) : (
          <Sharebtn title="Following" onPress={() => setShow(!show)} />
        )}
        <Sharebtn
          onPress={() => navigation.navigate("SingleChat")}
          title="Message"
        />
      </View>

      {/* 🔹 Tabs: Posts / Reels */}
      <View style={GlobalStyleSheet.container}>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => onPressTouch(0)}
            style={GlobalStyleSheet.TouchableOpacity2}
          >
            <Text
              style={[
                { ...FONTS.fontMedium, fontSize: 14, color: "#475A77" },
                currentIndex == 0 && { color: COLORS.primary },
              ]}
            >
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressTouch(1)}
            style={GlobalStyleSheet.TouchableOpacity2}
          >
            <Text
              style={[
                { ...FONTS.fontMedium, fontSize: 14, color: "#475A77" },
                currentIndex == 1 && { color: COLORS.primary },
              ]}
            >
              Reels
            </Text>
          </TouchableOpacity>
          <Animated.View
            style={{
              backgroundColor: COLORS.primary,
              width: "50%",
              height: 2,
              position: "absolute",
              bottom: 0,
              left: 0,
              transform: [{ translateX: slideIndicator }],
            }}
          />
        </View>
      </View>

      {/* 🔹 Posts & Reels Content */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={scrollRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(e: any) => {
          const page = e.nativeEvent.contentOffset.x / SIZES.width;
          setCurrentIndex(page);
        }}
      >
        {/* Posts Grid */}
        <View
          style={[
            GlobalStyleSheet.container,
            { marginTop: 5, width: SIZES.width, padding: 0 },
          ]}
        >
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {posts.map((item, index) => (
              <View key={index} style={{ width: "33.33%" }}>
                <TouchableOpacity
                  style={{ padding: 2 }}
                  onPress={() =>
                    navigation.navigate("ProfilePost", { postId: item._id })
                  }
                >
                  <Image
                    style={{ width: "100%", aspectRatio: 1 }}
                    source={{
                      uri: `http://192.168.1.14:5000/${item.imagePath}`,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Reels Grid */}
        <View
          style={[
            GlobalStyleSheet.container,
            { marginTop: 5, width: SIZES.width, padding: 0 },
          ]}
        >
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {reels.map((item, index) => (
              <View key={index} style={{ width: "33.33%", padding: 2 }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProfileReels", { reelId: item._id })
                  }
                >
                  <Image
                    style={{ width: "100%", aspectRatio: 1 / 1.9 }}
                    source={{
                      uri: `http://192.168.1.14:5000/${item.videoThumb}`,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  </SafeAreaView>
);

};

export default AnotherProfile;
