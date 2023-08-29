import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FavoriteProduct {
  id: string;
  name: string;
}

interface FavoritesContextType {
  favorites: FavoriteProduct[];
  addFavorite: (product: FavoriteProduct) => void;
  removeFavorite: (productId: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites from AsyncStorage:', error);
      }
    };

    loadFavorites();
  }, []);

  const addFavorite = (product: FavoriteProduct) => {
    const updatedFavorites = [...favorites, product];
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const removeFavorite = (productId: string) => {
    const updatedFavorites = favorites.filter((product) => product.id !== productId);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const saveFavorites = async (favoritesToSave: FavoriteProduct[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesToSave));
    } catch (error) {
      console.error('Error saving favorites to AsyncStorage:', error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
