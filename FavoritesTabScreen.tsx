import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFavorites } from './FavoritesContext';
import { RootStackParamList } from './types';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

type ProductDetailScreenProps = {
  route: ProductDetailScreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
};

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route, navigation }) => {
  const { url } = route.params;
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some((product) => product.id === url);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(url);
    } else {
      addFavorite({ id: url, name: 'Product Name' }); // replace with logic
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.image} source={{ uri: url }} />
      </TouchableOpacity>
      <Text style={styles.urlText}>{url}</Text>
      <TouchableOpacity onPress={toggleFavorite}>
        {isFavorite ? (
          <Text style={styles.favoriteText}>Remove from Favorites</Text>
        ) : (
          <Text style={styles.favoriteText}>Add to Favorites</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  urlText: {
    marginTop: 20,
    fontSize: 16,
  },
  favoriteText: {
    color: 'blue',
    fontSize: 18,
    marginTop: 10,
  },
});

export default ProductDetailScreen;
