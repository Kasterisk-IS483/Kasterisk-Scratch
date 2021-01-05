import { StyleSheet, Dimensions } from "react-native";

export const primaryCol = "#265395";
export const whiteCol = "#ffffff";
export const blackCol = "#000000";

export const commonStyles  = StyleSheet.create({

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
    borderColor: whiteCol,
    width: Dimensions.get("window").width * 0.3,
    margin: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: blackCol,
    fontFamily: "System",
  },
  progressBar: {
    height: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  actionButton: {
    width: "40%",
  },

});

export const landscapeStyles  = StyleSheet.create({

  logo: {
    position: "absolute",
    width: "50%",
    height: "50%",
    resizeMode: "contain",
    left: "25%",
    top: "15%",
  },
  description: {
    position: "absolute",
    width: "50%",
    fontSize: 18,
    left: "25%",
    top: "50%",
    textAlign: "center",
  },

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

});

export const portraitStyles = StyleSheet.create({

  logo: {
    position: "absolute",
    width: "50%",
    height: "55%",
    resizeMode: "contain",
    left: "25%",
    top: "15%",
  },
  description: {
    position: "absolute",
    width: "50%",
    fontSize: 18,
    left: "25%",
    top: "60%",
    textAlign: "center",
  },

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

});