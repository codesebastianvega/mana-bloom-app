import { StyleSheet, Dimensions } from "react-native";
import { Colors, Spacing, Typography, Radii } from "../theme";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    width: width,
    height: height,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    paddingVertical: Spacing.xlarge,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.large, // Safe area adjustment
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.text,
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  placeholderButton: {
    width: 40,
    height: 40,
  },
  sceneContainer: {
    flex: 1,
    position: "relative",
  },
  gridOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    zIndex: 1, // Below items
  },
  plantImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  petsLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
  petContainer: {
    position: "absolute",
    alignItems: "center",
  },
  petImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  petName: {
    ...Typography.caption,
    color: Colors.text,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
    overflow: "hidden",
  },
  footer: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.large,
    alignItems: "center",
    zIndex: 100,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    gap: Spacing.small,
  },
  editButtonText: {
    ...Typography.body,
    fontWeight: "600",
    color: Colors.text,
  },
});
