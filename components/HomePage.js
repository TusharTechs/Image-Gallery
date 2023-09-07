import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRandomImageContext } from "./RandomImageContext";

const HomePage = () => {
  const { imageLinks } = useRandomImageContext();

  return (
    <View style={styles.container}>
      {imageLinks.map((imageUrl, index) => (
        <Image key={index} source={{ uri: imageUrl }} style={styles.image} />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
  },
});

export default HomePage;
