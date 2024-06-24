import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import globalStyles from "../../styles/style";
import { formatearCantidad } from "../../helpers";
import CircularProgress from "react-native-circular-progress-indicator";

export default function ControlPresupuesto({ presupuesto, gastos }) {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;
    const nuevoPorcentaje = ( ((presupuesto - totalDisponible) / presupuesto) * 100 );

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000)
    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={porcentaje}
          duration={1000}
          radius={150}
          valueSuffix={"%"}
          title="Porcentaje Gastado"
          inActiveStrokeColor="#f5f5f5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3b82f6"
          activeStrokeWidth={20}
          titleStyle={{ fontWeight: "bold", fontSize: 20 }}
          titleColor="#64748B"
        />
      </View>
      <View style={styles.contenedorTexto}>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: {""}</Text>
          {formatearCantidad(presupuesto)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: {""}</Text>
          {formatearCantidad(disponible)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: {""}</Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: "center",
  },
  imagen: {
    width: 250,
    height: 250,
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "700",
    color: "#3B82F6",
  },
});
