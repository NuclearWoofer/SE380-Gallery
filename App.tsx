import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PhotoGalleryScreen from './PhotoGalleryScreen';
import WeatherApp from './WeatherApp';
import ImageDetailsScreen from './ImageDetailsScreen';
import ImageModalScreen from './ImageModalScreen'; // Import the ImageModalScreen
import { RootStackParamList } from './types';

const Drawer = createDrawerNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="PhotoGallery">
        <Drawer.Screen name="PhotoGallery" component={PhotoGalleryScreen} />
        <Drawer.Screen
          name="ImageDetail"
          component={ImageDetailsScreen}
        />
        <Drawer.Screen
          name="ImageModal"
          component={ImageModalScreen}
        />
        <Drawer.Screen
          name="WeatherApp"
          component={WeatherApp}
          options={{ headerTitle: 'Weather App' }} // Set the header title
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
