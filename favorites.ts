import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

export const getFavorites = async (): Promise<string[]> => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const toggleFavorite = async (productId: string): Promise<void> => {
  try {
    let favorites = await getFavorites();
    const index = favorites.indexOf(productId);

    if (index === -1) {
      favorites.push(productId);
    } else {
      favorites.splice(index, 1);
    }

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};
