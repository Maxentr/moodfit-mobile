import React, { useEffect } from "react"
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Welcome from "../screens/not_registered/Welcome"
import BottomTabNavigation from "./bottomTabNavigation"
import CreateMood from "../screens/CreateMood"
import { useAuth } from "../hooks/useAuth"
import Loader from "../components/ui/Loader"
import NotLoggedIn from "../screens/not_registered/NotLoggedIn"
import Login from "../screens/not_registered/Login"
import Register from "../screens/not_registered/Register"
import Settings from "../screens/Settings"

const Stack = createNativeStackNavigator()

type Props = {
  navigation: NavigationProp<ParamListBase>
}

// If the user is logged in, redirect to the bottom tab navigation
const AuthRedirection = ({ navigation }: Props) => {
  const { checkAuth, connectedUser } = useAuth()

  useEffect(() => {
    checkAuth().then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: connectedUser ? "BottomTabNavigation" : "Welcome" }],
      })
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
          name="CreateMood"
          component={CreateMood}
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />

        <Stack.Screen
          name="NotLoggedIn"
          component={NotLoggedIn}
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
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
