import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import axios from "axios";
import { useRandomImageContext } from "./RandomImageContext";

const RandomPage = () => {
  const { lastDisplayedImage, setLastDisplayedImage } = useRandomImageContext();
  const [imageLinks, setImageLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRandomImages = async () => {
    try {
      const response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s,title`
      );

      const newImageData = response.data.photos.photo.map((photo) => ({
        title: photo.title,
        url: photo.url_s,
      }));

      setImageLinks(newImageData);

      if (newImageData.length > 0) {
        setLastDisplayedImage(newImageData[0].url);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching image data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomImages();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={imageLinks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageCard}>
              <Image source={{ uri: item.url }} style={styles.image} />
              <Text style={styles.imageTitle}>{item.title}</Text>
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  list: {
    justifyContent: "space-between",
  },
  imageCard: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
  },
  imageTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default RandomPage;
