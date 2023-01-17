import React from "react"
import { Pressable, Text, TouchableOpacity } from "react-native"

type Props = {
  onPress: () => void
  label?: string
  className?: string
}

const Button = ({ onPress, className, label = "Button" }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={
        "flex items-center justify-center h-16 w-full rounded-xl bg-indigo-500 " +
        className
      }
      onPress={onPress}
    >
      <Text className="font-NunitoSansBold text-white text-xl">{label}</Text>
    </TouchableOpacity>
  )
}

export default Button
