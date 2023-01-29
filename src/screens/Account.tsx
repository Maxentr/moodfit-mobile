import { API_URL } from "@env"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import React, { useEffect, useState } from "react"
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  FlatList,
  ActivityIndicator,
  Image,
  RefreshControl,
} from "react-native"
import { Cog8ToothIcon } from "react-native-heroicons/outline"
import { PencilIcon } from "react-native-heroicons/solid"
import { useAuth } from "../hooks/useAuth"

type Props = NativeStackScreenProps<ParamListBase, "Account">

const Account = ({ navigation }: Props) => {
  const { connectedUser, authFetch } = useAuth()

  const [moods, setMoods] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [endReached, setEndReached] = useState(false)

  const getMoods = async () => {
    setLoading(true)

    const response = await authFetch(
      `${API_URL}/moods/user/${connectedUser?.id}?nb_per_page=10&page=${page}&sort_by=date&order_by=desc`,
      {
        method: "GET",
      },
    )
    if ("data" in response) {
      if ((response.data as any[]).length === 0) setEndReached(true)
      else setMoods([...moods, ...(response.data as any[])])
    } else if ("error" in response) {
      console.error(response.error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getMoods()
  }, [page])

  useEffect(() => {
    getMoods()
  }, [])

  const onRefresh = () => {
    setEndReached(false)
    setPage(1)
    if (page !== 1) setMoods([])
  }

  const onEndReached = () => !loading && !endReached && setPage(page + 1)

  const getMoodRate = (rate: number) => {
    const moodRate = {
      1: "😩",
      2: "😣",
      3: "☹️",
      4: "😕",
      5: "🙁",
      6: "😐",
      7: "🙂",
      8: "😀",
      9: "😃",
      10: "😄",
    } as { [key: number]: string }
    return `${rate}/10 ${moodRate[rate]}`
  }

  const ListItem = ({ item }: { item: any }) => (
    <View className="flex flex-col px-6 py-5">
      <View className="flex flex-row justify-between">
        <Text className="font-NunitoSansSemiBold text-base text-gray-800">
          {format(new Date(item.date), "eeee dd MMMM yyyy", {
            locale: fr,
          })}
        </Text>
        <Text className="font-NunitoSans text-xs text-gray-800">
          {getMoodRate(item.feeling)}
        </Text>
      </View>
      <Text
        className="font-NunitoSans text-sm text-gray-800 text-ellipsis"
        numberOfLines={4}
      >
        {item.comment}
      </Text>
    </View>
  )

  const ListEmpty = () => (
    <View className="flex-1 items-center justify-center">
      <Text className="font-NunitoSans text-base text-gray-800">
        Aucune note
      </Text>
    </View>
  )

  const ListerFooter = () => (
    <View className="flex-1 items-center justify-center">
      {loading && <ActivityIndicator size="small" color="#6366f1" />}
      {endReached && (
        <>
          <View className="h-[1px] w-full bg-gray-200" />
          <Text className="px-6 py-5 font-NunitoSans text-base text-gray-800">
            Vous avez atteint la fin de vos notes ! 🎉
          </Text>
        </>
      )}
    </View>
  )

  const ItemSparator = () => <View className="h-[1px] bg-gray-200" />

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 flex flex-row justify-between">
        <Text className="text-gray-800 font-NunitoSansBold text-xl">
          Mon profil
        </Text>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <Cog8ToothIcon className="w-6 h-6 fill-indigo-500" color="#6366f1" />
        </Pressable>
      </View>
      <View className="mt-6 mx-auto">
        <View className="w-[142px] h-[142px] rounded-full border-2 border-indigo-500 p-1.5">
          {/* <View className="w-full h-full rounded-full bg-gray-200" /> */}
          <Image
            className="w-full h-full rounded-full"
            // source={connectedUser?.avatar}
            source={require("../../assets/profilPicture.jpg")}
          />
        </View>
        <View className="mt-2.5 flex flex-row items-center justify-center">
          <Text className="font-NunitoSansBold text-2xl text-indigo-600 left-3">
            {connectedUser?.name}
            <View className="pl-2 pb-1">
              <PencilIcon
                className="fill-indigo-500"
                size={18}
                fill="#6366f1"
              />
            </View>
          </Text>
        </View>
      </View>
      <View className="mt-8 w-full flex-1 mb-4">
        <Text className="px-6 font-NunitoSansBold text-lg text-indigo-600 pb-2.5">
          Vos dernières notes
        </Text>
        <View className="h-[1px] bg-indigo-500 mx-6" />
        <FlatList
          data={moods}
          keyExtractor={(item, index) => item + index}
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={ListerFooter}
          renderItem={({ item }) => <ListItem item={item} />}
          ItemSeparatorComponent={ItemSparator}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              size={1}
              colors={["#6366f1"]}
              onRefresh={onRefresh}
            />
          }
          onEndReachedThreshold={0.2}
          onEndReached={onEndReached}
        />
      </View>
    </SafeAreaView>
  )
}

export default Account
