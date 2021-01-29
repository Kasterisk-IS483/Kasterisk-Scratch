import { StyleSheet, Dimensions } from "react-native";
import { Colors } from 'react-native-paper';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
}

export const colours = { 
  primary: "#265395",
  secondary: "#CDDAED",
  grey: "#DCDCDC",
}

export const fonts = {
  sm: 16,
  md: 18,
  lg: 22,
}

export const spacings = {
  xs: 5,
  s: 8,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 25,
}

export const commonStyles  = StyleSheet.create({

  centralise: {
    alignItems: "center", 
    justifyContent: "center",
  },

  scrollView: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  whiteContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
  },

  divider: {
    borderWidth: 0.5,
    borderColor: 'white',
    width: dimensions.fullWidth * 0.3,
    margin: spacings.sm,
  },
  heading: {
    fontSize: fonts.lg,
    textAlign: "center",
    marginBottom: spacings.lg,
    color: 'black',
  },
  actionButton: {
    width: "auto",
    marginVertical: spacings.sm,
  },
  textInput: {
    marginHorizontal: spacings.lg,
    marginVertical: spacings.s,
  },
  subheading: {
    paddingLeft: spacings.xl, 
    paddingBottom: spacings.sm, 
    fontSize: fonts.md, 
    fontWeight: 'bold',
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