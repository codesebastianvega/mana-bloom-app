import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme";

const baseBtn = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: Spacing.tiny,
  paddingHorizontal: Spacing.small,
  borderRadius: 8,
  borderWidth: 0.5,
  borderColor: Colors.text,
  marginRight: Spacing.small,
  backgroundColor: Colors.filterBtnBg,
};

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: Spacing.base,
  },
  section: {
    marginBottom: Spacing.base,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.small,
  },
  row: {
    flexDirection: "row",
  },
  btn: {
    ...baseBtn,
  },
  text: {
    color: Colors.text,
    fontSize: 14,
  },
});
