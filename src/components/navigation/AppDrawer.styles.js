import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    zIndex: 999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  drawer: {
    width: "80%",
    maxWidth: 320,
    backgroundColor: Colors.surfaceElevated,
    padding: Spacing.base,
    borderTopLeftRadius: Radii.xl,
    borderBottomLeftRadius: Radii.xl,
    gap: Spacing.base,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: -4, height: 0 },
    elevation: 20,
  },
  drawerTitle: {
    ...Typography.h1,
    fontSize: 24,
    color: Colors.text,
  },
  drawerSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  section: {
    gap: Spacing.small,
    borderTopWidth: 1,
    borderColor: Colors.border,
    paddingTop: Spacing.small,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    paddingVertical: Spacing.small,
  },
  rowIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  rowLabelDanger: {
    color: Colors.danger,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleText: {
    flex: 1,
    marginRight: Spacing.small,
  },
  closeButton: {
    marginTop: Spacing.small,
    paddingVertical: Spacing.small,
    alignItems: "center",
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  closeButtonText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  easterEggHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
