import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../navigations/screens/stacks/Home';
import FallDetection from '../navigations/screens/FallDetection';
import StepCounter from '../navigations/screens/StepCounter';
import HomeTab from '../navigations/screens/HomeTab';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="  " component={Home} />
      </Stack.Navigator>
    );
  }

  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="home" component={HomeTab} />
        <Tab.Screen name="StepCounter" component={StepCounter} />
        <Tab.Screen name="FallDetection" component={FallDetection} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        // Select an icon name based on the route name
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Step Counter') {
          iconName = focused ? 'walk' : 'walk-outline';
        } else if (route.name === 'Fall Detection') {
          iconName = focused ? 'alert-circle' : 'alert-circle-outline';
        }

        // Return an Icon component
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Step Counter" component={StepCounter} />
    <Tab.Screen name="Fall Detection" component={FallDetection} />
  </Tab.Navigator>
</NavigationContainer>
  );
}
