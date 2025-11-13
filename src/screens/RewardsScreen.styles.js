import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../theme";

const SHEET_BG = "rgba(20, 14, 35, 0.88)";
const CARD_BG = "rgba(30, 21, 48, 0.75)";
const CARD_BORDER = "rgba(255,255,255,0.12)";

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(6, 4, 14, 0.65)",
  },
  backdropDismiss: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    flex: 1,
    margin: Spacing.base,
    marginTop: Spacing.large,
    backgroundColor: SHEET_BG,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: Spacing.base,
    gap: Spacing.base,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    gap: Spacing.tiny,
    paddingRight: Spacing.small,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CARD_BG,
  },
  content: {
    paddingBottom: Spacing.base,
    gap: Spacing.base,
  },
  section: {
    gap: Spacing.small,
  },
  sectionTitle: {
    ...Typography.subtitle,
    color: Colors.text,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  sectionList: {
    gap: Spacing.tiny,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    backgroundColor: CARD_BG,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: Radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  cardTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  chip: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  chipText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  promoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    backgroundColor: CARD_BG,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  promoIcon: {
    width: 40,
    height: 40,
    borderRadius: Radii.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  promoText: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  promoTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  promoDescription: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  pressed: {
    opacity: 0.85,
  },
});
