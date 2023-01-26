import { ParamListBase } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { Text, View, SafeAreaView, Pressable } from "react-native"
import { Cog8ToothIcon } from "react-native-heroicons/outline"

type Props = NativeStackScreenProps<ParamListBase, "Account">

const Account = ({ navigation }: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <View className="flex flex-row justify-between">
          <Text className="text-gray-800 font-NunitoSansBold text-xl">
            Mon profil
          </Text>
          <Pressable onPress={() => navigation.navigate("Settings")}>
            <Cog8ToothIcon
              className="w-6 h-6 fill-indigo-500"
              color="#6366f1"
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Account
