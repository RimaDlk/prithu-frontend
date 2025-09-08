import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme, useNavigation } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { FONTS, IMAGES } from '../../constants/theme';
import LikeBtn from '../../components/likebtn/LikeBtn';

const CommentSheet = (props: any, ref: any) => {
  const bottomSheetRef = useRef<any>(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const theme = useTheme();
  const { colors } = theme;
  const navigation = useNavigation<any>();

  const handleSheetChanges = useCallback((index: any) => {
    console.log('Comment sheet changed to index:', index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  );

  useImperativeHandle(ref, () => ({
    openSheet: () => {
      openSheet();
    },
  }));

  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  // 🔹 Using your old Comment data
  const comments = [
    {
        id: '1',
        title: 'alex techie',
        image: IMAGES.storypic1,
        time: "20min",
        comment: "Her daughter is so smart!",
        like: "20",
        commentNumber: "2",
        hasStory: false,
        replies: [
            {
                id: '1',
                title: 'Herry Malik',
                image: IMAGES.profilepic10,
                time: "10min",
                comment: "very Nice",
                like: "20",
                commentNumber: "5",
                hasStory: false,
              
            },
            {
                id: '2',
                title: 'david maoven',
                image: IMAGES.profilepic11,
                time: "5min",
                comment: "Very Very good ",
                like: "20",
                commentNumber: "2",
                hasStory: true, 
            },
        ]
    },
    {
        id: '2',
        title: 'lily learns',
        image: IMAGES.storypic2,
        time: "40min",
        comment: "Yes, Awesome",
        like: "2",
        commentNumber: "5",
        hasStory: false,
        replies: [
            {
                id: '1',
                title: 'aamir james',
                image: IMAGES.profilepic12,
                time: "20min",
                comment: "Nice",
                like: "20",
                commentNumber: "2",
                hasStory: true,

            },
            {
                id: '2',
                title: 'alex techie',
                image: IMAGES.profilepic13,
                time: "20min",
                comment: "😍❤😘",
                like: "20",
                commentNumber: "5",
                hasStory: false,

            },
        ]
        
    },
    {
        id: '3',
        title: 'mia maven',
        image: IMAGES.storypic3,
        time: "15min",
        comment: "Super",
        like: "10",
        commentNumber: "10",
        hasStory: true,
       
    },
    {
        id: '4',
        title: 'sophia james',
        image: IMAGES.storypic4,
        time: "19min",
        comment: "Very Nice",
        like: "38",
        commentNumber: "6",
        hasStory: true,
    },
    {
        id: '5',
        title: 'deepesh gaur',
        image: IMAGES.profile2,
        time: "5min",
        comment: "Very Very Nice",
        like: "80",
        commentNumber: "6",
        hasStory: false,
       
    },
    {
        id: '6',
        title: 'herry moven',
        image: IMAGES.storypic1,
        time: "13min",
        comment: "Good",
        like: "20",
        commentNumber: "10",
        hasStory: true,
      
    },
    {
        id: '7',
        title: 'aamir james',
        image: IMAGES.storypic2,
        time: "25min",
        comment: "Awesome",
        like: "29",
        commentNumber: "1",
        hasStory: false,
        
    },
    {
        id: '8',
        title: 'david maoven',
        image: IMAGES.storypic3,
        time: "7min",
        comment: "Bad",
        like: "10",
        commentNumber: "5",
        hasStory: true,
        
    },

];


  // 🔹 Old design inside renderItem
  const renderItem = ({ item }: any) => (
    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
      <TouchableOpacity
        onPress={() =>
          item.hasStory
            ? navigation.navigate('AnotherProfile')
            : navigation.navigate('status', {
                name: item.title,
                image: item.image,
                statusData: [IMAGES.profilepic11, IMAGES.profilepic12],
              })
        }
      >
        {item.hasStory ? (
          <Image
            style={{ width: 42, height: 42, borderRadius: 50 }}
            source={item.image}
          />
        ) : (
          <View>
            <Image
              style={{ width: 42, height: 42, borderRadius: 50 }}
              source={item.image}
            />
            <Image
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                resizeMode: 'contain',
              }}
              source={IMAGES.cricle}
            />
          </View>
        )}
      </TouchableOpacity>

      <View style={{ marginLeft: 10, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text
            style={[
              GlobalStyleSheet.textfont,
              { marginBottom: 5, color: colors.title },
            ]}
          >
            {item.title}
          </Text>
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 100,
              backgroundColor: colors.placeholder,
              opacity: 0.5,
            }}
          />
          <Text
            style={{
              ...FONTS.fontSm,
              ...FONTS.fontMedium,
              color: colors.text,
              opacity: 0.5,
            }}
          >
            {item.time}
          </Text>
        </View>

        <Text
          style={{
            ...FONTS.font,
            ...FONTS.fontMedium,
            color: colors.title,
            marginBottom: 8,
          }}
        >
          {item.comment}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity>
            <LikeBtn color={colors.title} sizes="xm" />
          </TouchableOpacity>
          <Text style={[GlobalStyleSheet.textfont, { color: colors.title }]}>
            {item.like}
          </Text>
        </View>
      </View>

      <TouchableOpacity>
        <Image
          style={{
            width: 15,
            height: 15,
            resizeMode: 'contain',
            marginTop: 15,
            tintColor: colors.title,
          }}
          source={IMAGES.more}
        />
      </TouchableOpacity>
    </View>
  );

  return (
   <BottomSheet
  ref={bottomSheetRef}
  index={-1}
  enablePanDownToClose
  snapPoints={snapPoints}
  onChange={handleSheetChanges}
  backdropComponent={renderBackdrop}
  backgroundStyle={{ backgroundColor: colors.card }}
  handleIndicatorStyle={{ backgroundColor: colors.border }}
>
  {/* ⚡ Use a normal View instead of BottomSheetView */}
  <View style={[GlobalStyleSheet.container, { flex: 1 }]}>
    {/* FlatList scrolls independently */}
    <FlatList
      data={comments}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
       contentContainerStyle={{ paddingBottom: 80 }} // keep space for input bar
      style={{ flex: 1 }}
    />

    {/* Fixed Input Bar */}
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        backgroundColor: colors.card,
      }}
    >
      <TouchableOpacity style={{ marginRight: 10 }}>
        <Image
          style={{ width: 20, height: 20, tintColor: colors.text }}
          source={IMAGES.happy}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Send your comment..."
        placeholderTextColor={colors.placeholder}
        style={{
          flex: 1,
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: colors.input,
          borderRadius: 20,
          color: colors.text,
        }}
      />
      <TouchableOpacity style={{ marginLeft: 10 }}>
        <Image
          style={{ width: 20, height: 20, tintColor: colors.primary }}
          source={IMAGES.send}
        />
      </TouchableOpacity>
    </View>
  </View>
</BottomSheet>

  );
};

export default forwardRef(CommentSheet);
