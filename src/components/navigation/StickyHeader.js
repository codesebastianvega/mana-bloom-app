// [MB] Modulo: UI Global / Seccion: StickyHeader (alias de HomeHeader)
// Afecta: Home, Tasks, Plant, Profile
// Proposito: Reutilizar el header actual de Home como barra sticky global
// Puntos de edicion futura: extender si se necesita props especificos por pantalla
// Autor: Codex - Fecha: 2025-11-26

import React, { forwardRef } from "react";
import HomeHeader from "../home/HomeHeader";

// Alias simple: permite usar la misma UI que HomeHeader en otras pantallas.
const StickyHeader = forwardRef((props, ref) => {
  return <HomeHeader ref={ref} {...props} />;
});

export default StickyHeader;

