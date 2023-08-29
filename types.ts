import {Product} from './ProductTypes'

export type RootStackParamList = {
  PhotoGalleryScreen: undefined;
  ImageDetail: { url: string };
  ImageModal: { url: string };
  WeatherApp: undefined;
  BarCodeScannerApp: undefined;
  Forecast: { days: number };
  ProductDetail: { product: Product }; // Using 'product' with the correct 'Product' type
};
