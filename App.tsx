import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PhotoGalleryScreen from './PhotoGalleryScreen';
import ImageDetailsScreen from './ImageDetailsScreen';
import ImageModalScreen from './ImageModalScreen';
import { RootStackParamList } from './types';
import BarCodeScannerScreen from './BarCodeScannerScreen';
import WeatherApp from './WeatherApp';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Screen components for the tab at the bottom
const BottomTabScreens = () => (
  <Tab.Navigator>
    <Tab.Screen name="WeatherApp" component={WeatherApp} />
    <Tab.Screen name="BarCodeScannerScreen" component={BarCodeScannerScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="PhotoGalleryScreen">
        <Drawer.Screen name="PhotoGallery" component={PhotoGalleryScreen} />
        <Drawer.Screen name="ImageDetail" component={ImageDetailsScreen} />
        <Drawer.Screen name="ImageModal" component={ImageModalScreen} />
        <Drawer.Screen name="BottomTabs" component={BottomTabScreens} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
