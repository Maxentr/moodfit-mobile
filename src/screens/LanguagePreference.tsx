import { ParamListBase } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useState } from "react"
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native"
import { ArrowLeftIcon, CheckCircleIcon } from "react-native-heroicons/solid"
import { LANGUAGES_PREFERENCE, usePreferences } from "../hooks/usePreferences"

type Props = NativeStackScreenProps<ParamListBase, "LanguagePreference">

const languages: { name: string; value: LANGUAGES_PREFERENCE }[] = [
  {
    name: "Langue du système",
    value: "system",
  },
  {
    name: "Français",
    value: "fr",
  },
  {
    name: "English",
    value: "en",
  },
]

const LanguagePreference = ({ navigation }: Props) => {
  const { preferences, updatePreferences } = usePreferences()

  const [selectedLanguage, setSelectedLanguage] =
    useState<LANGUAGES_PREFERENCE>(preferences.language)

  const onLeaving = () => {
    updatePreferences("language", selectedLanguage)
    navigation.goBack()
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-between">
        <View>
          <View className="flex flex-row mt-2">
            <Pressable onPress={onLeaving} className="mr-3">
              <ArrowLeftIcon
                className="w-6 h-6 fill-gray-800"
                color="#1f2937"
              />
            </Pressable>
            <Text className="text-gray-800 font-NunitoSansBold text-xl">
              Changer la langue
            </Text>
          </View>
          <View className="mt-8">
            <FlatList
              data={languages}
              keyExtractor={(item, index) => JSON.stringify(item) + index}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setSelectedLanguage(item.value)}
                  className="flex flex-row items-center justify-between py-4"
                >
                  <Text className="text-gray-700 text-base font-NunitoSansSemiBold">
                    {item.name}
                  </Text>
                  {item.value === selectedLanguage && (
                    <CheckCircleIcon
                      className="w-6 h-6 fill-indigo-500"
                      fill="#6366f1"
                    />
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LanguagePreference
