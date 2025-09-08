import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';
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

  // Add tag handler
  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
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
      formData.append('language', language || 'English');
      formData.append('category', category && category !== '' ? category : 'General');

      // Tags
      if (tags.length > 0) {
        formData.append('tags', JSON.stringify(tags));
      }

      // Media type
      formData.append('type', mediaType);

      const token = await AsyncStorage.getItem('userToken');
      const res = await axios.post('http://192.168.1.4:5000/api/creator/feed/upload', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });

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
            {/* Media Preview */}
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
              <Text style={[GlobalStyleSheet.inputlable, { color: colors.title, fontWeight: 'bold', fontSize: 15 }]}>
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
              <Text style={[GlobalStyleSheet.inputlable, { color: colors.title, fontWeight: 'bold', fontSize: 15 }]}>
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
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
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
                      <Text style={{ color: '#fff' }}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Nextpage;
