import React from "react"
import { Text, View, SafeAreaView } from "react-native"
import { WithLocalSvg } from "react-native-svg"
import {
  BanknotesIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "react-native-heroicons/solid"
import Button from "../../components/ui/Button"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ParamListBase } from "@react-navigation/native"

const cards = [
  {
    icon: <BanknotesIcon fill="#6366f1" size={32} />,
    title: "100% gratuits",
    description:
      "Vous aidez à vous sentir mieux, sans devoir payer c'est notre volonté.",
  },
  {
    icon: <SparklesIcon fill="#6366f1" size={32} />,
    title: "Aucun vente de vos données",
    description: "Vous n'êtes pas à vendre, nous non plus.",
  },
  {
    icon: <ShieldCheckIcon fill="#6366f1" size={32} />,
    title: "Vos données sont protégées",
    description:
      "Seul vous pouvez y accèder grâce à un chiffrement de bout en bout.",
  },
]

type Props = NativeStackScreenProps<ParamListBase, "Welcome">

const Welcome = ({ navigation }: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-4 justify-between">
        <View>
          <WithLocalSvg
            asset={require("../../../assets/svg/icon.svg")}
            className="w-32 h-32"
          />
          <Text className="font-NunitoSansBold text-2xl text-gray-800 mt-4">
            Nos valeurs chez MoodFit
          </Text>
          <View className="mt-8 px-8">
            <View className="gap-6">
              {cards.map((card, index) => (
                <View
                  key={JSON.stringify(card) + index}
                  className="flex flex-col items-center justify-start"
                >
                  {card.icon}
                  <View className="flex flex-col gap-2">
                    <Text className="font-NunitoSansBold text-xl text-center text-gray-800">
                      {card.title}
                    </Text>
                    <Text className="font-NunitoSans text-center text-gray-800">
                      {card.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
        <Button
          onPress={() =>
            navigation.navigate("BottomTabNavigation", { screen: "Home" })
          }
          label="J'ai compris"
        />
      </View>
    </SafeAreaView>
  )
}

export default Welcome
