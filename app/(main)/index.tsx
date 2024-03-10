import React from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function Main() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className="flex-1 items-center justify-center">
      <Text
          className={'text-primary'}
        onPress={toggleColorScheme}
      >
        {`The color scheme is ${colorScheme}`}
      </Text>
    </View>
  );
}
