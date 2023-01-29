import { API_URL } from "@env"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { format, sub } from "date-fns"
import { fr } from "date-fns/locale"
import React, { useEffect, useState } from "react"
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native"
import { LineChart, ProgressChart } from "react-native-chart-kit"
import { PlusIcon } from "react-native-heroicons/solid"
import { WithLocalSvg } from "react-native-svg"
import { useAuth } from "../hooks/useAuth"

type Props = NativeStackScreenProps<ParamListBase, "Dashboard">

const Dashboard = ({ navigation }: Props) => {
  const { connectedUser, authFetch } = useAuth()
  const [moods, setMoods] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMoods = async () => {
      const response = await authFetch(
        `${API_URL}/moods/user/${connectedUser?.id}?nb_per_page=7&page=1&sort_by=date&order_by=asc`,
        {
          method: "GET",
        },
      )
      if ("data" in response) {
        console.log(response.data)

        setMoods(response.data as any[])

        setMoods(response.data as any[])
      } else if ("error" in response) {
        console.error(response.error)
      }
      setLoading(false)
    }

    connectedUser && getMoods()
  }, [])

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
          <Text className="font-NunitoSansBold text-base text-gray-800 mb-4">
            Voici un récapitulatif de vos derniers jours
          </Text>
          {connectedUser && !loading ? (
            <LineChart
              style={{ left: -32 }}
              transparent
              data={{
                labels: moods.map((mood) =>
                  format(new Date(mood.date), "eee", { locale: fr }),
                ),

                datasets: [
                  {
                    data: moods.map((mood) => mood?.feeling),
                  },
                ],
              }}
              width={Dimensions.get("window").width}
              height={220}
              withDots={true}
              withInnerLines={false}
              withOuterLines={false}
              verticalLabelRotation={-25}
              xLabelsOffset={8}
              fromZero
              fromNumber={10}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                fillShadowGradientFrom: "#4346d1",
                fillShadowGradientTo: "#6366f1",
                decimalPlaces: 0,
                strokeWidth: 2,
                color: (opacity = 1) => `#6366f1`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

                propsForDots: {
                  r: "2",
                  strokeWidth: "2",
                  stroke: "#3366f1",
                },
              }}
              bezier
            />
          ) : connectedUser ? (
            <View className="flex-1 justify-center items-center">
              <Text className="font-NunitoSans text-base text-gray-800">
                Chargement...
              </Text>
            </View>
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="font-NunitoSans text-base text-gray-800">
                Connectez-vous pour voir vos statistiques !
              </Text>
            </View>
          )}
          <View className="mt-8">
            <Text className="font-NunitoSansBold text-base text-gray-800 mb-2.5">
              Le saviez-vous ?
            </Text>
            <Text className="font-NunitoSans text-sm text-gray-800 text-justify">
              Les mauvaises journées on souvent des{" "}
              <Text className="font-NunitoSansBold">points commun</Text>, il en
              va de même pour les bonnes !
            </Text>
            <Text className="mt-2 font-NunitoSans text-sm text-gray-800 text-justify">
              En notant alimentant votre journal, des mots clés apparaîtront ce
              qui pourra vous aider à comprendre ce qui vous rend heureux ou ce
              qui vous dérange.
            </Text>
          </View>
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
