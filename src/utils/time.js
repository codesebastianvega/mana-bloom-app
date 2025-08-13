// [MB] Módulo: Utils / Archivo: time
// Afecta: NewsFeedSection, NewsInboxScreen
// Propósito: Utilidad para mostrar tiempo relativo en noticias
// Puntos de edición futura: internacionalización y traducciones
// Autor: Codex - Fecha: 2025-08-13

export function timeAgo(iso) {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (m < 60) return `hace ${m} min`;
  if (h < 24) return `hace ${h} h`;
  if (d === 1) return "ayer";
  return `hace ${d} días`;
}
