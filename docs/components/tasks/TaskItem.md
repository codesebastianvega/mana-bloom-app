# Task Item Component

> **Component:** `TaskCard` / `SwipeableTaskItem`
> **Location:** `src/components/TaskCard/`
> **Last Updated:** 2025-11-23

## 📋 Overview

The core unit of the task list. Displays task details and allows interaction (complete, edit, delete).

## 🎯 Features

- ✅ Displays Title, Description, Priority, Category
- ✅ Checkbox for completion
- ✅ Swipe gestures (Left to Edit, Right to Delete)
- ✅ Visual styling based on priority (High/Urgent)

## 🏗️ Architecture

### Data Flow

```
TasksScreen (List)
    ↓
SwipeableTaskItem (Gesture Handler)
    ↓
TaskCard (Visuals)
```

## 🎨 UI Components

### Layout

```
┌────────────────────────────────┐
│ [ ]  Task Title                │
│      Category • Priority       │
└────────────────────────────────┘
```

## 🔗 Connections

### Affects
- **Economy:** Completing triggers `APPLY_TASK_REWARD`
- **Challenges:** Updates challenge progress

### Related Components
- `TasksScreen`
