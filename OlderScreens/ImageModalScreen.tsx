import React from 'react';
import { View, StyleSheet, Modal, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types'; 
import { NativeStackNavigationProp, NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import Animated from 'react-native-reanimated';

type ImageModalRouteProp = RouteProp<RootStackParamList, 'ImageModal'>;

type NavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ImageModal'>;
  route: ImageModalRouteProp; 
};

function ImageModalScreen({ navigation, route }: NavigationProps) {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const { url } = route.params; 

  const handleCloseModal = () => {
    navigation.goBack();
  };

  return (
    <Modal visible={true} transparent={true} onRequestClose={handleCloseModal}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal}>
          <Animated.Image
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
}

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
