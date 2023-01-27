import React, { useReducer } from "react"
import { Text, View, SafeAreaView, Pressable } from "react-native"
import { WithLocalSvg } from "react-native-svg"
import Button from "../../components/ui/Button"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ParamListBase } from "@react-navigation/native"
import Input from "../../components/ui/Input"
import { CustomReducer } from "../../utils/CustomReducer"
import DismissKeyboard from "../../components/ui/DismissKeyboard"
import { API_URL } from "@env"
import { useAuth } from "../../hooks/useAuth"
import { useToast } from "react-native-toast-notifications"

type Props = NativeStackScreenProps<ParamListBase, "Login">

type Form = {
  email: string
  password: string
}

const Login = ({ navigation }: Props) => {
  const { login } = useAuth()
  const toast = useToast()
  const [form, dispatch] = useReducer(CustomReducer<Form>, {
    email: "",
    password: "",
  })

  const handleLogin = async () => {
    try {
      if (!form.email || !form.password) return
      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const { accessToken, refreshToken } = await loginResponse.json()

      await login(accessToken, refreshToken)

      navigation.navigate("BottomTabNavigation", { screen: "Home" })
    } catch (error) {
      if (error === "[SyntaxError: JSON Parse error: Unrecognized token '<']") {
        console.error("Bad url or server is down. Please check your .env file and the url you are trying to fetch.")
        toast.show("Erreur de connexion au serveur", {
          type: "danger",
          placement: "top",
          duration: 3000,
        })
      } else {
        console.error(error)
        toast.show("Mot de passe ou email incorrect", {
          type: "danger",
          placement: "top",
          duration: 3000,
        })
      }
    }
  }

  return (
    <DismissKeyboard>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6 pt-4 justify-between">
          <View>
            <WithLocalSvg
              asset={require("../../../assets/svg/icon.svg")}
              className="w-32 h-32"
            />
            <Text className="font-NunitoSansBold text-2xl text-gray-800 mt-8">
              Se connecter
            </Text>
            <View className="mt-12">
              <Input
                label="Email"
                keyboardType="email-address"
                placeholder="Entrer votre email"
                value={form.email}
                onChangeText={(text) =>
                  dispatch({
                    type: "CHANGE_INPUT",
                    payload: {
                      accessor: "email",
                      value: text,
                    },
                  })
                }
              />
              <View className="h-6" />
              <Input
                label="Mot de passe"
                secureTextEntry
                placeholder="Mot de passe"
                value={form.password}
                onChangeText={(text) =>
                  dispatch({
                    type: "CHANGE_INPUT",
                    payload: {
                      accessor: "password",
                      value: text,
                    },
                  })
                }
              />
              <Text className="font-NunitoSansSemiBold text-base text-indigo-500 mt-2">
                Mot de passe oublié ?
              </Text>
            </View>
          </View>
          <View className="flex flex-col">
            <Button onPress={handleLogin} label="Se connecter" />
            <View className="h-8 flex flex-row items-center justify-center mt-4">
              <Text className="font-NunitoSansSemiBold text-base text-gray-800">
                Pas de compte ?{` `}
              </Text>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text className="font-NunitoSansSemiBold text-base text-indigo-500">
                  S'inscrire
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

export default Login
