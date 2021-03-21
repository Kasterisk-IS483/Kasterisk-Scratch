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

export const cardsOuterPadding = spacings.xxs;
export const workloadOverviewBreakpoint = 950;
export const workloadDetailsBreakpoint = 800;

export const commonStyles = StyleSheet.create({

  centralise: {
    alignItems: "center",
    justifyContent: "center",
  },

  scrollContainer: {
    flexGrow: 1,
    paddingVertical: spacings.xl,
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

  statusContainer: {
    flex: 1,
    paddingBottom: spacings.sm,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
  },

  wrapContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wrapCard: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: cardsOuterPadding,
  },

  // forms

  fieldsContainer: {
    flexDirection: 'row',
  },
  switchContainer: {
    paddingTop: spacings.md,
  },
  formContentContainer: {
    marginHorizontal: spacings.lg,
  },

  formSectionHeader: {
    fontWeight: 'bold',
    fontSize: fonts.md,
    marginVertical: spacings.xs,
  },
  formContent: {
    marginVertical: spacings.xs,
  },

  headerTitle: {
    paddingBottom: spacings.sm,
    paddingLeft: spacings.sm,
    fontSize: fonts.xl,
    fontWeight: 'bold',
  },
  switchText: {
    fontSize: fonts.sm,
    paddingTop: spacings.sm,
  },

  picker: {
    borderWidth: 1,
    borderColor: colours.grey,
  },

  // Cards
  cardTitle: {
    paddingBottom: spacings.sm,
    fontSize: fonts.lg,
    fontWeight: 'bold',
  },
  cardContent: {
    paddingLeft: spacings.lg,
    flexDirection: 'row',
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

  // Kubeconfig Content
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

  // Welcome
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

  // workload pages
  detailsContainer: {
    paddingBottom: spacings.xxl,
  },

  // drawer
  icon: {
    width: 35,
    height: 35,
  },
});
export const commonPortraitStyles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: "column",
  },
  columnContainer: {
    flex: 2,
    flexDirection: "column",
  },
  primaryContainer: {
    flex: 3,
    backgroundColor: colours.primary,
    flexDirection: "column",
  },
  bannerLogo: {
    position: "absolute",
    width: "50%",
    height: "55%",
    resizeMode: "contain",
    left: "25%",
    top: "15%",
  },
  bannerDescription: {
    position: "absolute",
    width: "50%",
    fontSize: fonts.md,
    left: "25%",
    top: "60%",
    textAlign: "center",
  },
});

export const dashboardStyles = StyleSheet.create({
  scrollContainer: {
    ...commonStyles.scrollContainer,
    ...commonStyles.secondaryContainer,
    paddingHorizontal: spacings.md,
  },
  wrapContainer: {
    ...commonStyles.wrapContainer,
    paddingHorizontal: spacings.md,
  },
  rowContainer: {
    ...commonStyles.rowContainer,
    paddingVertical: spacings.xl,
    marginHorizontal: spacings.xxl
  },
  columnContainer: {
    ...commonStyles.columnContainer,
    paddingHorizontal: spacings.sm,
  },

  picker: {
    ...commonStyles.picker,
    marginVertical: spacings.sm,
    marginRight: spacings.sm
  }
});
export const dashboardPortraitStyles = StyleSheet.create({
  scrollContainer: {
    ...commonStyles.scrollContainer,
    ...commonStyles.secondaryContainer,
  },

  columnContainer: {
    paddingVertical: spacings.xxs,
  },
});