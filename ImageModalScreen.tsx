import React from 'react';
import { View, StyleSheet, Modal, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types'; 

interface ImageModalScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'ImageModal'>;
  route: RouteProp<RootStackParamList, 'ImageModal'>;
}

const ImageModalScreen: React.FC<ImageModalScreenProps> = ({ navigation, route }) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const { url } = route.params;

  const handleCloseModal = () => {
    navigation.goBack();
  };

  return (
    <Modal visible={!!url} transparent={true} onRequestClose={handleCloseModal}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal}>
          <Image
            style={[styles.modalImage, { width: screenWidth - 40, height: screenHeight / 2 }]}
            source={{ uri: url }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  modalBackground: {
    padding: 20,
  },
  modalImage: {
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ImageModalScreen;
