import { Slot } from "expo-router";
import { Text, View } from "react-native";
import React from "react";

export default function HomeLayout() {
  console.log("HomeLayout");
  return (
    <View style={{ minHeight: "100px" }}>
      <Text>Home</Text>
      <Slot />
    </View>
  );
}
