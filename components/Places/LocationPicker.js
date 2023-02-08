import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { Colors } from "../../constants/colors";
import OutlineButton from "../UI/OutlineButton";
import { useEffect, useState } from "react";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { getAdress } from "../../util/location";
// import { getMapPreview } from "../../util/location";

function LocattionPicker({onPickLocation}){
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused()

  const navigation = useNavigation()
  const route = useRoute()

  const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

  useEffect(()=>{
    if (isFocused && route.params){
      const mapPickedLocation = {
        lat: route.params.pickedLat, 
        lng: route.params.pickedLng
      };
      setPickedLocation(mapPickedLocation)
    }
  }, [route, isFocused])

  useEffect(()=> {
    async function handleLocation(){
      if (pickedLocation) {
        // const adress = await getAdress(pickedLocation.lat, pickedLocation.lng)
        onPickLocation({...pickedLocation, address: 'Address: to cheap to sign up to google'})
        // onPickLocation(pickedLocation)

      }
    }
    handleLocation()
  }, [pickedLocation, onPickLocation])

  async function verifyPermissions(){
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    };

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Permission Denied', 'Please grant permission to access this app')
    }
  }

  async function geLocationHandler(){
    // const hasPermission = await verifyPermissions();

    // if (!hasPermission){
    //   return;
    // }
    const location = await getCurrentPositionAsync();
    console.log(location)
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    })
  }

  function pickOnMapHandler(){
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No location displayed</Text>

  if (pickedLocation) {
    // locationPreview = <Image style={styles.mapPreviewImage} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}} />
    locationPreview = <Text>wont signup to google with bank card to get free content!!!! but your location is lat: {pickedLocation.lat}, lng: {pickedLocation.lng} </Text>
  }

  return (
    <View>
      <View style={styles.mapPreview} >
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlineButton icon='location' onPress={geLocationHandler} >Locate User</OutlineButton>
        <OutlineButton icon='map' onPress={pickOnMapHandler} >Pick on Map</OutlineButton>
      </View>
    </View>
  )
}

export default LocattionPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
})