import { normalizeCssSelector } from "nativewind/dist/utils/selector"
import React from "react"
import { Dimensions, SafeAreaView, Text, View } from "react-native"
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "react-native-heroicons/solid"
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast"
const width = Dimensions.get("window").width

const Toast = (options: ToastProps) => {
  const iconType = {
    success: <CheckCircleIcon className="fill-green-500" fill="#22c55e" />,
    danger: <XCircleIcon className="fill-red-500" fill="#ef4444" />,
    info: <InformationCircleIcon className="fill-blue-500" fill="#3b82f6" />,
    warning: (
      <ExclamationTriangleIcon className="fill-yellow-500" fill="#eab308" />
    ),
  }

  return (
    <>
      <SafeAreaView />
      <View
        className="bg-white rounded-md px-4 py-2 shadow flex flex-row items-center border border-gray-100"
        style={{
          maxWidth: width - 64,
        }}
      >
        {iconType[(options.type || "info") as keyof typeof iconType]}
        <Text className="ml-1 text-gray-800 font-NunitoSansSemiBold">{options.message}</Text>
      </View>
    </>
  )
}

export default Toast
