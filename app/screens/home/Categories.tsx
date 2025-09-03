import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const ITEM_PER_ROW = 4;
const SPACING = 6;
const itemWidth = ((width - (SPACING * (ITEM_PER_ROW + 1))) / ITEM_PER_ROW) * 0.85;

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://192.168.1.4:5000/api/all/tags");
        const data = await res.json();
        console.log("Categories API Response:", data);

        if (Array.isArray(data.tags)) {
          setCategories(data.tags);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((cat, id) => (
          <LinearGradient
            key={cat._id || id}
            colors={["yellow", "green"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradient, { width: itemWidth }]}
          >
            <TouchableOpacity style={styles.item}>
              <Text style={styles.text}>{cat.name}</Text>
            </TouchableOpacity>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 12,
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  gradient: {
    borderRadius: 12,
    marginRight: SPACING,
    padding: 2, // Gradient border thickness
  },
  item: {
    backgroundColor: "#fff", // Inner background
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
});
