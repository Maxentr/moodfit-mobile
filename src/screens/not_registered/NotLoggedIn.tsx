import React from "react"
import { Text, View, SafeAreaView, Pressable } from "react-native"
import { WithLocalSvg } from "react-native-svg"
import {
  AcademicCapIcon,
  BanknotesIcon,
  CloudArrowUpIcon,
  LightBulbIcon,
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
    icon: <CloudArrowUpIcon fill="#6366f1" size={32} />,
    title: "Vos données sur le cloud",
    description: "Disponible n’importe quand et où vous voulez.",
  },
  {
    icon: <AcademicCapIcon fill="#6366f1" size={32} />,
    title: "Notre IA vous aide",
    description: "Une IA pour apprendre à se connaitre.",
  },
]

type Props = NativeStackScreenProps<ParamListBase, "NotLoggedIn">

const NotLoggedIn = ({ navigation }: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-4 justify-between">
        <View>
          <WithLocalSvg
            asset={require("../../../assets/svg/icon.svg")}
            className="w-32 h-32"
          />
          <Text className="font-NunitoSansBold text-2xl text-center text-gray-800 mt-8">
            Pourquoi s'inscrire ?
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
        <View className="flex flex-col">
          <Button
            onPress={() =>
              navigation.reset({
                index: 1,
                routes: [{ name: "BottomTabNavigation" }, { name: "Register" }],
              })
            }
            label="Je m'inscris"
          />
          <Pressable
            onPress={() => navigation.goBack()}
            className="mt-4 h-8 flex items-center justify-center"
          >
            <Text className="font-NunitoSansBold text-xl text-indigo-500">
              Plus tard
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NotLoggedIn
