import { createStackNavigator } from "@react-navigation/stack";
import BarCodeScannerScreen from "./BarCodeScannerScreen";
import ProductDetailScreen from "./ProductDetailScreen";

export type StackParamList = {
  Scanner: undefined;
  ProductDetail: { url: string };
};

const Stack = createStackNavigator<StackParamList>();

const ScannerStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Scanner" component={BarCodeScannerScreen} />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={() => ({
        headerShown: true,
        title: "Product Detail",
      })}
    />
  </Stack.Navigator>
);

export default ScannerStack;
