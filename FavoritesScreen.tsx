import React, { useState, useEffect } from "react";
import {View,Text,FlatList,TouchableOpacity,Image,StyleSheet,ActivityIndicator,Button,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetch } from "./useFetch";
import { useFocusEffect } from "@react-navigation/native";

const FavoriteItem = ({ url, navigation }) => {
  const { productData, loading, error } = useFetch(url);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.favoriteItemContainer}
      onPress={() => navigation.navigate("ProductDetail", { url })}
    >
      <Image
        source={{ uri: productData.image }}
        style={styles.favoriteItemImage}
      />
      <Text style={styles.favoriteItemName}>{productData.title}</Text>
    </TouchableOpacity>
  );
};

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFavorites = async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          const data = await AsyncStorage.multiGet(keys);
          const favoriteProducts = data
            .filter(([, value]) => value === "true")
            .map(([key]) => key);
          setFavorites(favoriteProducts);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }, [])
  );

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setFavorites([]);
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <FavoriteItem url={item} navigation={navigation} />
        )}
      />
      <Button title="Clear Favorites" onPress={clearStorage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  favoriteItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  favoriteItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  favoriteItemName: {
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  errorText: {
    color: "red",
    fontSize: 15,
    textAlign: "center",
  },
});

export default FavoritesScreen;
