import { StyleSheet, Dimensions } from "react-native";
import { Colors } from 'react-native-paper';

export const colours = {
  primary: "#265395",
  secondary: "#CDDAED",
  cta: Colors.blue600,
  grey: "#DCDCDC",
  orange: '#ED952F',
  green: "#20B408",
}

export const fonts = {
  sm: 16,
  md: 18,
  lg: 22,
  xl: 26,
  xxl: 30,
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

export const cardsOuterPadding = spacings.sm;

export const commonStyles = StyleSheet.create({

  centralise: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flexGrow: 1,
    marginVertical: spacings.md,
  },
  dashboardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacings.md,
    paddingVertical: spacings.xl,
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
  fieldsContainer: {
    flexDirection: 'row',
  },
  cardContent: {
    paddingLeft: spacings.lg,
    flexDirection: 'row',
  },

  formSectionHeader: {
    fontWeight: 'bold',
    fontSize: fonts.md,
    marginHorizontal: spacings.lg,
    marginVertical: spacings.xs,
  }, 
  formContent: {
    marginHorizontal: spacings.lg,
    marginVertical: spacings.xs,
  },

  radioText: {
    marginTop: spacings.xs,
    fontSize: fonts.sm,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: 'white',
    width: Dimensions.get('window').width * 0.3,
    margin: spacings.sm,
  },

  headerTitle: {
    paddingLeft: spacings.xl, 
    paddingTop: spacings.xl, 
    fontSize: fonts.xl, 
    fontWeight: 'bold', 
  },
  cardTitle: {
    paddingBottom: spacings.sm, 
    fontSize: fonts.lg, 
    fontWeight: 'bold',
  },

  // WorkloadCard
  cardInfoLeftText: {
    flex: 2,
  },
  cardInfoRightText: {
    flex: 1,
    paddingTop: spacings.sm,
  },
  workloadCardLabelContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacings.md,
  },

  // OverviewCard
  overviewCardContent: {
    flexDirection: 'row',
    alignItems: "center",
    marginLeft: "15%"
  },
  overviewCardLabel: {
    flex: 1,
    fontSize: fonts.xl,
    textAlign: "center",
    marginRight: "20%",
  },

});

export const welcomeStyles = StyleSheet.create({

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
    left: "25%",
    top: "50%",
    textAlign: "center",
    fontSize: fonts.lg,
  },
});

export const clusterPageStyle = StyleSheet.create({
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
    left: "25%",
    top: "50%",
    textAlign: "center",
    fontSize: fonts.lg,
  },
})

export const workloadSummaryStyles = StyleSheet.create({
  dashboardRowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: spacings.xxl,
    paddingVertical: spacings.xl,
  },
  dashboardCardColumnContainer: {
    flex: 1,
    paddingHorizontal: spacings.sm,
  },
})