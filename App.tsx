// App.tsx or index.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import PhotoGalleryScreen from './PhotoGalleryScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PhotoGalleryScreen />
    </SafeAreaView>
  );
};

export default App;