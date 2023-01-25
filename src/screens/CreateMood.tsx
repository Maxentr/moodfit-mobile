import { Slider } from "@miblanchard/react-native-slider"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native"
import { XMarkIcon } from "react-native-heroicons/solid"
import Button from "../components/ui/Button"
import DismissKeyboard from "../components/ui/DismissKeyboard"
import { useAuth } from "../hooks/useAuth"

type Props = NativeStackScreenProps<ParamListBase, "CreateMood">

const CreateMood = ({ navigation }: Props) => {
  const { connectedUser } = useAuth()
  const [moodValue, setMood] = React.useState(5)
  const [comment, setComment] = React.useState("")

  const handleCreation = () => {
    if (!connectedUser)
      navigation.reset({
        index: 1,
        routes: [{ name: "BottomTabNavigation" }, { name: "NotLoggedIn" }],
      })
    else {
    }
  }

  return (
    <DismissKeyboard>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-between px-6 pt-4">
          <View className="flex-1">
            <View className="flex flex-row justify-between items-center">
              <Text className="font-NunitoSansBold text-xl text-gray-800">
                Nouveau mood
              </Text>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
              >
                <XMarkIcon fill="#1F2937" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text className="font-NunitoSans text-base text-gray-800 mt-16 mb-2">
                Comment vous sentez-vous ?
              </Text>
              <Slider
                value={moodValue}
                onValueChange={(value) => setMood(+value)}
                step={1}
                animationType="spring"
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#6366F1" // indigo-500
                maximumTrackTintColor="#E4E4E7" // gray-200
                thumbTintColor="#6366F1" // indigo-500
                renderAboveThumbComponent={() => (
                  <Text className="font-NunitoSans text-sm text-indigo-500 text-center w-5 -mb-2">
                    {moodValue}
                  </Text>
                )}
              />
              <View className="flex flex-row justify-between items-center">
                <Text className="text-2xl">☹️</Text>
                <Text className="text-2xl">😐</Text>
                <Text className="text-2xl">😄</Text>
              </View>
              <Text className="font-NunitoSans text-base text-gray-800 mt-8 mb-1">
                Décrivez votre mood
              </Text>
              <TextInput
                value={comment}
                onChangeText={setComment}
                className="font-NunitoSans text-base border border-gray-300 bg-gray-50 rounded-xl p-2 h-60"
                placeholder="Aujourd'hui, je me sens bien car..."
                placeholderTextColor="#A1A1AA"
                multiline
                autoComplete="off"
              />
            </View>
          </View>
          <Button onPress={handleCreation} label="Valider" />
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default CreateMood
