import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import MapView, {Marker} from 'react-native-maps';
import IconButton from "../components/UI/IconButton";

function Map({ navigation, route }){
  // const { initialLat, initialLng } = route.params;

  const initialLocation = route.params &&{
    lat: initialLat,
    lng: initialLng
  }
  //  const initialLocation = route.params && {
  //   lat: route.params.initialLat,
  //   lng: route.params.initialLng,
  // };

  // const iniitialLocation = false

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  

  const region = {
    latitude: initialLocation ? initialLocation.lat : 55,
    longitude: initialLocation ? initialLocation.lng : -4,
    latitudeDelta: 15.0922,
    longitudeDelta: 15.0421
  }

  function selectLocationHandler(event){
    if (selectedLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({lat: lat, lng: lng});
  }

  const savePickLocationHandler= useCallback(() =>{
    if (!selectedLocation){
      Alert.alert('No location picked', 'Pick a location on map')
      return;
    }
    navigation.navigate(`AddPlace`, { pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng })
  }, [navigation, selectedLocation])

  useLayoutEffect(()=>{
    if (selectedLocation){
      return;
    }
    navigation.setOptions({
      headerRight: ({tintColor}) => (<IconButton icon='save' size={24} color={tintColor} onPress={savePickLocationHandler}/>)
    })    
  }, [navigation, savePickLocationHandler, initialLocation])

  return (
    <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
      {selectedLocation && <Marker title="picked location" coordinate={{latitude: selectedLocation.lat, longitude: selectedLocation.lng}} />}
    </MapView>
  )
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})