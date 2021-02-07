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
  xxs: 5,
  xs: 8,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 25,
  xxl: 30,
}

export const commonStyles = StyleSheet.create({

  centralise: {
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    flexGrow: 1,
    paddingVertical: spacings.md,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: spacings.xl,
  },
  secondaryContainer: {
    flex: 1,
    backgroundColor: colours.secondary,
  },
  dashboardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacings.md, 
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
  subheading: {
    paddingLeft: spacings.xl,
    paddingBottom: spacings.sm,
    fontSize: fonts.md,
    fontWeight: 'bold',
  },
  textInput: {
    marginHorizontal: spacings.lg,
    marginVertical: spacings.xs,
  },

  // WorkloadCard
  cardInfo: {
    flex: 1,
    marginLeft: spacings.sm,
  },
  cardInfoLeftText: {
    flex: 2,
  },
  cardInfoRightText: {
    flex: 1,
    paddingTop: spacings.sm,
  },

});

export const landscapeStyles = StyleSheet.create({

  // Welcome
  panelContainer: {
    flex: 1,
    flexDirection: "row",
  },
  welcomeBannerContainer: {
    flex: 1,
  },
  welcomeButtonsContainer: {
    flex: 1,
    backgroundColor: colours.primary,
  },
  welcomeBannerLogo: {
    position: "absolute",
    width: "50%",
    height: "50%",
    resizeMode: "contain",
    left: "25%",
    top: "15%",
  },
  welcomeBannerDescription: {
    position: "absolute",
    width: "50%",
    fontSize: fonts.lg,
    left: "25%",
    top: "50%",
    textAlign: "center",
  },

  // WorkloadSummary
  dashboardRowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: spacings.xxl,
  },
  dashboardCardColumnContainer: {
    flex: 1,
    paddingHorizontal: spacings.sm,
  }

});

export const portraitStyles = StyleSheet.create({

  // Welcome
  panelContainer: {
    flex: 1,
    flexDirection: "column",
  },
  welcomeBannerContainer: {
    flex: 2,
    flexDirection: "column",
  },
  welcomeButtonsContainer: {
    flex: 3,
    backgroundColor: colours.primary,
    flexDirection: "column",
  },
  welcomeBannerLogo: {
    position: "absolute",
    width: "50%",
    height: "55%",
    resizeMode: "contain",
    left: "25%",
    top: "15%",
  },
  welcomeBannerDescription: {
    position: "absolute",
    width: "50%",
    fontSize: fonts.md,
    left: "25%",
    top: "60%",
    textAlign: "center",
  },

  // WorkloadSummary
  dashboardRowContainer: {
    flexDirection: "column",
  },

});