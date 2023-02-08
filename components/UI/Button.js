import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

function Button({onPress, children}){
  return(
    <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress} >
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  )
}

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.75,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary50
  },
  pressed: {
    opacity: 0.75
  }

})