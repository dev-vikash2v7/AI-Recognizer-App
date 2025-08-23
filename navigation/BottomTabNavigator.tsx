import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import EthnicityRecognitionScreen from "../screens/EthnicityRecognitionScreen";
import DetectObjectsScreen from "../screens/DetectObjectsScreen";
import DetectFoodsScreen from "../screens/DetectFoodsScreen";
import TextToImageScreen from "../screens/TextToImage";

import {
  BottomTabParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      // tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      
      <BottomTab.Screen
        name="Detect Any Object or Person"
        component={DetectObjectsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="crop" color={color} />
          ),
          tabBarLabel: "Detect Objects",
        }}
      />


<BottomTab.Screen
  name="Text To Image Generation"
  component={TextToImageScreen}
  options={{
    tabBarIcon: ({ color }) => (
      <TabBarIcon name="images-sharp" color={color} />
    ),
    tabBarLabel: "Text to Image",
  }}
/>
  <BottomTab.Screen
    name="Detect Food Items"
    component={DetectFoodsScreen}
    options={{
      tabBarIcon: ({ color }) => (
        <TabBarIcon name="pizza" color={color} />
      ),
      tabBarLabel: "Detect Foods",
    }}
  />
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="code" color={color} />
            ),
            tabBarLabel: "Intro",
          }}
        />

      <BottomTab.Screen
        name="Ethnicity Recognition"
        component={EthnicityRecognitionScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-circle" color={color} />
          ),
          tabBarLabel: "Ethnicity Recognition",
        }}
      />



    </BottomTab.Navigator>
  );
}


function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
