import React, { createContext, useContext, useEffect, useState } from "react"
import Loader from "../components/ui/Loader"
import AsyncStorage from "@react-native-async-storage/async-storage"

export type PREFERENCES_LANGUAGES = "en" | "fr"

type Preferences = {
  language: PREFERENCES_LANGUAGES
  theme: "light" | "dark"
}
const DEFAULT_PREFERENCES: Preferences = {
  language: "en",
  theme: "light",
}

type PreferencesContextInterface = {
  preferences: Preferences
  updatePreferences: <T extends keyof Preferences>(
    key: T,
    value: Preferences[T],
  ) => void
}
const PreferencesContext = createContext({} as PreferencesContextInterface)

const PreferencesProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferences, setPreferences] =
    useState<Preferences>(DEFAULT_PREFERENCES)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPreferences().then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    console.log(preferences)
  }, [preferences])

  const getPreferences = async () => {
    const preferences = await AsyncStorage.getItem("preferences")

    if (preferences) setPreferences(JSON.parse(preferences))
    else {
      await AsyncStorage.setItem(
        "preferences",
        JSON.stringify(DEFAULT_PREFERENCES),
      )
      setPreferences(DEFAULT_PREFERENCES)
    }
  }

  const updatePreferences = <T extends keyof Preferences>(
    key: T,
    value: Preferences[T],
  ) => {
    setPreferences({
      ...preferences,
      [key]: value,
    })
    
    AsyncStorage.setItem(
      "preferences",
      JSON.stringify({
        ...preferences,
        [key]: value,
      }),
    )
  }

  if (isLoading) return <Loader />

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export const usePreferences = () => useContext(PreferencesContext)
export default PreferencesProvider
