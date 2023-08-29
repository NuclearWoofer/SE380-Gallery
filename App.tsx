import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoritesProvider } from './FavoritesContext'; // Import the FavoritesProvider
import BarCodeScannerScreen from './BarCodeScannerScreen';
import FavoritesTabScreen from './FavoritesTabScreen';
import PhotoGalleryScreen from './PhotoGalleryScreen';
import ImageDetailsScreen from './ImageDetailsScreen';
import ImageModalScreen from './ImageModalScreen';
import ProductDetailScreen from './ProductDetailScreen';
import WeatherApp from './WeatherApp';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const BottomTabScreens = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="BarCodeScanner"
      component={BarCodeScannerScreen}
      options={{
        title: 'Scanner',
        unmountOnBlur: true, // Unmount the screen when navigating away
      }}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          // Prevent the default tab press action
          e.preventDefault();

          // Navigate to the initial screen in the stack
          navigation.navigate('BarCodeScanner');
        },
      })}
    />
    <Tab.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Tab.Screen name="Favorites" component={FavoritesTabScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <FavoritesProvider> 
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="PhotoGallery">
          <Drawer.Screen name="PhotoGallery" component={PhotoGalleryScreen} />
          <Drawer.Screen name="ImageDetail" component={ImageDetailsScreen} />
          <Drawer.Screen name="ImageModal" component={ImageModalScreen} />
          <Drawer.Screen name="BottomTabs" component={BottomTabScreens} />
          <Drawer.Screen name="WeatherApp" component={WeatherApp} />
        </Drawer.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
