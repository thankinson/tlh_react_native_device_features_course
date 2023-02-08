import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlineButton from "../UI/OutlineButton";

function ImagePicker({onTakeImage}){
  const [pickImage, setPickImage] = useState()
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  async function verifyPermissions(){
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse =  await requestPermission();

      return permissionResponse.granted;
    } 

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficant permision', 'Please grant access permission to use this app')
      return false
    }

    return true
  }

  async function takeImageHandler(){
    const hassPermission = await verifyPermissions();

    if (!hassPermission){
      return;
    }

    const image =  await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickImage(image.uri)
    onTakeImage(image.uri)
    console.log(image.uri)
  }

  let imagePreview = <Text>No image to display yet.</Text>

  if (pickImage) {
    imagePreview = <Image style={styles.image}  source={{uri: pickImage}}/>
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <OutlineButton icon='camera' onPress={takeImageHandler}>Take Image</OutlineButton>
    </View>
  )
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview:{
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    elevation: 4
  },
  image:{
    width: '100%',
    height: '100%'
  }
})