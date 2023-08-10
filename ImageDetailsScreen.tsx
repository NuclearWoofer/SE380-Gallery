import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type ImageDetailScreenRouteProp = RouteProp<RootStackParamList, 'ImageDetail'>;

type ImageDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ImageDetail'>;

type ImageDetailScreenProps = {
  route: ImageDetailScreenRouteProp;
  navigation: ImageDetailScreenNavigationProp;
};

function ImageDetailsScreen({ route, navigation }: ImageDetailScreenProps) {
  const { url } = route.params;

  const handleOpenModal = () => {
    navigation.navigate('ImageModal', { url });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenModal}>
        <Image style={styles.image} source={{ uri: url }} />
      </TouchableOpacity>
      <Text style={styles.urlText}>{url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  urlText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default ImageDetailsScreen;
