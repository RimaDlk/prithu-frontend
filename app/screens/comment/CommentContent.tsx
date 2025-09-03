import React, { useRef } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import { IMAGES } from "../../constants/theme";
import ChatoptionSheet from "../../components/bottomsheet/ChatoptionSheet";

const sampleComments = [
  {
    id: "1",
    user: "Rima",
    text: "This is my first comment!",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    user: "Alex",
    text: "Nice post 👍",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
];

const CommentsContent = () => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const moresheet = useRef<any>();

  const renderItem = ({ item }: any) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.border,
      }}
    >
      <Image
        source={{ uri: item.avatar }}
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text, fontWeight: "bold" }}>
          {item.user}
        </Text>
        <Text style={{ color: colors.text }}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.card }}>
      {/* Input bar */}
      <View style={{ marginBottom: 10, paddingHorizontal: 15 }}>
        <TouchableOpacity
          style={{
            zIndex: 1,
            position: "absolute",
            top: 13,
            left: 15,
          }}
        >
          <Image
            style={{ tintColor: colors.text, width: 20, height: 20 }}
            source={IMAGES.happy}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Send your comment..."
          placeholderTextColor={colors.placeholder}
          style={[
            GlobalStyleSheet.inputBox,
            {
              backgroundColor: colors.input,
              paddingLeft: 45,
              paddingRight: 45,
            },
          ]}
        />
        <TouchableOpacity
          style={{
            zIndex: 1,
            position: "absolute",
            top: 13,
            right: 15,
          }}
        >
          <Image
            style={{ tintColor: colors.primary, width: 20, height: 20 }}
            source={IMAGES.send}
          />
        </TouchableOpacity>
      </View>

      {/* Comments list */}
      <FlatList
        data={sampleComments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <ChatoptionSheet ref={moresheet} deleteChat={false} />
    </View>
  );
};

export default CommentsContent;
