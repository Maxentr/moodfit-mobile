import { ParamListBase } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native"
import { WithLocalSvg } from "react-native-svg"
type Props = NativeStackScreenProps<ParamListBase, "Account">

const Account = ({ navigation }: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-4">
        <WithLocalSvg
          asset={require("../../assets/svg/icon.svg")}
          className="w-32 h-32"
        />
      </View>
    </SafeAreaView>
  )
}

export default Account
