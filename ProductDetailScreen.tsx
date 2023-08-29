import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { toggleFavorite, getFavorites } from './favorites'; // Import the toggleFavorite and getFavorites functions
import { Product } from './ProductTypes'; // Import the Product type

type Props = {
  route: { params: { product: Product } };
};

export default function ProductDetailScreen({ route }: Props) {
  const { product } = route.params;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    getFavorites().then((favorites) => {
      setIsFavorite(favorites.includes(product.id));
    });
  }, [product.id]);

  const handleToggleFavorite = async () => {
    await toggleFavorite(product.id);
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: product.image }} style={{ width: 200, height: 200 }} />
      <Text>Title: {product.name}</Text>
      <Text>Description: {product.description}</Text>
      <Text>Price: ${product.price.toFixed(2)}</Text>
      <Text>Rating: {product.rating.rate} ({product.rating.count} ratings)</Text>
      <Button
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={handleToggleFavorite}
        color={isFavorite ? 'red' : 'green'} // Use red for remove and green for add
      />
      <Button title={'Go Back'} onPress={() => navigation.goBack()} />
    </View>
  );
}
