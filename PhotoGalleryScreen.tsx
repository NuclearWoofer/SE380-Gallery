import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, TextInput, TouchableOpacity, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types'; 
import { ImageData, generateImageData } from './ImageData';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;

interface PhotoGalleryScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'PhotoGalleryScreen'>;
}

function PhotoGalleryScreen({ navigation }: PhotoGalleryScreenProps) {
  const [images, setImages] = useState<ImageData[]>(generateImageData());
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const filteredImages = generateImageData().filter((image: { id: { toString: () => string | string[]; }; }) =>
      image.id.toString().includes(text)
    );
    setImages(filteredImages);
  };

  const renderItem = ({ item }: { item: ImageData }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <Image style={styles.image} source={{ uri: item.url }} />
    </TouchableOpacity>
  );

  const handleImagePress = (item: ImageData) => {
    navigation.navigate('ImageDetail', { url: item.url });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onChangeText={handleSearch}
        value={searchTerm}
        placeholder="Search images..."
      />
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  flatList: {
    alignItems: 'center',
  },
  image: {
    width: screenWidth / numColumns - 20,
    height: screenWidth / numColumns - 20,
    margin: 5,
  },
});

export default PhotoGalleryScreen;
