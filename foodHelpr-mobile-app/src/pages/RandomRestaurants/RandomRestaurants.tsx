import React, { useEffect, useRef, useState } from "react";
import MapView, {
  AnimatedRegion,
  LatLng,
  MapEvent,
  MarkerAnimated,
  Region,
} from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import useDebounce from "../../../src/libs/useDebounce";
import GeoapifyAPI from "../../../src/apis/geoapify";
import RestauratMarker from "../../../src/components/restaurants/RestaurantMarker";
import NumberSelector from "../../components/restaurants/NumberSelector";
import { FontAwesome } from "@expo/vector-icons";

const INITIAL_LAT = 13.7;
const INITIAL_LNG = 100.5;

const MIN_RANDOM_AMOUNT = 1;
const MAX_RANDOM_AMOUNT = 10;

type LocationInfo = {
  name: string;
  address: string;
};

export default function RandomRestaurantsScreen({ navigation }) {
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
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    name: "",
    address: "",
  });
  const [locationInfoLoading, setLocationInfoLoading] =
    useState<boolean>(false);

  const [randomAmount, setRandomAmount] = useState<number>(3);

  const debouncedPinCoordinate = useDebounce<LatLng>(pinCoordinate, 1000);

  async function getLocationName() {
    try {
      const { data } = await GeoapifyAPI.ReverseGeocode(debouncedPinCoordinate);
      const locationProperties = data?.features[0]?.properties;
      setLocationInfo({
        name: locationProperties.name,
        address: locationProperties.address_line2,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLocationName()
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLocationInfoLoading(false));
  }, [debouncedPinCoordinate]);

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
    setLocationInfoLoading(true);
  }

  useEffect(() => {
    updateLocation();
  }, []);

  useEffect(() => {
    mapRef.current.animateToRegion(region);
  }, [region]);

  function onIncreaseRandomAmount() {
    setRandomAmount(Math.min(MAX_RANDOM_AMOUNT, randomAmount + 1));
  }

  function onDecreaseRandomAmount() {
    setRandomAmount(Math.max(MIN_RANDOM_AMOUNT, randomAmount - 1));
  }

  return (
    <View className="relative inset-0 flex-1">
      <MapView
        ref={mapRef}
        className="absolute h-full w-full"
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={onMapPress}
      >
        <PinMarker coordinate={pinCoordinate} />
        <RestauratMarker
          name="Test Restaurants"
          coordinate={{
            latitude: INITIAL_LAT - 0.01,
            longitude: INITIAL_LNG - 0.01,
          }}
        />
      </MapView>
      <Pressable
        className="top-10 left-4 mb-5 flex h-12 w-12 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-center text-2xl font-semibold text-white">
          <FontAwesome name="arrow-left" />
        </Text>
      </Pressable>
      <View className="mx-4 mt-auto mb-4 flex items-center">
        <NumberSelector
          number={randomAmount}
          onIncrease={onIncreaseRandomAmount}
          onDecrease={onDecreaseRandomAmount}
        />
        <Text className="text-center font-semibold text-green-500">
          Restaurants
        </Text>

        <View className="my-2 w-10/12 rounded-lg border-[1px] border-green-500 bg-white px-2 py-1">
          {locationInfoLoading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Text className="text-center font-semibold text-green-500">
                {locationInfo.name}
              </Text>
              <Text className="font-sm text-green-500">
                {locationInfo.address}
              </Text>
            </>
          )}
        </View>

        <Pressable className="mb-5 flex h-12 w-32 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700">
          <Text className="text-center text-lg font-semibold text-white">
            Confirm
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
