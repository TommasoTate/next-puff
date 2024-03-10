import { Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import 'global.css'

const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme('dark')
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={DARK_THEME}>
      <StatusBar style={'dark'} />
      <Stack>
        <Stack.Screen name="(main)" options={{ statusBarHidden: true }} />
      </Stack>
    </ThemeProvider>
  );
}
