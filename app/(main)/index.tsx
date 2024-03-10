import React from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function Main() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      <Text
        onPress={() =>
          setColorScheme(colorScheme === "light" ? "dark" : "light")
        }
      >
        {`The color scheme is ${colorScheme}`}
      </Text>
    </View>
  );
}
