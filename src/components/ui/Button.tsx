import React from "react"
import { Pressable, Text } from "react-native"

type Props = {
  onPress: () => void
  label?: string
  className?: string
}

const Button = ({ onPress, className, label = "Button" }: Props) => {
  return (
    <Pressable
      className={
        "flex items-center justify-center h-16 w-full rounded-xl bg-indigo-500 " +
        className
      }
      onPress={onPress}
    >
      <Text className="font-NunitoSansBold text-white text-xl">{label}</Text>
    </Pressable>
  )
}

export default Button
