import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    // Button
    imageIconStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
    },
    buttonIconSeparatorStyle: {
      backgroundColor: 'grey',
      width: 1,
      height: 40,
    },
      
    // WelcomeScreen
    container: {
      flex: 1,
      flexDirection: "row",
    },
    leftContainer: {
      flex: 1.5,
    },
    rightContainer: {
      flex: 1,
      backgroundColor: "#265395",
    },
    image: {
      flex: 1,
      justifyContent: "center",
    },
    buttonContainer: {
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    addButton: {
      width: 200,
    },
    lineStyle: {
      borderWidth: 0.5,
      borderColor: "#FFFFFF",
      width: "90%",
      margin: 10,
    },

    // KubeconfigContentScreen
    scrollViewStyle: {
        flex: 1,
        padding: 50,
        justifyContent: "center",
    },
    headingStyle: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
        color: "white",
        fontFamily: "Arial",
    },
});

export default styles