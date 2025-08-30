import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient"; // ✅ correct gradient import

const { width } = Dimensions.get("window");

const InviteFriends = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invite Friends</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <LinearGradient
            colors={["yellow", "green"]} // yellow → green
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.activeTab}
          >
            <Text style={styles.activeTabText}>Your Referrals</Text>
          </LinearGradient>

          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Invited Friends (26)</Text>
          </TouchableOpacity>
        </View>

        {/* Illustration */}
        <View style={styles.imageBox}>
          <Image
            source={require("../../../assets/images/Invites.png")}
            style={styles.illustration}
            resizeMode="cover"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Invite Friends, Get 1,000 Points Per Friend!</Text>

        {/* Referral Code */}
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>SUJITH0826</Text>
          <TouchableOpacity>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>

        {/* Updated Info Section */}
        <View style={styles.infoBox}>
          {/* Info Line 1 */}
          <View style={styles.infoLine}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/2329/2329142.png" }}
              style={styles.icon}
            />
            <Text style={styles.infoText}>
              Invite your friend to install the app with the link.
            </Text>
          </View>
          <LinearGradient
            colors={["yellow", "green"]}
            style={styles.arrowGradient}
          >
            <Ionicons name="chevron-down-circle" size={24} color="#fff" />
          </LinearGradient>

          {/* Info Line 2 */}
          <View style={styles.infoLine}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/3301/3301062.png" }}
              style={styles.icon}
            />
            <Text style={styles.infoText}>
              Your friend places a minimum order of ₹300.
            </Text>
          </View>
          <LinearGradient
            colors={["yellow", "green"]}
            style={styles.arrowGradient}
          >
            <Ionicons name="chevron-down-circle" size={24} color="#fff" />
          </LinearGradient>

          {/* Info Line 3 */}
          <View style={styles.infoLine}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/1760/1760535.png" }}
              style={styles.icon}
            />
            <Text style={styles.infoText}>
              You get ₹150 once the return period is over.
            </Text>
          </View>
          <LinearGradient
            colors={["yellow", "green"]}
            style={styles.arrowGradient}
          >
            <Ionicons name="chevron-down-circle" size={24} color="#fff" />
          </LinearGradient>
        </View>

        {/* Share Button */}
        <TouchableOpacity style={styles.shareWrapper}>
          <LinearGradient
            colors={["yellow", "green"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.shareButton}
          >
            <Text style={styles.shareText}>Share my Referral Code</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default InviteFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDECEC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#FDECEC",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  scrollContent: {
    paddingBottom: 30,
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    width: "90%",
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
  },
  activeTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  inactiveTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  inactiveTabText: {
    color: "#000",
    fontWeight: "500",
  },
  imageBox: {
    width: width * 0.6,
    height: width * 0.5,
    marginBottom: 10,
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginVertical: 12,
    paddingHorizontal: 15,
  },
  codeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 15,
  },
  codeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  copyText: {
    fontSize: 14,
    fontWeight: "500",
    color: "green",
  },
  infoBox: {
    width: "90%",
    marginBottom: 20,
  },
  infoLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    flex: 1,
  },
  arrowGradient: {
    alignSelf: "center",
    padding: 2,
    borderRadius: 20,
    marginVertical: 5,
  },
  shareWrapper: {
    width: "90%",
    borderRadius: 30,
    overflow: "hidden",
  },
  shareButton: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 30,
  },
  shareText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
