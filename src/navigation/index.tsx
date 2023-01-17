import React from "react"
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect } from "react"
import Loader from "../components/ui/Loader"
import Welcome from "../screens/not_registered/Welcome"
import BottomTabNavigation from "./bottomTabNavigation"

const Stack = createNativeStackNavigator()

type Props = {
  navigation: NavigationProp<ParamListBase>
}

const AuthRedirection = ({ navigation }: Props) => {
  const user = null
  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: user ? "BottomTabNavigation" : "Welcome" }],
    })
  }, [])
  return <Loader />
}

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthRedirection">
        {/* Auth route */}
        <Stack.Screen
          name="AuthRedirection"
          component={AuthRedirection}
          options={{ headerShown: false }}
        />

        {/* Bottom tab */}
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation
