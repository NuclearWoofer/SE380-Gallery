import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { RootStackParamList } from './types';
import { ImageData, generateImageData } from './ImageData';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

interface PhotoGalleryScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PhotoGalleryScreen'>; 
}

function PhotoGalleryScreen({ navigation }: PhotoGalleryScreenProps) {
  const [images, setImages] = useState<ImageData[]>(generateImageData());
  const [searchTerm, setSearchTerm] = useState<string>('');

  const verticalMargin = useSharedValue(2);
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(1);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const filteredImages = generateImageData().filter((image) =>
      image.id.toString().includes(text)
    );
    setImages(filteredImages);
  };

  const fadeIn = () => {
    fadeAnim.value = withTiming(1, { duration: 500 });
  };

  useEffect(() => {
    fadeIn();
  }, []);

  const renderItem = ({ item }: { item: ImageData }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <Animated.Image
        sharedTransitionTag={`tag-${item.url}`}
        style={[
          styles.image,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }, 
        ]}
        source={{ uri: item.url }}
      />
    </TouchableOpacity>
  );

  const handleImagePress = (item: ImageData) => {
    navigation.navigate('ImageDetail', { url: item.url });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginVertical: verticalMargin.value, // Use the animated value here
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const newMargin = 20 + event.contentOffset.y / 30;
      if (newMargin < 8) {
        verticalMargin.value = 8;
      } else if (newMargin > 20) {
        verticalMargin.value = 20;
      } else {
        verticalMargin.value = newMargin;
      }

      const newScale = 1 + event.contentOffset.y / 1000; 
      scaleAnim.value = newScale;
    },
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TextInput
        onChangeText={handleSearch}
        value={searchTerm}
        placeholder="Search images..."
      />
      <Animated.FlatList
        scrollEventThrottle={1}
        contentContainerStyle={{ alignItems: 'center', paddingTop: 8 }}
        numColumns={3}
        data={images}
        renderItem={renderItem}
        keyExtractor={({ id }) => id.toString()}
        onScroll={scrollHandler}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
  },
  image: {
    margin: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
});

export default PhotoGalleryScreen;
