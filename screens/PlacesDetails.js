import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../components/UI/OutlineButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

function PlacesDetails({ navigation, route}){
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler(){
    console.log('showOnMapHandler Hit' + fetchedPlace?.location?.lat + fetchedPlace?.location?.lng)
    navigation.navigate('Map', { 
      initialLat: fetchedPlace?.location?.lat,
      initialLng: fetchedPlace?.location?.lng
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlacedata(){
     const place = await fetchPlaceDetails(selectedPlaceId)
     setFetchedPlace(place)
     navigation.setOptions({
      title: place.title,
     })
    }
    loadPlacedata()
  }, [selectedPlaceId])

  if (!fetchedPlace){
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    )
  }

  return (
  <ScrollView>
    <Image source={{uri: fetchedPlace.imageUri}} style={styles.image}/>
    <View style={styles.locationContainer}>
      <View style={styles.adressContainer}>
        <Text style={styles.address}>{fetchedPlace.address}</Text>
      </View>
      <OutlineButton icon="map" onPress={showOnMapHandler}>View on Map</OutlineButton>
    </View>
  </ScrollView>)
}

export default PlacesDetails;

const styles = StyleSheet.create({
  fallback:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  adressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})