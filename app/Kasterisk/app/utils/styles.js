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
  // card:{
  //   alignItems: "center",
  //   justifyContent: "center",
  //   // marginBottom: 300,
  //   // display: "flex",
  // }

  //workload card
  circle: {
    justifyContent: 'flex-end',
    paddingBottom: 20
  },
  cardInfoText: {
    paddingLeft: 25
  },
  card: {
    paddingLeft: 15,
    flexDirection: 'row',
  }

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

  //workload summary screen
  workloadSummaryMainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colours.secondary,
  },
  workloadSummaryColumnContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  workloadSummaryRowContainer: {
    flex: 1,
    paddingTop: 50,
    flexDirection: "row",
  },

  // individual screens
  workloadCard: {
    paddingHorizontal: 20,
    paddingVertical: spacings.sm,
  },
  deploymentRowContainer: {
    flex: 1,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
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