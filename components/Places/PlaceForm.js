import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocattionPicker from "./LocationPicker";

function PlaceForm({onCreatePlace}){
  const [enterdTitle, setEnterdTitle] = useState();
  const [pickedLocation, setPickedLocation] = useState();
  const [selectImage, setSelectImage] = useState();

  function changeTitleHandler(enterdTitle){
    setEnterdTitle(enterdTitle)
  }

  function takeImageHandler(imageUri){
    setSelectImage(imageUri)
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location)
  }, [])

  function savedPlaceHandler(){
    const placeData = new Place(enterdTitle, selectImage, pickedLocation);
    onCreatePlace(placeData)
  }

  return (
    <ScrollView style={styles.form}>
      <View >
        <Text style={styles.lable}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enterdTitle}/>
      </View>
      <ImagePicker onTakeImage={takeImageHandler}/>
      <LocattionPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savedPlaceHandler} >Add Place</Button>
    </ScrollView>
  )
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  lable: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
})