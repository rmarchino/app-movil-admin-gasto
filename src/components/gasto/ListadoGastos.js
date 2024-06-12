import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Gasto from "./Gasto";

const ListadoGastos = ({ gastos, setModal, setGasto }) => {
  return (
    <View style={styles.contendor}>
      <Text style={styles.titulo}>Gastos</Text>
      {gastos.length === 0 ? (
        <Text style={styles.noGastos}>No hay gastos</Text>
      ) : (
        gastos.map((gasto) => (
          <Gasto
            key={gasto.id}
            gasto={gasto}
            setModal={setModal}
            setGasto={setGasto}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contendor: {
    marginTop: 70,
    marginBottom: 100,
  },
  titulo: {
    color: "#64748b",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 20,
  },
  noGastos: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
});

export default ListadoGastos;
