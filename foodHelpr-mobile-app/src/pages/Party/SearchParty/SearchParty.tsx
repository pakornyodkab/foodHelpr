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
import useDebounce from "../../../../src/libs/useDebounce";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ColorScheme from "../../../constants/ColorScheme";
import GoogleMapsApi from "../../../apis/googlemaps";
import IParty from "../../../models/Party";
import PartyMarker from "../../../components/foodFriend/PartyMarker";
import MapStyle from "../../../constants/MapStyle";
import { findFocusedRoute } from "@react-navigation/native";
import PartyDistancePanel from "../../../components/foodFriend/PartyDistancePanel";

const mockParties = [
  {
    _id: "1",
    partyName: "Let's gooooo",
    restaurant: {
      id: "632c5e0170317b4a00def2e5",
      restaurantName: "Thongsmith (ทองสมิทธ์)",
      tags: [],
      imageUrls: [],
      rating: 0,
      recommendedDishes: [],
      address: "",
      coordinate: {
        _id: "6349a6a9a35fbafa3270712a",
        latitude: 13.74686293255921,
        longitude: 100.53480742047664,
      },
      deliveryInfo: [],
    },
    apptDate: "",
    memberList: [
      {
        _id: "1",
        name: "Jojo",
      },
      {
        _id: "2",
        name: "Goku",
      },
    ],
    ageRestriction: 15,
    maxGuests: 7,
    ownerId: "",
  },
  {
    _id: "2",
    partyName: "Party's time",
    restaurant: {
      id: "632c5e0270317b4a00def2e7",
      restaurantName: "สวนผัก โอ้กะจู๋ (Ohkajhu)",
      tags: [],
      imageUrls: [],
      rating: 0,
      recommendedDishes: [],
      address: "",
      coordinate: {
        _id: "6349a6a9a35fbafa3270712a",
        latitude: 13.745417660339225,
        longitude: 100.53380164686013,
      },
      deliveryInfo: [],
    },
    apptDate: "",
    memberList: [
      {
        _id: "1",
        name: "Jojo",
      },
      {
        _id: "2",
        name: "Goku",
      },
    ],
    ageRestriction: 15,
    maxGuests: 7,
    ownerId: "",
  },
];

const INITIAL_LAT = 13.7;
const INITIAL_LNG = 100.5;

const DELTA_LAT = 0.00521;
const DELTA_LNG = 0.00521;

const PARTY_LOAD_DELAY = 1000;

const window = Dimensions.get("window");

type LocationInfo = {
  name: string;
  address: string;
};

export default function SearchParty({ navigation }) {
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

  //const [randomAmount, setRandomAmount] = useState<number>(3);
  const [randomDistance, setRandomDistance] = useState<number>(5);
  //const [selectedTags, setSelectedTags] = useState<any[]>([]);
  //const [deliveryOptions, setDeliveryOptions] = useState<any[]>([]);

  const debouncedPinCoordinate = useDebounce<LatLng>(pinCoordinate, 1000);

  const [parties, setParties] = useState<IParty[]>([]);

  //   const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  //   const [restaurantsLoading, setRestaurantsLoading] = useState<boolean>(false);

  //   const [restaurantViewModel, setRestaurantViewModel] =
  //     useState<IRestaurantViewModel>(null);

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

  const [partiesLoading, setPartiesLoading] = useState<boolean>(false);
  const [toggleDistancePanel, setToggleDistancePanel] = useState<boolean>(true);

  async function findPartiesNearMe() {
    try {
      setPartiesLoading(true);
      setParties(mockParties);
      setToggleDistancePanel(false);
      // const accessToken = await getToken();
      // const res = await RestaurantService.GetRandomRestaurant(accessToken, {
      //   amount: randomAmount,
      //   latitude: pinCoordinate.latitude,
      //   longitude: pinCoordinate.longitude,
      //   range: 5,
      //   delivery_platforms: deliveryOptions,
      //   tags: selectedTags,
      // });
      // const restaurantData: IRestaurant[] = res.data.map((restaurant) => {
      //   return {
      //     id: restaurant._id,
      //     restaurantName: restaurant.name,
      //     tags: restaurant.tag,
      //     imageUrls: restaurant.restaurantPictureLink,
      //     rating: restaurant.rating,
      //     recommendedDishes: restaurant.recommendedDish,
      //     address: restaurant.address,
      //     coordinate: {
      //       latitude: restaurant.coordinate.Latitude,
      //       longitude: restaurant.coordinate.Longitude,
      //     },
      //     deliveryInfo: restaurant.deliveryInfo,
      //   };
      // });
      // setRestaurants(restaurantData);
    } catch (error) {
      console.error(error, error.message, error.stack);
      throw error;
    } finally {
      setTimeout(() => setPartiesLoading(false), PARTY_LOAD_DELAY);
    }
  }

  useEffect(() => {
    setTimeout(
      () =>
        mapRef.current.fitToElements({
          animated: true,
          edgePadding: {
            top: window.height * 0.2,
            bottom: window.height * 0.2,
            left: window.width * 0.2,
            right: window.width * 0.2,
          },
        }),
      PARTY_LOAD_DELAY
    );
  }, [parties]);

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

  function handleOnPressBack() {
    if (parties.length > 0) {
      setParties([]);
      setToggleDistancePanel(true);
      console.log(`Toggle: ${toggleDistancePanel}`);
      return;
    }

    navigation.goBack();
  }

  return (
    <View>
      <View className="top-5 flex h-1/6 items-center justify-center">
        <Pressable
          className="absolute top-10 right-4 mb-5 flex h-12 w-12 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
          onPress={updateCurrentRegion}
        >
          <Text className="text-center font-semibold text-white">
            <MaterialIcons name="my-location" size={24} />
          </Text>
        </Pressable>
        <Text className="right-15 w-50 absolute top-12 mb-5 flex h-12 justify-center text-xl font-semibold text-green-500">
          Select Restaurant on Map
        </Text>
        <Pressable
          className="absolute top-10 left-4 mb-5 flex h-12 w-12 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
          onPress={handleOnPressBack}
        >
          <Text className="text-center font-semibold text-white">
            <FontAwesome name="arrow-left" size={16} />
          </Text>
        </Pressable>
      </View>
      <View className="relative inset-0 mt-5 h-3/6 flex-1">
        <MapView
          ref={mapRef}
          className=" absolute h-full w-full"
          initialRegion={region}
          showsUserLocation={true}
          showsMyLocationButton={false}
          toolbarEnabled={false}
          onPress={onMapPress}
          customMapStyle={MapStyle}
        >
          <PinMarker coordinate={pinCoordinate} />
          {parties.length === 0 && (
            <Circle
              center={pinCoordinate}
              radius={randomDistance * 1000}
              strokeColor={ColorScheme.primary}
              fillColor={"rgba(34, 197, 94, 0.1)"}
            />
          )}
          {parties.map((party) => (
            <PartyMarker
              key={party._id}
              partyName={party.partyName}
              restaurant={party.restaurant}
              apptDate={party.apptDate}
              memberList={party.memberList}
              ageRestriction={party.ageRestriction}
              maxGuests={party.maxGuests}
              ownerId={party.ownerId}
            />
          ))}
        </MapView>

        {parties.length === 0 && (
          <>
            <View className="mx-4 mt-auto mb-4 flex items-center">
              {/* <Text className="text-center font-semibold text-green-500">
              Parties
            </Text> */}

              <CurrentLocationPanel />
            </View>
            {/* {restaurantViewModel && (
            <RestaurantOptionPanel
              randomDistance={randomDistance}
              onRandomDistanceChange={handleRandomDistanceChange}
              tags={restaurantViewModel.tag}
              selectedTags={selectedTags}
              onSelectedTagsChange={handleSelectedTagsChange}
              deliveryOptions={restaurantViewModel.deliveryPlatform}
              selectedDeliveryOptions={deliveryOptions}
              onDeliveryOptionsChange={handleDeliveryOptionsChange}
            />
          )} */}
          </>
        )}
      </View>

      {/* Distance Panel & Confirm Button */}
      {toggleDistancePanel && (
        <View className="flex h-2/6 items-center space-y-5 bg-white pt-5">
          <PartyDistancePanel
            randomDistance={randomDistance}
            onRandomDistanceChange={handleRandomDistanceChange}
          />

          <Pressable
            className="mb-5 flex h-12 w-32 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
            onPress={findPartiesNearMe}
            disabled={partiesLoading}
          >
            {partiesLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text className="text-center text-lg font-semibold text-white">
                Confirm
              </Text>
            )}
          </Pressable>
        </View>
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
