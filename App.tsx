import React, { useCallback } from "react"
import * as SplashScreen from "expo-splash-screen"
import StackNavigation from "./src/navigation"
import { View } from "react-native"
import { useFonts } from "expo-font"

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    "NunitoSans-ExtraBold": require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
    "NunitoSans-Black": require("./assets/fonts/NunitoSans-Black.ttf"),
    "NunitoSans-Bold": require("./assets/fonts/NunitoSans-Bold.ttf"),
    "NunitoSans-SemiBold": require("./assets/fonts/NunitoSans-SemiBold.ttf"),
    "NunitoSans-Regular": require("./assets/fonts/NunitoSans-Regular.ttf"),
    "NunitoSans-Light": require("./assets/fonts/NunitoSans-Light.ttf"),
    "NunitoSans-ExtraLight": require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
    
    // "NunitoSans-ExtraBoldItalic": require("./assets/fonts/NunitoSans-ExtraBoldItalic.ttf"),
    // "NunitoSans-BlackItalic": require("./assets/fonts/NunitoSans-BlackItalic.ttf"),
    // "NunitoSans-BoldItalic": require("./assets/fonts/NunitoSans-BoldItalic.ttf"),
    // "NunitoSans-SemiBoldItalic": require("./assets/fonts/NunitoSans-SemiBoldItalic.ttf"),
    // "NunitoSans-Italic": require("./assets/fonts/NunitoSans-Italic.ttf"),
    // "NunitoSans-LightItalic": require("./assets/fonts/NunitoSans-LightItalic.ttf"),
    // "NunitoSans-ExtraLightItalic": require("./assets/fonts/NunitoSans-ExtraLightItalic.ttf"),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  // To change the SlashScreen (the initial loader) : https://docs.expo.dev/tutorial/configuration/

  return (
    <View className="flex-1 bg-transparent" onLayout={onLayoutRootView}>
      <StackNavigation />
    </View>
  )
}
