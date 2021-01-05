import { StyleSheet, Dimensions } from "react-native";

export const primaryCol = "#265395";
export const whiteCol = "white";
export const greyCol = "grey";
export const blackCol = "black";

export const commonStyles  = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "row",
  },
  fillContainer: {
    flex: 1,
  },
  primaryContainer: {
    flex: 1,
    backgroundColor: primaryCol,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: whiteCol,
  },

  centredContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    padding: 50,
  },

  divider: {
    borderWidth: 0.5,
    borderColor: "#FFFFFF",
    width: Dimensions.get('window').width * 0.3,
    margin: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: blackCol,
    fontFamily: "System",
  },
  progressbar: {
    height: 20,
    marginBottom: 15
  }

});

export const portraitStyles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
  },
  fillContainer: {
    flex: 2,
    flexDirection: "column",
  },
  primaryContainer: {
    flex: 3,
    backgroundColor: primaryCol,
    flexDirection: "column",
  },
  whiteContainer: {
    flex: 3,
    backgroundColor: whiteCol,
    flexDirection: "column",
  },

});

