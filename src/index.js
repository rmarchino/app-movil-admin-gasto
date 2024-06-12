import React, { useState } from "react";
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

export default function App() {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPrespuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});

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
    if (Object.values(gasto).includes("")) {
      Alert.alert("Error", "Todos los campos son obligatorios", [
        { text: "OK" },
      ]);
      return;
    }
    //Añadir el nuevo gasto al state
    gasto.id = generarID();
    gasto.fecha = Date.now();

    setGastos([...gastos, gasto]);
    setModal(!modal);
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
          <ListadoGastos
            gastos={gastos}
            setModal={setModal}
            setGasto={setGasto}
          />
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
            setGasto={setGasto}
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable onPress={() => setModal(!modal)}>
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
  imagen: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 40,
    right: 30,
  },
});
