import React, { useEffect, useRef, useState } from "react";
import MapView, {
  AnimatedRegion,
  LatLng,
  MapEvent,
  Marker,
  MarkerAnimated,
  Region,
} from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Platform,
  Image,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

const INITIAL_LAT = 13.7;
const INITIAL_LNG = 100.5;

export default function RandomRestaurantsScreen() {
  const [region, setRegion] = useState<Region>({
    latitude: INITIAL_LAT,
    longitude: INITIAL_LNG,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [pinCoordinate, setPinCoordinate] = useState<LatLng>({
    latitude: INITIAL_LAT,
    longitude: INITIAL_LNG,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef<MapView>(null);

  async function updateLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0421,
      longitudeDelta: 0.0421,
    });
  }

  function onMapPress(event: MapEvent) {
    setPinCoordinate(event.nativeEvent.coordinate);
  }

  useEffect(() => {
    updateLocation();
  }, []);

  useEffect(() => {
    mapRef.current.animateToRegion(region);
  }, [region]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}
        onPress={onMapPress}
      >
        <PinMarker coordinate={pinCoordinate} />
        <RestauratMarker
          coordinate={{
            latitude: INITIAL_LAT - 0.01,
            longitude: INITIAL_LNG - 0.01,
          }}
        />
      </MapView>
      {/* <Button title="test" onPress={updateLocation} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  restaurantMarker: {
    width: 40,
    height: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const RestauratMarker = ({ coordinate }: { coordinate: LatLng }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Marker coordinate={coordinate} onPress={() => setModalVisible(true)}>
        <View style={styles.restaurantMarker}>
          <Image
            source={{
              uri: "https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1",
            }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </Marker>
    </>
  );
};

const PinMarker = ({ coordinate }: { coordinate: LatLng }) => {
  const DURATION = 4000;
  const LATITUDE_DELTA = 0.0421;
  const LONGITUDE_DELTA = 0.0421;
  const [marker, setMarker] = useState(null);
  const [coords, setCoordinate] = useState<AnimatedRegion>(
    new AnimatedRegion({
      latitude: coordinate.latitude || INITIAL_LAT,
      longitude: coordinate.longitude || INITIAL_LNG,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LATITUDE_DELTA,
    })
  );
  console.log("hey", coordinate, coords);

  useEffect(() => {
    setCoordinate(
      new AnimatedRegion({
        latitude: coordinate.latitude || INITIAL_LAT,
        longitude: coordinate.longitude || INITIAL_LNG,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LATITUDE_DELTA,
      })
    );
  }, [coordinate]);

  function animationMarker() {
    const newCoordinate = {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    console.log(newCoordinate);
    if (Platform.OS === "android") {
      if (marker) {
        console.log("test", coords);
        marker?.current?.animateMarkerToCoordinate(coordinate, DURATION);
      }
    } else {
      coords
        .timing({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          duration: DURATION,
          useNativeDriver: true,
        })
        .start();
    }
  }

  useEffect(() => {
    animationMarker();
  }, [marker, coordinate, coords]);

  return (
    <MarkerAnimated
      ref={(marker) => setMarker(marker)}
      coordinate={coords}
      anchor={{ x: 0.5, y: 0.5 }}
    />
  );
};
