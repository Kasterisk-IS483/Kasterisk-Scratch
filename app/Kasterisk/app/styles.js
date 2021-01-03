import { StyleSheet, Dimensions } from "react-native";

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
    flex: 1,
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
    position: "relative",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "#FFFFFF",
    width: Dimensions.get('window').width * 0.3,
    margin: 10,
  },

  // KubeconfigContentScreen
  scrollViewStyle: {
    flex: 1,
    padding: 50,
  },
  headingStyle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "black",
    fontFamily: "System",
  },

  //logo
  logo_kasterisk: {
    position: "absolute",
    width: "50%",
    height: "50%",
    resizeMode: "contain",
    left: "25%",
    top: "15%",
  },
  logo_kasterisk_text: {
    position: "absolute",
    width: "50%",
    fontSize: 18,
    left: "25%",
    top: "50%",
    textAlign: "center",
  },

  //progressbar
  progressbar: {
    height: 20,
    marginBottom: 15
  }
});

export default styles