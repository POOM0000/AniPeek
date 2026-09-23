import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SHome from './Stack-Home';
import Categories from './Stack-Categories';
import Favorite from '../src/FavoriteScreen';
import Profile from '../src/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Categories') {
            iconName = 'list';
          } else if (route.name === 'Favorite') {
            iconName = 'star';
          } else if (route.name === 'Profile') {
            iconName = 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={SHome} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
