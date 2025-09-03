// import React from 'react';
// import { View, Text, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
// import { useTheme } from '@react-navigation/native';
// import Header from '../../layout/Header';
// import { IMAGES, SIZES } from '../../constants/theme';
// import { GlobalStyleSheet } from '../../constants/styleSheet';
// import { ScrollView } from 'react-native-gesture-handler';

// const Nextpage = () => {

//     const theme = useTheme();
//     const { colors } : {colors : any} = theme;

//   return (
//     <SafeAreaView style={{backgroundColor:colors.card,flex:1}}>
//         <Header
//             title="New Post"
//             post={true}
//         />
//         <KeyboardAvoidingView
//           style={{flex: 1}}
//           //behavior={Platform.OS === 'ios' ? 'padding' : ''}
//         >
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{flex:1}}
//           >
//             <View style={[GlobalStyleSheet.container,{padding:0}]}>
//                 <View style={{ paddingVertical: 30, backgroundColor: 'rgba(71,90,119,.25)' }}>
//                     <Image
//                         style={{
//                              height: SIZES.width < SIZES.container ? SIZES.width - (SIZES.width * (20 / 100)) : SIZES.container - (SIZES.container * (20 / 100)),
//                             width: '100%',
//                             resizeMode: 'contain'
//                         }}
//                         source={IMAGES.profilepic11}
//                     />
//                 </View>
//             </View>
//             <View style={[GlobalStyleSheet.container,{marginTop:20}]}>
//                 <Text style={[GlobalStyleSheet.inputlable, { color: colors.title, opacity: .6 }]}>Write a caption...</Text>
//                 <View
//                     style={[
//                         GlobalStyleSheet.inputBox, {
//                             borderColor: colors.border,
//                             borderWidth: 1,
//                             paddingLeft: 20,
//                             height: 'auto'
//                         },
//                     ]}
//                 >
//                     <TextInput
//                         multiline
//                         numberOfLines={5}
//                         style={[GlobalStyleSheet.input, { color: colors.title, height: 'auto', paddingTop: 10, paddingRight: 10, paddingBottom:10,textAlignVertical: 'top' }]}
//                         defaultValue={`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.\n.\n.\n.\n #Nature #Photography #Ballon`}
//                     />
//                 </View>   
//             </View>
//           </ScrollView>

//         </KeyboardAvoidingView>
//     </SafeAreaView>
//   )
// }

// export default Nextpage
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { IMAGES, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

type NextpageScreenProps = StackScreenProps<RootStackParamList, 'Nextpage'>;

const Nextpage = ({ route, navigation }: NextpageScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const { mediaUrl, mediaType } = route.params || {}; // Get mediaUrl and mediaType from navigation params
  console.log('Params in Nextpage:', mediaUrl, mediaType);


  // states
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [scheduleTime, setScheduleTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

const handleSaveSchedule = async () => {
  if (!scheduleDate || !scheduleTime) {
    alert("Please choose both date and time first!");
    return;
  }

  try {
    const userId = await AsyncStorage.getItem("userId");

    const formData = new FormData();

    // File
    formData.append("file", {
      uri: mediaUrl,
      name: mediaType === "video" ? "upload.mp4" : "upload.jpg",
      type: mediaType === "video" ? "video/mp4" : "image/jpeg",
    } as any);

    // Metadata
    formData.append("language", language || "English");
    formData.append("category", category && category !== "" ? category : "General");
    formData.append("type", mediaType);

    if (tags.length > 0) {
      formData.append("tags", JSON.stringify(tags)); // ✅ backend parses correctly
    }

    // ✅ Combine schedule date + time into one field
    const combinedSchedule = new Date(scheduleDate);
    combinedSchedule.setHours(scheduleTime.getHours(), scheduleTime.getMinutes());
    formData.append("scheduledAt", combinedSchedule.toISOString());

    const res = await axios.post(
      `http://192.168.1.4:5000/api/creator/feed/schedule/${userId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (res.status === 201) {
      setIsSaved(true);
      alert(
        `Schedule saved!\nDate: ${scheduleDate.toDateString()}\nTime: ${scheduleTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      );
    }
  } catch (error: any) {
    console.error("Schedule save error:", error.response?.data || error.message);
    Alert.alert("Error", error.response?.data?.message || "Failed to save schedule");
  }
};



  // Add tag handler
  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handlePost = async () => {
    if (!mediaUrl) {
      Alert.alert('Error', 'No media selected');
      return;
    }

    try {
      const formData = new FormData();

      // File
      formData.append('file', {
        uri: mediaUrl,
        name: mediaType === 'video' ? 'upload.mp4' : 'upload.jpg',
        type: mediaType === 'video' ? 'video/mp4' : 'image/jpeg',
      } as any);

      // Dynamic fields from state
      formData.append('language', language || "English");
      formData.append('category', category && category !== "" ? category : "General");

      // if (tags.length > 0) {
      //   tags.forEach(tag => formData.append("tags[]", tag));
      // }

       // ✅ Fix: send tags properly
      if (tags.length > 0) {
      formData.append('tags', JSON.stringify(tags));
    }

      //  Use mediaType directly (removed selectedMedia)
      formData.append('type', mediaType);

       // ✅ Fix: combine scheduleDate + scheduleTime into scheduledAt
    if (scheduleDate && scheduleTime) {
      const combinedSchedule = new Date(scheduleDate);
      combinedSchedule.setHours(
        scheduleTime.getHours(),
        scheduleTime.getMinutes()
      );
      formData.append('scheduledAt', combinedSchedule.toISOString());
    }

    const userId = await AsyncStorage.getItem('userId');

    const res = await axios.post(
      `http://192.168.1.4:5000/api/creator/feed/${userId}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    if (res.status === 201) {
      Alert.alert('Success', 'Post uploaded successfully');
      navigation.navigate('DrawerNavigation', { screen: 'Home' });
    }
  } catch (error: any) {
    console.error('Upload error:', error.response?.data || error.message);
    Alert.alert('Error', error.response?.data?.message || 'Upload failed');
  }
};

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
        <Header title="New Post" post={true} onPress={handlePost} />
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
            <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
              <View style={{ paddingVertical: 30, backgroundColor: 'rgba(71,90,119,.25)' }}>
                {mediaUrl && mediaType === 'image' ? (
                  <Image
                    style={{
                      height:
                        SIZES.width < SIZES.container
                          ? SIZES.width - SIZES.width * 0.2
                          : SIZES.container - SIZES.container * 0.2,
                      width: '100%',
                      resizeMode: 'contain',
                    }}
                    source={{ uri: mediaUrl }}
                  />
                ) : mediaUrl && mediaType === 'video' ? (
                  <Video
                    source={{ uri: mediaUrl }}
                    style={{
                      height:
                        SIZES.width < SIZES.container
                          ? SIZES.width - SIZES.width * 0.2
                          : SIZES.container - SIZES.container * 0.2,
                      width: '100%',
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                  />
                ) : (
                  <Image
                    style={{
                      height:
                        SIZES.width < SIZES.container
                          ? SIZES.width - SIZES.width * 0.2
                          : SIZES.container - SIZES.container * 0.2,
                      width: '100%',
                      resizeMode: 'contain',
                    }}
                    source={IMAGES.profilepic11} // Fallback image
                  />
                )}
              </View>
            </View>

            {/* Language Picker */}
            <View style={[GlobalStyleSheet.container]}>
              <Text style={[GlobalStyleSheet.inputlable, { color: colors.title, fontWeight: "bold", fontSize: 15 }]}>
                Select Language
              </Text>
              <View
                style={[
                  GlobalStyleSheet.inputBox,
                  { borderColor: colors.border, borderWidth: 1, paddingHorizontal: 10 },
                ]}
              >
                <Picker
                  selectedValue={language}
                  onValueChange={(itemValue) => setLanguage(itemValue)}
                  style={{ color: colors.title }}
                >
                  <Picker.Item label="Choose Language" value="" />
                  <Picker.Item label="Tamil" value="Tamil" />
                  <Picker.Item label="English" value="English" />
                  <Picker.Item label="Malayalam" value="Malayalam" />
                  <Picker.Item label="French" value="French" />
                </Picker>
              </View>
            </View>

            {/* Tags Input */}
            <View style={[GlobalStyleSheet.container, { marginTop: -26 }]}>
              <Text style={[GlobalStyleSheet.inputlable, { color: colors.title, fontWeight: "bold", fontSize: 15 }]}>
                Enter Tags
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={[
                    GlobalStyleSheet.inputBox,
                    {
                      flex: 1,
                      borderColor: colors.border,
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      marginRight: 10,
                    },
                  ]}
                >
                  <TextInput
                    placeholder="Type here..."
                    value={tagInput}
                    onChangeText={setTagInput}
                    style={[GlobalStyleSheet.input, { color: colors.title, paddingVertical: 10 }]}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleAddTag}
                  style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -16,
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '600' }}>Add</Text>
                </TouchableOpacity>
              </View>

              {tags.length > 0 && (
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                  {tags.map((tag, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: colors.primary,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 20,
                        marginRight: 8,
                        marginBottom: 8,
                      }}
                    >
                      <Text style={{ color: "#fff" }}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* ✅ Scheduling Section (unchanged) */}
            <View style={[GlobalStyleSheet.container, { marginTop: -15 }]}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={[GlobalStyleSheet.inputlable, { color: colors.title, fontWeight: "bold", fontSize: 15 }]}>
                  Schedule Post
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setIsScheduled(!isScheduled);
                    setIsSaved(false);
                    setScheduleDate(null);
                    setScheduleTime(null);
                  }}
                  style={{
                    width: 50,
                    height: 28,
                    borderRadius: 20,
                    backgroundColor: isScheduled ? colors.primary : "#ccc",
                    justifyContent: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      backgroundColor: "#fff",
                      alignSelf: isScheduled ? "flex-end" : "flex-start",
                    }}
                  />
                </TouchableOpacity>
              </View>

              {isScheduled && (
                <View style={{ marginTop: 15 }}>
                  <TouchableOpacity
                    disabled={isSaved}
                    onPress={() => setShowDatePicker(true)}
                    style={[
                      GlobalStyleSheet.inputBox,
                      {
                        borderColor: colors.border,
                        borderWidth: 1,
                        paddingVertical: 12,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text style={{ color: colors.title }}>
                      {scheduleDate ? scheduleDate.toDateString() : "Choose Date"}
                    </Text>
                    {isSaved && <Text style={{ fontSize: 18, color: "green", marginRight: 25 }}>✔</Text>}
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled={isSaved}
                    onPress={() => setShowTimePicker(true)}
                    style={[
                      GlobalStyleSheet.inputBox,
                      {
                        borderColor: colors.border,
                        borderWidth: 1,
                        paddingVertical: 12,
                        marginTop: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text style={{ color: colors.title }}>
                      {scheduleTime
                        ? scheduleTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : "Choose Time"}
                    </Text>
                    {isSaved && <Text style={{ fontSize: 18, color: "green", marginRight: 25 }}>✔</Text>}
                  </TouchableOpacity>

                  {!isSaved && (
                    <TouchableOpacity
                      onPress={handleSaveSchedule}
                      style={{
                        marginTop: 20,
                        backgroundColor: colors.primary,
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Save Schedule</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={scheduleDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setScheduleDate(selectedDate);
                  }}
                />
              )}

              {showTimePicker && (
                <DateTimePicker
                  value={scheduleTime || new Date()}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) setScheduleTime(selectedTime);
                  }}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Nextpage;
