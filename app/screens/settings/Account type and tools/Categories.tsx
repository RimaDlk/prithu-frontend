import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Switch,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const categories = [
    "Artist",
    "Musician/band",
    "Blogger",
    "Clothing (Brand)",
    "Community",
    "Digital creator",
    "Education",
    "Health/beauty",
    "Editor",
    "Writer",
    "Personal blog",
    "Product/service",
    "Gamer",
    "Restaurant",
    "Beauty, cosmetic & personal care",
    "Grocery Store",
    "Photographer",
    "Shopping & retail",
    "Reel creator",


];

const Categories = ({ navigation }: any) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [selected, setSelected] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [showOnProfile, setShowOnProfile] = useState(false);

    const filteredCategories = categories.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            {/* Fixed Header */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 15,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: colors.text,
                        marginLeft: 15,
                    }}
                >
                    What best describes you?
                </Text>
            </View>

            {/* Fixed Subtitle */}
            <Text
                style={{
                    fontSize: 14,
                    color: colors.text,
                    marginHorizontal: 15,
                    marginBottom: 15,
                }}
            >
                Categories help people find accounts like yours. You can change this at
                any time.
            </Text>

            {/* Fixed Toggle */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 15,
                    marginBottom: 10,
                }}
            >
                <Text style={{ fontSize: 16, color: colors.text }}>
                    Display on profile
                </Text>
                <Switch
                    value={showOnProfile}
                    onValueChange={setShowOnProfile}
                    thumbColor={showOnProfile ? colors.primary : "#f4f3f4"}
                />
            </View>

            {/* Fixed Search Bar */}
            <View
                style={{
                    backgroundColor: colors.background,
                    marginHorizontal: 15,
                    marginBottom: 10,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Ionicons name="search" size={18} color={colors.text} />
                <TextInput
                    placeholder="Search categories"
                    placeholderTextColor={colors.text}
                    value={search}
                    onChangeText={setSearch}
                    style={{
                        flex: 1,
                        color: colors.text,
                        paddingVertical: 10,
                        marginLeft: 8,
                    }}
                />
            </View>

            {/* Scrollable List ONLY */}
            <FlatList
                data={filteredCategories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 15,
                            paddingVertical: 12,
                        }}
                        onPress={() => setSelected(item)}
                    >
                        <Text style={{ fontSize: 16, color: colors.text }}>{item}</Text>
                        <View
                            style={{
                                height: 22,
                                width: 22,
                                borderRadius: 11,
                                borderWidth: 2,
                                borderColor: colors.text,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {selected === item && (
                                <View
                                    style={{
                                        height: 12,
                                        width: 12,
                                        borderRadius: 6,
                                        backgroundColor: colors.primary,
                                    }}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                )}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 30 }} // space for button
            />

            {/* Fixed Bottom Button */}
            <View style={{ padding: 15, backgroundColor: colors.card, marginBottom: 50 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.primary,
                        paddingVertical: 15,
                        borderRadius: 8,
                        alignItems: "center",
                    }}
                    onPress={() => {
                        if (!selected) {
                            alert("Please select a category first!");
                            return;
                        }
                        navigation.navigate("SwitchAccountLogin", { selectedCategory: selected });
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
                        Switch to professional account
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 12,
                        color: colors.text,
                        textAlign: "center",
                        marginTop: 8,
                    }}
                >
                    Switching makes your profile public and all of your content can appear
                    in search engines.{" "}
                    <Text style={{ color: colors.primary }}>Learn how to manage</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Categories;
