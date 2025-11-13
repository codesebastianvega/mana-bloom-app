// [MB] Modulo: Profile / Seccion: ProfileScreen - Hook Mock
// Afecta: ProfileScreen
// Proposito: Proveer datos mock para la UI de perfil
// Puntos de edicion futura: reemplazar por contexto real y endpoints
// Autor: Codex - Fecha: 2025-10-21

import { useMemo, useState } from "react";

export default function useProfileMock() {
  const [settings, setSettings] = useState({
    notifications: true,
    sounds: false,
    themeDark: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const profile = {
    name: "Mago Anonimo",
    rank: "Mago Experimentado",
    daysInAcademy: 293,
    level: 7,
    xpCurrent: 1240,
    xpTarget: 1500,
    avatarEmoji: "🪄",
  };

  const stats = useMemo(
    () => [
      { id: "level", label: "Nivel", value: `Lv. ${profile.level}` },
      { id: "rituals", label: "Rituales hoy", value: "23" },
      { id: "streak", label: "Mejor racha", value: "12 días" },
    ],
    [profile.level]
  );

  const progress = [
    {
      id: "streak",
      label: "Racha actual",
      value: "5 días",
      hint: "2 para el siguiente logro",
      icon: "calendar",
    },
    {
      id: "health",
      label: "Salud de la planta",
      value: "95%",
      hint: "Floreciente",
      icon: "heart",
    },
    {
      id: "efficiency",
      label: "Eficiencia",
      value: "8%",
      hint: "Tareas por día",
      icon: "star",
    },
  ];

  const actions = [
    { id: "share", label: "Compartir progreso mágico", icon: "share" },
    { id: "achievements", label: "Ver todos los logros", icon: "trophy" },
    { id: "backup", label: "Respaldo de datos mágicos", icon: "cloud" },
  ];

  const levelHint = {
    title: "¡Próximo nivel cerca!",
    message: "Solo necesitas 260 XP más para alcanzar el nivel 8",
    progress: profile.xpCurrent / profile.xpTarget,
  };

  return {
    profile,
    stats,
    progress,
    settings: [
      {
        id: "notifications",
        label: "Notificaciones mágicas",
        description: "Recordatorios de rituales",
        value: settings.notifications,
        onChange: () => toggleSetting("notifications"),
      },
      {
        id: "sounds",
        label: "Efectos de sonido",
        description: "Sonidos de magia",
        value: settings.sounds,
        onChange: () => toggleSetting("sounds"),
      },
      {
        id: "theme",
        label: "Tema",
        description: settings.themeDark ? "Modo oscuro mágico" : "Modo claro etéreo",
        value: settings.themeDark,
        onChange: () => toggleSetting("themeDark"),
      },
    ],
    actions,
    levelHint,
  };
}
