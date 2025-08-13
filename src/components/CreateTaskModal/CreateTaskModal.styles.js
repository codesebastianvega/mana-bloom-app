// [MB] CreateTaskModal.styles.js — estilos del modal de tareas alineados al tema (solo estilos, sin tocar la estructura)
// Módulo: Tasks > CreateTaskModal
// Propósito: Unificar visual con Home (fondos, radios, tipografías, paddings, chips y botones) usando tokens.

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation /*, Typography*/ } from "../../theme";

export default StyleSheet.create({
  // Contenedor raíz del modal (usa este en el wrapper principal del modal)
  root: {
    backgroundColor: Colors.surfaceElevated || Colors.surface,
    borderRadius: Radii?.xl ?? 20,
    padding: Spacing.large,
    ...(Elevation?.modal || {}),
  },

  // Encabezado / título del modal
  title: {
    // Typography.h2 si existe; fallback manual:
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.small,
  },

  // Subtítulo o labels de secciones (ej. "Tipo", "Elemento", "Prioridad")
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginTop: Spacing.base,
    marginBottom: Spacing.small,
  },

  // Etiquetas pequeñas (debajo de inputs)
  helperText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
  },

  // Filas genéricas para alinear controles en horizontal
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Contenedor con separación vertical entre grupos
  group: {
    marginTop: Spacing.base,
  },

  // Input de una línea (título, etiqueta, etc.)
  input: {
    height: 48,
    borderRadius: Radii?.lg ?? 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    paddingHorizontal: Spacing.base,
    color: Colors.text,
  },

  // Input multilínea (notas / descripción)
  inputMultiline: {
    minHeight: 96,
    borderRadius: Radii?.lg ?? 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    color: Colors.text,
    textAlignVertical: "top",
  },

  // Contenedor de "segmentos" (p. ej. Tarea / Hábito)
  segmentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },

  // Botón de segmento (estado base)
  segmentButton: {
    minHeight: 36,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii?.pill ?? 999,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  // Texto del segmento
  segmentLabel: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
  },
  // Estado activo del segmento
  segmentButtonActive: {
    borderColor: Colors.primary,
    // Si quieres leve fill activo sin alpha utils, usa surfaceElevated:
    backgroundColor: Colors.surfaceElevated || Colors.surface,
  },
  segmentLabelActive: {
    color: Colors.text,
    fontWeight: "700",
  },

  // Chips (Prioridad / Elemento / Etiquetas seleccionables)
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  chip: {
    minHeight: 28,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii?.pill ?? 999,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  chipLabel: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: "500",
  },
  chipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceElevated || Colors.surface,
  },
  chipLabelActive: {
    color: Colors.text,
    fontWeight: "700",
  },

  // Subtareas: fila input + botón "+"
  subtaskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  subtaskInput: {
    flex: 1,
    height: 44,
    borderRadius: Radii?.lg ?? 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    paddingHorizontal: Spacing.base,
    color: Colors.text,
  },
  subtaskAddBtn: {
    minHeight: 44,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii?.pill ?? 999,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceElevated || Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...(Elevation?.card || {}),
  },
  subtaskAddLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },

  // Botonera inferior
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.large,
  },
  primaryButton: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: Spacing.large,
    borderRadius: Radii?.pill ?? 999,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...(Elevation?.card || {}),
  },
  primaryButtonLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text, // si prefieres contraste: usa un Colors.onPrimary si existe
  },
  secondaryButton: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: Spacing.large,
    borderRadius: Radii?.pill ?? 999,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  // Separadores suaves entre bloques dentro del modal (si los usas)
  divider: {
    height: 1,
    backgroundColor: Colors.textMuted,
    opacity: 0.2,
    marginVertical: Spacing.base,
    borderRadius: 1,
  },
});

