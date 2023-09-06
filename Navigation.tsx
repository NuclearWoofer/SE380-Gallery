import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScannerStack from "./ScannerStack";
import FavoritesScreen from "./FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";

export type StackParamList = {
  ScannerTab: undefined;
  FavoritesTab: undefined;
};

const Tab = createBottomTabNavigator<StackParamList>();

const Navigation: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ScannerTab"
        component={ScannerStack}
        options={{
          headerShown: false,
          title: "Scanner",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "scan" : "scan-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
