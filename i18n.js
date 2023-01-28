import { locale } from "expo-localization"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import i18nResources from "./i18n/index"

i18n.use(initReactI18next).init({
  resources: i18nResources,
  lng: locale,
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
