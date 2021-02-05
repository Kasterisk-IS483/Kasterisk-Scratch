import { StyleSheet, Dimensions } from "react-native";
import { Colors } from 'react-native-paper';

// export const dimensions = {
//   fullHeight: Dimensions.get('window').height,
//   fullWidth: Dimensions.get('window').width,
// }

export const colours = {
  primary: "#265395",
  secondary: "#CDDAED",
  cta: Colors.blue600,
  grey: "#DCDCDC",
  orange: '#ED952F',
  green: "#20B408"
}

export const fonts = {
  sm: 16,
  md: 18,
  lg: 22,
  xl: 30,
}

export const spacings = {
  xs: 5,
  s: 8,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 25,
}

export const commonStyles = StyleSheet.create({

  centralise: {
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    flexGrow: 1,
    paddingVertical: spacings.sm,
  },
  whiteContainer: {
    flex: 1,
    padding: spacings.xl,
    backgroundColor: 'white',
  },
  secondaryContainer: {
    flex: 1,
    backgroundColor: colours.secondary,
  },

  divider: {
    borderWidth: 0.5,
    borderColor: 'white',
    width: Dimensions.get('window').width * 0.3,
    margin: spacings.sm,
  },
  heading: {
    fontSize: fonts.lg,
    textAlign: "center",
    marginBottom: spacings.lg,
    color: 'black',
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

  //workload card
  cardInfo: {
    flex: 1,
    marginLeft: spacings.sm,
  },
  cardInfoLeftText: {
    flex: 2,
  },
  cardInfoRightText: {
    flex: 1,
  },
});

export const landscapeStyles = StyleSheet.create({

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

  fillContainer: {
    flex: 1,
  },
  primaryContainer: {
    flex: 1,
    backgroundColor: colours.primary,
  },

  panelContainer: {
    flex: 1,
    flexDirection: "row",
  },
  //workload summary screen
  dashboardContainer: {
    flex: 1,
    flexDirection: "column",
  },
  dashboardRowContainer: {
    flex: 1,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"    
  },
  dashboardCardColumnContainer: {
    flex: 1,
    paddingHorizontal: spacings.sm,
  },

  // individual screens
  workloadCard: {
    paddingHorizontal: spacings.sm,
    paddingVertical: spacings.sm,
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

  fillContainer: {
    flex: 2,
    flexDirection: "column",
  },
  primaryContainer: {
    flex: 3,
    backgroundColor: colours.primary,
    flexDirection: "column",
  },

  panelContainer: {
    flex: 1,
    flexDirection: "column",
  },


});