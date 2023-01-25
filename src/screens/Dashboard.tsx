import { ParamListBase } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useEffect } from "react"
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native"
import { PlusIcon } from "react-native-heroicons/solid"
import { WithLocalSvg } from "react-native-svg"
import { useAuth } from "../hooks/useAuth"

type Props = NativeStackScreenProps<ParamListBase, "Dashboard">

const Dashboard = ({ navigation }: Props) => {
  const { connectedUser } = useAuth()

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-4">
        <WithLocalSvg
          asset={require("../../assets/svg/icon.svg")}
          className="w-32 h-32"
        />
        <View className="mt-4">
          <Text className="font-NunitoSansBold text-xl text-gray-800">
            {connectedUser
              ? `Bonjour ${connectedUser.name} 👋,`
              : "Bonjour invité 👋"}
          </Text>
          {connectedUser && (
            <Text className="font-NunitoSansBold text-xl text-gray-800">
              Content de vous revoir !
            </Text>
          )}
        </View>
        <View className="mt-4">
          <WithLocalSvg asset={require("../../assets/svg/visual.svg")} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateMood")}
        activeOpacity={0.8}
        className="absolute bottom-4 right-4 w-16 h-16 flex justify-center items-center bg-indigo-500 rounded-full"
      >
        <PlusIcon fill="white" size={32} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Dashboard
