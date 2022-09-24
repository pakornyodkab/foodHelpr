import React, { useEffect, useRef, useState } from "react";
import MapView, {
  AnimatedRegion,
  LatLng,
  MapEvent,
  MarkerAnimated,
  Region,
} from "react-native-maps";
import { Text, View, Pressable, ActivityIndicator, Dimensions } from "react-native";
import * as Location from "expo-location";
import useDebounce from "../../../src/libs/useDebounce";
import RestaurantMarker from "../../../src/components/restaurants/RestaurantMarker";
import NumberSelector from "../../components/restaurants/NumberSelector";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import GoogleMapsApi from "../../apis/googlemaps";
import { LocationAccuracy } from "expo-location";
import IRestaurant from "../../models/Restaurant";
import MapStyle from "../../constants/MapStyle";

const INITIAL_LAT = 13.7;
const INITIAL_LNG = 100.5;

const MIN_RANDOM_AMOUNT = 1;
const MAX_RANDOM_AMOUNT = 10;

const RESTAURANT_LOAD_DELAY = 1000;

const window = Dimensions.get('window');

const mockData: IRestaurant[] = [
  {
    id: "1123",
    restaurantName: "test restaurant",
    tags: ["Thai food", "Spicy"],
    imageUrls: [
      "https://media-cdn.tripadvisor.com/media/photo-s/17/75/3f/d1/restaurant-in-valkenswaard.jpg",
      "https://i.ytimg.com/vi/djSC4TrTn4c/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDBN7cmYolqC3r8rzRPhFmkFXINiw",
    ],
    rating: 4.65,
    recommendedDishes: ["a dish", "b dish", "c dish"],
    address: "124123 asdfolkjasdklfg",
    coordinate: {
      latitude: INITIAL_LAT - 0.01,
      longitude: INITIAL_LNG - 0.01,
    },
  },
];

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
  const currentCoordinate = useRef<LatLng>({
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

  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState<boolean>(false);

  async function getLocationName() {
    try {
      const { data } = await GoogleMapsApi.ReverseGeocode(pinCoordinate);
      console.log(data);
      const locationProperties = data?.results[0];
      setLocationInfo({
        name: `${locationProperties.address_components[0].long_name} ${locationProperties.address_components[1].long_name}`,
        address: locationProperties.formatted_address,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function subscribeCurrentLocation() {
    await Location.watchPositionAsync(
      { accuracy: LocationAccuracy.Balanced },
      (location) => (currentCoordinate.current = location.coords)
    );
  }

  useEffect(() => {
    subscribeCurrentLocation();
  }, []);

  useEffect(() => {
    getLocationName().finally(() => setLocationInfoLoading(false));
  }, [debouncedPinCoordinate]);

  async function setInitialCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.00421,
      longitudeDelta: 0.00421,
    });
    setPinCoordinate(location.coords);
  }

  function updateCurrentRegion() {
    setRegion({
      latitude: currentCoordinate.current.latitude,
      longitude: currentCoordinate.current.longitude,
      latitudeDelta: 0.00421,
      longitudeDelta: 0.00421,
    });
  }

  function onMapPress(event: MapEvent) {
    setPinCoordinate(event.nativeEvent.coordinate);
    setLocationInfoLoading(true);
  }

  useEffect(() => {
    setInitialCurrentLocation();
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

  async function getRandomRestaurants() {
    // request something
    setRestaurantsLoading(true);
    await Promise.resolve();
    setRestaurants(mockData);
    setTimeout(() => setRestaurantsLoading(false), RESTAURANT_LOAD_DELAY);
  }

  useEffect(() => {
    setTimeout(
      () =>
        mapRef.current.fitToElements({
          animated: true,
          edgePadding: {
            top: window.width * 0.2,
            bottom: window.width * 0.4,
            left: window.width * 0.2,
            right: window.width * 0.2,
          },
        }),
      RESTAURANT_LOAD_DELAY
    );
  }, [restaurants]);

  return (
    <View className="relative inset-0 flex-1">
      <MapView
        ref={mapRef}
        className="absolute h-full w-full"
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        toolbarEnabled={false}
        onPress={onMapPress}
        customMapStyle={MapStyle}
      >
        <PinMarker coordinate={pinCoordinate} />
        {restaurants.map((restaurant) => (
          <RestaurantMarker
            key={restaurant.id}
            restaurantName={restaurant.restaurantName}
            tags={restaurant.tags}
            imageUrls={restaurant.imageUrls}
            rating={restaurant.rating}
            recommendedDishes={restaurant.recommendedDishes}
            address={restaurant.address}
            coordinate={restaurant.coordinate}
          />
        ))}
      </MapView>
      <Pressable
        className="absolute top-10 right-4 mb-5 flex h-12 w-12 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
        onPress={() => updateCurrentRegion()}
      >
        <Text className="text-center font-semibold text-white">
          <MaterialIcons name="my-location" size={24} />
        </Text>
      </Pressable>
      <Pressable
        className="absolute top-10 left-4 mb-5 flex h-12 w-12 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-center font-semibold text-white">
          <FontAwesome name="arrow-left" size={16} />
        </Text>
      </Pressable>
      <View className="mx-4 mt-auto mb-4 flex items-center">
        <NumberSelector
          number={randomAmount}
          canIncrease={randomAmount < MAX_RANDOM_AMOUNT}
          canDecrease={randomAmount > MIN_RANDOM_AMOUNT}
          onIncrease={onIncreaseRandomAmount}
          onDecrease={onDecreaseRandomAmount}
        />
        <Text className="text-center font-semibold text-green-500">
          Restaurants
        </Text>

        <View className="my-2 w-full rounded-lg border-[1px] border-green-500 bg-white px-2 py-1">
          {locationInfoLoading ? (
            <ActivityIndicator size="large" color="rgb(34, 197, 94)" />
          ) : (
            <>
              <Text className="text-center text-lg font-semibold text-green-500">
                {locationInfo.name}
              </Text>
              <Text className="text-sm text-green-500">
                {locationInfo.address}
              </Text>
            </>
          )}
        </View>

        <Pressable
          className="mb-5 flex h-12 w-32 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
          onPress={async () => await getRandomRestaurants()}
          disabled={restaurantsLoading}
        >
          {restaurantsLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text className="text-center text-lg font-semibold text-white">
              Confirm
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const PinMarker = ({ coordinate }: { coordinate: LatLng }) => {
  const DURATION = 200;
  const LATITUDE_DELTA = 0.0421;
  const LONGITUDE_DELTA = 0.0421;
  const marker = useRef<MarkerAnimated>(null);
  // const [marker, setMarker] = useState<MarkerAnimated>(null);
  const [coords, setCoordinate] = useState<AnimatedRegion>(
    new AnimatedRegion({
      latitude: coordinate.latitude || INITIAL_LAT,
      longitude: coordinate.longitude || INITIAL_LNG,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LATITUDE_DELTA,
    })
  );

  // useEffect(() => {
  //   setCoordinate(
  //     new AnimatedRegion({
  //       latitude: coordinate.latitude || INITIAL_LAT,
  //       longitude: coordinate.longitude || INITIAL_LNG,
  //       latitudeDelta: LATITUDE_DELTA,
  //       longitudeDelta: LATITUDE_DELTA,
  //     })
  //   );
  // }, [coordinate]);

  function animationMarker() {
    coords
      .timing({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        duration: DURATION,
        useNativeDriver: false,
      })
      .start();
  }

  useEffect(() => {
    animationMarker();
  }, [marker, coordinate, coords]);

  return (
    <MarkerAnimated
      ref={marker}
      coordinate={coords}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <Text className="text-green-500">
        <Ionicons name="location-sharp" size={38} />
      </Text>
    </MarkerAnimated>
  );
};
