import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import globalStyles from "../../styles/style";

export default function NuevoPresupuesto({
  handleNuevoPresupuesto,
  presupuesto,
  setPrespuesto,
}) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>

      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto: Ej. 300"
        style={styles.input}
        value={presupuesto.toString()}
        onChangeText={setPrespuesto}
      />

      <Pressable
        style={styles.boton}
        onPress={() => handleNuevoPresupuesto(presupuesto)}
      >
        <Text style={styles.botonTexto}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },

  label: {
    textAlign: "center",
    fontSize: 24,
    color: "#3b82f6",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 30,
  },
  boton: {
    marginTop: 30,
    backgroundColor: "#1048A4",
    padding: 10,
    borderRadius: 10,
  },
  botonTexto: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
