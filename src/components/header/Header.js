import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <SafeAreaView>
      <Text style={styles.texto}>Planificador de Gastos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  texto: {
    textAlign: "center",
    fontSize: 40,
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingTop: 50
  },
});
