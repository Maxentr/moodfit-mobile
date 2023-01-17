import React from "react"
import { Keyboard, TouchableWithoutFeedback } from "react-native"

type Props = {
  children: React.ReactNode
}

const DismissKeyboard = ({ children }: Props) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default DismissKeyboard
