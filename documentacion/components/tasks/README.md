# Tasks Component

> **Screen:** `TasksScreen`  
> **Location:** `src/screens/TasksScreen.js`  
> **Last Updated:** 2025-11-23

## 📋 Overview

Pantalla principal para la gestión de tareas del usuario. Permite crear, editar, completar y organizar tareas por categorías y prioridades.

## 🎯 Features

- ✅ Lista de tareas pendientes y completadas
- ✅ Creación de tareas con título, descripción y prioridad
- ✅ Categorización (Trabajo, Personal, Salud, etc.)
- ✅ Checkbox para completar tareas (otorga XP/Mana)
- ✅ Gestos de swipe para acciones rápidas (si aplica)

## 🏗️ Architecture

### Data Flow

```
AppContext (tasks state)
        ↓
TasksScreen (UI)
        ↓
User Interaction (Add/Complete)
        ↓
AppContext Dispatch
        ↓
AsyncStorage Update
```

## 🔗 Connections

### Affects
- **Daily Challenges:** Completar tareas actualiza el progreso de desafíos
- **Home Screen:** Muestra resumen de tareas
- **Economy:** Completar tareas genera recompensas

### Related Components
- `TaskItem` (Componente individual de tarea)
- `AddTaskModal` (Modal de creación)

---

*Documentación en construcción*
