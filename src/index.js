import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from "react-native";

import Header from "./components/header/Header";
import NuevoPresupuesto from "./components/presupuesto/NuevoPresupuesto";
import ControlPresupuesto from "./components/presupuesto/ControlPresupuesto";
import FormularioGasto from "./components/gasto/FormularioGasto";
import { generarID } from "./helpers";
import ListadoGastos from "./components/gasto/ListadoGastos";
import Filtro from "./components/gasto/Filtro";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPrespuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    const almacenarAS = async () => {
      await AsyncStorage.setItem('prueba_as', nombre)
    }
  },[])

  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert("Error", "El presupuesto no puede ser 0 o menos", [
        { text: "OK" },
      ]);
    }
  };

  const handleGasto = (gasto) => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes("")) {
      Alert.alert("Error", "Todos los campos son obligatorios", [
        { text: "OK" },
      ]);
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
    } else {
      //Añadir el nuevo gasto al state
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setModal(!modal);
  };

  const eliminarGasto = (id) => {
    Alert.alert(
      "¿Desea eliminar este gasto?",
      "Un Gasto eliminado no se puede recuperar",
      [
        { text: "No", style: "cancel" },
        {
          text: "Si Eliminar",
          onPress: () => {
            const gastosActualizados = gastos.filter(
              (gastoState) => gastoState.id !== id
            );
            setGastos(gastosActualizados);
            setModal(!modal);
            setGasto({});
          },
        },
      ]
    );
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} />
          ) : (
            <NuevoPresupuesto
              handleNuevoPresupuesto={handleNuevoPresupuesto}
              presupuesto={presupuesto}
              setPrespuesto={setPrespuesto}
            />
          )}
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />
            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>

      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}
        >
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable style={styles.presable} onPress={() => setModal(!modal)}>
          <Image
            style={styles.imagen}
            source={require("./images/nuevo-gasto.png")}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3b82F6",
    minHeight: 400,
  },
  contenedor: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  presable: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 40,
    right: 30,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});
