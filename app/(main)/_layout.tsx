import { Slot } from "expo-router";
import { Text, View } from "react-native";
import React from "react";
import {useColorScheme} from '~/lib/useColorScheme'
import {cn} from '~/lib/utils'

export default function HomeLayout() {
    const { isDarkColorScheme} = useColorScheme()
  return (
    <View className={cn('flex-1 items-center justify-center ', {'dark': isDarkColorScheme})}>
      <Text className={'text-primary'}>Home</Text>
      <Slot />
    </View>
  );
}
