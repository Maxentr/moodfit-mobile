import React from "react"
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from "react-native"

const Loader = () => (
  <SafeAreaView style={styles.SafeAreaViewStyle}>
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  SafeAreaViewStyle: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
})

export default Loader
