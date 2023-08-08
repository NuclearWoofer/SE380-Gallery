import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PhotoGalleryScreen from './PhotoGalleryScreen';
import ImageDetailsScreen from './ImageDetailsScreen';
import ImageModalScreen from './ImageModalScreen'; // Import the ImageModalScreen
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PhotoGallery">
        <Stack.Screen name="PhotoGallery" component={PhotoGalleryScreen} />
        <Stack.Screen name="ImageDetail" component={ImageDetailsScreen} />
        <Stack.Screen name="ImageModal" component={ImageModalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
