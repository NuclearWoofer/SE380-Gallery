import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, TextInput, TouchableOpacity, Modal } from 'react-native';
import { ImageData, generateImageData } from './ImageData';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;

const PhotoGalleryScreen: React.FC = () => {
  // State to store the list of images and the search term
  const [images, setImages] = useState<ImageData[]>(generateImageData());
  const [searchTerm, setSearchTerm] = useState<string>('');
  // State to store the selected image when tapped
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  // Function to handle search input text changes
  const handleSearch = (text: string) => {
    setSearchTerm(text);
    // Filter images based on the search term
    const filteredImages = generateImageData().filter((image) =>
      image.id.toString().includes(text)
    );
    // Update the images state with the filtered images
    setImages(filteredImages);
  };

  // Function to render each image item in the FlatList
  const renderItem = ({ item }: { item: ImageData }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <Image style={styles.image} source={{ uri: item.url }} />
    </TouchableOpacity>
  );

  // Function to handle tapping on an image
  const handleImagePress = (item: ImageData) => {
    setSelectedImage(item); // Store the selected image in the state
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedImage(null); // Clear the selected image from the state to close the modal
  };

  return (
    <View style={styles.container}>
      {/* Search input */}
      <TextInput
        style={styles.searchBar}
        onChangeText={handleSearch}
        value={searchTerm}
        placeholder="Search images..."
      />
      {/* FlatList to display the images in a grid layout */}
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.flatList}
      />
      {/* Modal to display the larger image when an image is tapped */}
      <Modal visible={!!selectedImage} transparent={true} onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal}>
            <Image style={styles.modalImage} source={{ uri: selectedImage?.url }} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black background for the modal
  },
  modalBackground: {
    padding: 20,
  },
  modalImage: {
    width: screenWidth - 40,
    height: screenWidth - 40,
    borderRadius: 10,
  },
});

export default PhotoGalleryScreen;