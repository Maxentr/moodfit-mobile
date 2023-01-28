import { ParamListBase } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native"
import {
  ArrowLeftOnRectangleIcon,
  ChevronRightIcon,
  LanguageIcon,
  SunIcon,
  XMarkIcon,
} from "react-native-heroicons/solid"
import { useAuth } from "../hooks/useAuth"

type Props = NativeStackScreenProps<ParamListBase, "Settings">

const Settings = ({ navigation }: Props) => {
  const { logout } = useAuth()
  
  const actions = [
    {
      title: "Langues",
      icon: <LanguageIcon className="w-6 h-6 fill-gray-700" color="#374151" />,
      action: () => navigation.navigate("LanguagePreference"),
    },
    {
      title: "Affichage",
      icon: <SunIcon className="w-6 h-6 fill-gray-700" color="#374151" />,
      action: () => navigation.navigate("DisplayPreferences"),
    },
    {
      title: "Me déconnecter",
      icon: (
        <ArrowLeftOnRectangleIcon
          className="w-6 h-6 fill-gray-700"
          color="#374151"
        />
      ),
      action: () => {
        logout()
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      },
      options: {
        showArrow: false,
      },
    },
  ]

  const confirmAccountDeletion = () => {
    Alert.alert(
      "Supprimer mon compte",
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      [
        {
          text: "Annuler",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: deleteAccount,
        },
      ],
    )
  }

  const deleteAccount = () => {}

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-between">
        <View>
          <View className="flex flex-row justify-between">
            <Text className="text-gray-800 font-NunitoSansBold text-xl">
              Paramètres
            </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <XMarkIcon className="w-6 h-6 fill-gray-800" color="#1f2937" />
            </Pressable>
          </View>
          <View className="mt-12">
            <FlatList
              data={actions}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <Pressable
                  onPress={item.action}
                  className="flex flex-row items-center justify-between py-4"
                >
                  <View className="flex flex-row items-center">
                    {item.icon}
                    <Text className="ml-2 font-NunitoSansBold text-base text-gray-800">
                      {item.title}
                    </Text>
                  </View>
                  {item.options?.showArrow !== false && (
                    <ChevronRightIcon
                      className="w-6 h-6 fill-gray-700"
                      color="#374151"
                    />
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>

        <Pressable
          onPress={confirmAccountDeletion}
          className="h-8 flex items-center justify-center"
        >
          <Text className="font-NunitoSansBold text-base text-red-600">
            Supprimer mon compte
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Settings
