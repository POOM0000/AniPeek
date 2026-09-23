import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../src/DetailScreen";
import CategoriesScreen from "../src/CategoriesScreen"


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />  
    </Stack.Navigator>
  );
};

export default StackNavigator;
