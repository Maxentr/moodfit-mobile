import React from "react"
import { TextInput, TextInputProps, View, Text } from "react-native"

interface Props extends TextInputProps {
  label?: string
  containerStyle?: string
}

const Input = ({ label, containerStyle, ...props }: Props) => {
  return (
    <View className="flex flex-col gap-2">
      {label && (
        <Text
          className={`font-NunitoSansSemiBold text-base text-gray-800 ${containerStyle}`}
        >
          {label}
        </Text>
      )}
      <TextInput
        className="h-12 px-3 bg-gray-50 border border-gray-300 rounded-xl text-NunitoSansSemiBold text-base text-gray-800"
        placeholderTextColor="#A1A1AA"
        {...props}
      />
    </View>
  )
}

export default Input
