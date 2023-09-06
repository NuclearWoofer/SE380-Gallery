import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'
import Navigation  from './Navigation';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Navigation"
        screenOptions={{ headerShown: false, drawerPosition: "right" }}
      >
        <Drawer.Screen 
          name="Navigation" 
          component={Navigation} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}