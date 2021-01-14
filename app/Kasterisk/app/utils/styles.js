import { StyleSheet, Dimensions } from "react-native";

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
}

export const colours = { 
  primary: "#265395"
}

export const fonts = {
  sm: 14,
  md: 18,
  lg: 22,
}

export const commonStyles  = StyleSheet.create({

  centralise: {
    alignItems: "center", 
    justifyContent: "center",
  },

  whiteContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    padding: 50,
  },

  divider: {
    borderWidth: 0.5,
    borderColor: 'white',
    width: dimensions.fullWidth * 0.3,
    margin: 10,
  },
  heading: {
    fontSize: fonts.lg,
    textAlign: "center",
    marginBottom: 20,
    color: 'black',
  },
  actionButton: {
    width: "auto",
    marginVertical: 10,
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
    fontSize: fonts.lg,
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
    backgroundColor: colours.primary,
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
    fontSize: fonts.md,
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
    backgroundColor: colours.primary,
    flexDirection: "column",
  },

});