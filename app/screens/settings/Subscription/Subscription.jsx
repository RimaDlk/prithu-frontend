import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { CheckCircle2 } from "lucide-react-native"; // Lucide icon
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";


const { width, height } = Dimensions.get("window");

const SubscriptionScreen = () => {

    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      {/* Rocket Image */}
      <Image
        source={require("../../../assets/images/rocketss.png")}
        style={styles.rocket}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Upgrade to Premium</Text>

      {/* Features */}
      <View style={styles.featureContainer}>
        <View style={styles.featureRow}>
          <CheckCircle2 size={20} color="#316BFF" />
          <Text style={styles.featureText}>Unlimited Access to our Podcasts</Text>
        </View>
        <View style={styles.featureRow}>
          <CheckCircle2 size={20} color="#316BFF" />
          <Text style={styles.featureText}>Unlimited Songs Download</Text>
        </View>
        <View style={styles.featureRow}>
          <CheckCircle2 size={20} color="#316BFF" />
          <Text style={styles.featureText}>Unlimited Skips</Text>
        </View>
      </View>

      {/* Price */}
      <Text style={styles.price}>
        ₹ <Text style={styles.priceValue}>499</Text>
        <Text style={styles.duration}> /1 Year</Text>
      </Text>

      {/* Button */}
     <TouchableOpacity style={styles.button}>
      <LinearGradient
        colors={["yellow", "green"]} // yellow → green
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.buttonText}>Go Premium</Text>
      </LinearGradient>
    </TouchableOpacity>

      {/* Other Plans */}
      <TouchableOpacity onPress={() => navigation.navigate("PlanSubcribe")}>
        <Text style={styles.otherPlans}>Other Plans</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center", // keeps everything centered
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  closeButton: {
    position: "absolute",
    top: height * 0.05,
    right: width * 0.05,
  },
  closeText: {
    fontSize: width * 0.08,
    color: "#000",
  },
  rocket: {
    width: width * 0.55,
    height: height * 0.38,
    marginBottom: height * 0.01,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "700",
    color: "#161648",
    marginBottom: height * 0.02,
    textAlign: "center",
  },
  featureContainer: {
    marginBottom: height * 0.04,
    width: "90%", // left alignment within center layout
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.015,
  },
  featureText: {
    fontSize: width * 0.04,
    color: "#2d2d54",
    marginLeft: 9,
  },
  price: {
    fontSize: width * 0.045,
    marginBottom: height * 0.025,
    color: "#2d2d54",
    textAlign: "center",
  },
  priceValue: {
    fontSize: width * 0.085,
    fontWeight: "700",
    color: "#2d2d54",
  },
  duration: {
    fontSize: width * 0.035,
    color: "gray",
  },
  button: {
    borderRadius: width * 0.04,
    overflow: "hidden", // ensures gradient respects borderRadius
    marginBottom: height * 0.03,
    elevation: 4,
    shadowColor: "#316BFF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  gradient: {
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "600",
  },
  otherPlans: {
    fontSize: width * 0.04,
    color: "#316BFF",
    textDecorationLine: "underline",
  },
});

export default SubscriptionScreen;
