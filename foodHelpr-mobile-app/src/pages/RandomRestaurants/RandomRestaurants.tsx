import React, { useEffect, useRef, useState } from "react";
import MapView, {
  AnimatedRegion,
  Circle,
  LatLng,
  MapEvent,
  MarkerAnimated,
  Region,
} from "react-native-maps";
import {
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { LocationAccuracy } from "expo-location";
import useDebounce from "../../../src/libs/useDebounce";
import RestaurantMarker from "../../../src/components/restaurants/RestaurantMarker";
import NumberSelector from "../../components/restaurants/NumberSelector";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import IRestaurant from "../../models/Restaurant";
import MapStyle from "../../constants/MapStyle";
import RestaurantService from "../../apis/restaurant";
import { getToken } from "../../libs/token";
import RestaurantOptionPanel from "../../components/restaurants/RestaurantOptionPanel";
import ColorScheme from "../../constants/ColorScheme";
import GoogleMapsApi from "../../apis/googlemaps";

const mockTags = Array.from({ length: 22 }, (_, idx) => {
  return {
    _id: idx,
    name: "test" + idx,
  };
});

const mockOptions = Array.from({ length: 22 }, (_, idx) => {
  return {
    _id: idx,
    name: "test" + idx,
  };
});

const INITIAL_LAT = 13.7;
const INITIAL_LNG = 100.5;

const DELTA_LAT = 0.00521;
const DELTA_LNG = 0.00521;

const MIN_RANDOM_AMOUNT = 1;
const MAX_RANDOM_AMOUNT = 10;

const RESTAURANT_LOAD_DELAY = 1000;

const window = Dimensions.get("window");

type LocationInfo = {
  name: string;
  address: string;
};

export default function RandomRestaurantsScreen({ navigation }) {
  const [region, setRegion] = useState<Region>({
    latitude: INITIAL_LAT,
    longitude: INITIAL_LNG,
    latitudeDelta: DELTA_LAT,
    longitudeDelta: DELTA_LNG,
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
  const [randomDistance, setRandomDistance] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [deliveryOptions, setDeliveryOptions] = useState<any[]>([]);

  const debouncedPinCoordinate = useDebounce<LatLng>(pinCoordinate, 1000);

  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState<boolean>(false);

  async function getLocationName() {
    try {
      const { data } = await GoogleMapsApi.ReverseGeocode(pinCoordinate);
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
      latitudeDelta: DELTA_LAT,
      longitudeDelta: DELTA_LNG,
    });
    setPinCoordinate(location.coords);
  }

  function updateCurrentRegion() {
    setRegion({
      latitude: currentCoordinate.current.latitude,
      longitude: currentCoordinate.current.longitude,
      latitudeDelta: DELTA_LAT,
      longitudeDelta: DELTA_LNG,
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
    try {
      setRestaurantsLoading(true);
      const accessToken = await getToken();
      const res = await RestaurantService.GetRandomRestaurant(accessToken, {
        amount: randomAmount,
        latitude: pinCoordinate.latitude,
        longitude: pinCoordinate.longitude,
        range: 5,
      });
      const restaurantData: IRestaurant[] = res.data.map((restaurant) => {
        return {
          id: restaurant._id,
          restaurantName: restaurant.name,
          tags: restaurant.tag,
          imageUrls: restaurant.restaurantPictureLink,
          rating: restaurant.rating,
          recommendedDishes: restaurant.recommendedDish,
          address: restaurant.address,
          coordinate: {
            latitude: restaurant.coordinate.Latitude,
            longitude: restaurant.coordinate.Longitude,
          },
          deliveryInfo: restaurant.deliveryInfo,
        };
      });
      setRestaurants(restaurantData);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setTimeout(() => setRestaurantsLoading(false), RESTAURANT_LOAD_DELAY);
    }
  }

  useEffect(() => {
    setTimeout(
      () =>
        mapRef.current.fitToElements({
          animated: true,
          edgePadding: {
            top: window.height * 0.2,
            bottom: window.height * 0.4,
            left: window.width * 0.2,
            right: window.width * 0.2,
          },
        }),
      RESTAURANT_LOAD_DELAY
    );
  }, [restaurants]);

  const CurrentLocationPanel = () => (
    <View className="my-2 w-full rounded-lg border-[1px] border-green-500 bg-white px-2 py-1">
      {locationInfoLoading ? (
        <ActivityIndicator size="large" color="rgb(34, 197, 94)" />
      ) : (
        <>
          <Text className="text-center text-lg font-semibold text-green-500">
            {locationInfo.name}
          </Text>
          <Text className="text-sm text-green-500">{locationInfo.address}</Text>
        </>
      )}
    </View>
  );

  function handleRandomDistanceChange(distance: number) {
    setRandomDistance(distance);
  }
  function handleSelectedTagsChange(tags: any[]) {
    setSelectedTags(tags);
  }
  function handleDeliveryOptionsChange(options: any[]) {
    setDeliveryOptions(options);
  }

  function handleOnPressBack() {
    if (restaurants.length > 0) {
      setRestaurants([]);
    }
    navigation.goBack();
  }

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
        {restaurants.length === 0 && (
          <Circle
            center={pinCoordinate}
            radius={randomDistance * 1000}
            strokeColor={ColorScheme.primary}
            fillColor={"rgba(34, 197, 94, 0.1)"}
          />
        )}
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
            deliveryInfo={restaurant.deliveryInfo}
          />
        ))}
      </MapView>
      <Pressable
        className="absolute top-10 right-4 mb-5 flex h-12 w-12 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
        onPress={updateCurrentRegion}
      >
        <Text className="text-center font-semibold text-white">
          <MaterialIcons name="my-location" size={24} />
        </Text>
      </Pressable>
      <Pressable
        className="absolute top-10 left-4 mb-5 flex h-12 w-12 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
        onPress={handleOnPressBack}
      >
        <Text className="text-center font-semibold text-white">
          <FontAwesome name="arrow-left" size={16} />
        </Text>
      </Pressable>
      {restaurants.length === 0 && (
        <>
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

            <CurrentLocationPanel />

            <Pressable
              className="mb-5 flex h-12 w-32 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
              onPress={getRandomRestaurants}
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
          <RestaurantOptionPanel
            randomDistance={randomDistance}
            onRandomDistanceChange={handleRandomDistanceChange}
            tags={mockTags}
            selectedTags={selectedTags}
            onSelectedTagsChange={handleSelectedTagsChange}
            deliveryOptions={mockOptions}
            selectedDeliveryOptions={deliveryOptions}
            onDeliveryOptionsChange={handleDeliveryOptionsChange}
          />
        </>
      )}
    </View>
  );
}

const PinMarker = ({ coordinate }: { coordinate: LatLng }) => {
  const DURATION = 200;
  const marker = useRef<MarkerAnimated>(null);
  // const [marker, setMarker] = useState<MarkerAnimated>(null);
  const [coords, setCoordinate] = useState<AnimatedRegion>(
    new AnimatedRegion({
      latitude: coordinate.latitude || INITIAL_LAT,
      longitude: coordinate.longitude || INITIAL_LNG,
      latitudeDelta: DELTA_LAT,
      longitudeDelta: DELTA_LNG,
    })
  );

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
