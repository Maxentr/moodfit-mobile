import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Dashboard from "../screens/Dashboard"
import {
  NewspaperIcon,
  Squares2X2Icon,
  UserIcon,
} from "react-native-heroicons/solid"
import {
  Squares2X2Icon as Squares2X2OutlineIcon,
  NewspaperIcon as NewspaperOutlineIcon,
  UserIcon as UserOutlineIcon,
} from "react-native-heroicons/outline"
import { useAuth } from "../hooks/useAuth"
import Account from "../screens/Account"
import Learn from "../screens/Learn"

const Tab = createBottomTabNavigator()

type RouteIcon = {
  [k: string]: {
    icon: JSX.Element
    iconFocused: JSX.Element
  }
}

const BottomTabNavigation = () => {
  const { connectedUser } = useAuth()
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "white",
        },
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#6366f1",
        tabBarIcon: ({ focused, color, size }) => {
          // For each new route, add an object to the object below

          const routeIcon: RouteIcon = {
            Dashboard: {
              icon: <Squares2X2OutlineIcon size={size} color={color} />,
              iconFocused: <Squares2X2Icon size={size} color={color} />,
            },
            Learn: {
              icon: <NewspaperOutlineIcon size={size} color={color} />,
              iconFocused: <NewspaperIcon size={size} color={color} />,
            },
            Account: {
              icon: <UserOutlineIcon size={size} color={color} />,
              iconFocused: <UserIcon size={size} color={color} />,
            },
          }
          return routeIcon?.[route?.name]?.[focused ? "iconFocused" : "icon"]
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Learn"
        component={Learn}
        options={{
          title: "Comprendre",
          headerShown: false,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            connectedUser
              ? navigation.navigate("Learn")
              : navigation.navigate("NotLoggedIn")
          },
        })}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          title: "Mon compte",
          headerShown: false,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            connectedUser
              ? navigation.navigate("Account")
              : navigation.navigate("NotLoggedIn")
          },
        })}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation
