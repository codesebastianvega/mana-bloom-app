// [MB] Módulo: Tasks / Sección: CreateTaskModal
// Afecta: CreateTaskModal
// Propósito: Estilos del modal para crear y editar tareas
// Puntos de edición futura: tokens en theme y ajustes de spacing
// Autor: Codex - Fecha: 2025-08-13

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
  typeOptionBtn: {
    flex: 1,
    minHeight: 40,

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
  elementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.base,
    marginTop: Spacing.small,
  },
  elementCard: {
    width: "48%",
    borderWidth: 2,
    borderRadius: Radii.lg,
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.base,
    alignItems: "center",
    justifyContent: "center",
    ...(Elevation?.card || {}),
  },
  elementCardActive: {
    shadowOpacity: 0.35,
  },
  elementEmoji: {
    fontSize: 32,
    marginBottom: Spacing.tiny,
  },
  elementTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },
  elementCaption: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.tiny,
  },
  priorityList: {
    marginTop: Spacing.small,
    gap: Spacing.small,
  },
  priorityRow: {
    width: "100%",
    minHeight: 56,
    borderWidth: 2,
    borderRadius: Radii.lg,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    alignItems: "center",
    justifyContent: "center",
  },
  priorityTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },
  priorityCaption: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: 2,

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

