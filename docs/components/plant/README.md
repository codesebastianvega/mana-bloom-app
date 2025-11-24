# Plant Component

> **Screen:** `PlantScreen`  
> **Location:** `src/screens/PlantScreen.js`  
> **Last Updated:** 2025-11-23

## 📋 Overview

El corazón emocional de la aplicación. Una planta virtual que crece y evoluciona basada en la productividad del usuario.

## 🎯 Features

- ✅ Visualización de la planta actual (estado de crecimiento)
- ✅ Mecánica de regado (gastar Mana para cuidar)
- ✅ Rituales de cuidado
- ✅ Evolución visual basada en nivel/cuidados

## 🏗️ Architecture

### Data Flow

```
AppContext (plant state, mana)
        ↓
PlantScreen
        ↓
Interaction (Water/Care)
        ↓
State Update & Validation
```

## 🔗 Connections

### Affected By
- **Tasks/Productivity:** Genera Mana necesario para cuidar la planta
- **Shop:** Compra de macetas, fertilizantes o skins

### Related Docs
- [Plant Care Mechanics](../../mechanics/plant-care.md)
- [Rituals](../../mechanics/rituals.md)

---

*Documentación en construcción*
