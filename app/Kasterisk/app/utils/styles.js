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
  dashboardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  scrollContainer: {
    flexGrow: 1,
    marginVertical: spacings.md,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: spacings.xl,
  },

  primaryContainer: {
    flex: 1,
    backgroundColor: colours.primary,
  },
  secondaryContainer: {
    flex: 1,
    backgroundColor: colours.secondary,
  },

  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  columnContainer: {
    flex: 1,
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
  switchText: {
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
    paddingBottom: spacings.sm, 
    paddingLeft: spacings.sm,
    fontSize: fonts.xl, 
    fontWeight: 'bold', 
  },
  cardTitle: {
    paddingBottom: spacings.sm, 
    fontSize: fonts.lg, 
    fontWeight: 'bold',
  },

  // WorkloadCard
  workloadCardLabelContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacings.md,
  },
  workloadCardInfoLeftText: {
    flex: 2,
  },
  workloadCardInfoRightText: {
    flex: 1,
    paddingTop: spacings.sm,
  },

  // DetailsCard
  detailsCardInfoLeftText: {
    flex: 2,
  },
  detailsCardInfoRightText: {
    flex: 3,
    paddingTop: spacings.xs,
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

  // Welcome, cluster
  bannerLogo: {
    position: "absolute",
    width: "50%",
    height: "50%",
    resizeMode: "contain",
    left: "25%",
    top: "15%",
  },
  bannerDescription: {
    position: "absolute",
    width: "50%",
    left: "25%",
    top: "50%",
    textAlign: "center",
    fontSize: fonts.lg,
  },
});

export const workloadSummaryStyles = StyleSheet.create({
  rowContainer: {
    ...commonStyles.rowContainer,
    marginHorizontal: spacings.xxl,
    paddingVertical: spacings.xl,
  },
  columnContainer: {
    ...commonStyles.columnContainer,
    paddingHorizontal: spacings.sm,
  },
  dashboardContainer: {
    ...commonStyles.dashboardContainer,
    paddingHorizontal: spacings.md,
    paddingVertical: spacings.xl,
  },
  detailsContainer: {
    paddingHorizontal: spacings.md,
    paddingVertical: spacings.xxl,
  },
});