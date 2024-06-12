import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import globalStyles from "../../styles/style";

export default function FormularioGasto({ setModal, handleGasto, setGasto}) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");

  return (
    <SafeAreaView style={styles.contenedor}>
      <View>
        <Pressable
          onLongPress={() => {
            setModal(false)
            setGasto({})
          }}
          style={styles.btnCancelar}
        >
          <Text style={styles.btnCancelarTexto}>Cancelar</Text>
        </Pressable>
      </View>

      <View style={styles.formulario}>
        <Text style={styles.titulo}>Nuevo Gasto</Text>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del gasto. Ej. Comida"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad del gasto. Ej. 300"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Categoría Gastos</Text>
          <Picker
            selectedValue={categoria}
            onValueChange={(valor) => {
              setCategoria(valor);
            }}
            style={styles.input}
          >
            <Picker.Item label="-- Seleccione --" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Salud" value="salud" />
            <Picker.Item label="Gastos Varios" value="gastos" />
            <Picker.Item label="Suscripciones" value="suscripciones" />
            <Picker.Item label="Ocio" value="ocio" />
          </Picker>
        </View>
        <Pressable
          style={styles.submitBtn}
          onPress={() => handleGasto({ nombre, cantidad, categoria })}
        >
          <Text style={styles.submitBtnTexto}>Agregar Gasto</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#1E48AF",
    flex: 1,
  },
  btnCancelar: {
    backgroundColor: "#DB2777",
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
  },
  btnCancelarTexto: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#FFF",
  },
  formulario: {
    ...globalStyles.contenedor,
  },
  titulo: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 30,
    color: "#64748B",
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: "#64748B",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: "#3B82F6",
    padding: 10,
    marginTop: 20,
  },
  submitBtnTexto: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
