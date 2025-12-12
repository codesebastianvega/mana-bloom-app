# 📊 Design Decisions & Iterations

> **Last Updated:** 2025-11-23

## 🎯 Purpose

Este documento registra decisiones importantes de diseño y desarrollo, incluyendo:
- Por qué tomamos ciertas decisiones
- Cuántas veces hemos cambiado algo
- Razones para los cambios
- Lecciones aprendidas

## 📝 Format

```markdown
### [Feature/Component Name]

**Decisión:** Qué decidimos hacer
**Razón:** Por qué lo decidimos así
**Fecha:** Cuándo
**Iteraciones:** Cuántas veces lo hemos cambiado
**Alternativas consideradas:** Qué más evaluamos
```

---

## 🏠 HomeScreen

### Daily Challenges UI

**Decisión:** Diseño con iconos, barras de progreso visuales, y descripciones  
**Razón:** Mejorar claridad y engagement visual  
**Fecha:** 2025-11-23  
**Iteraciones:** 3

#### Historial:
1. **v1 (Original):** Lista simple con título, progreso numérico, botón grande
2. **v2 (Intento fallido):** Slider horizontal - rechazado por el usuario
3. **v3 (Actual):** Cards verticales con iconos, descripciones, barras visuales

**Lecciones:**
- Usuario prefiere lista vertical sobre slider
- Descripciones son críticas para entender qué hacer
- Iconos y barras visuales mejoran engagement
- Validación de datos es esencial al agregar campos nuevos

---

### Challenge Templates Location

**Decisión:** Templates inline en `AppContext.js`  
**Razón:** Incompatibilidad con estructura de `challengeTemplates.js`  
**Fecha:** 2025-11-23  
**Iteraciones:** 2

#### Historial:
1. **v1:** Import desde `challengeTemplates.js` - causaba undefined
2. **v2:** Inline en `AppContext.js` - funciona correctamente

**Lecciones:**
- Verificar compatibilidad de estructuras de datos
- Inline es más simple para estructuras pequeñas
- Evitar abstracciones innecesarias

---

## 📚 Documentation

### Documentation Structure

**Decisión:** Estructura jerárquica por tipo (components, mechanics, etc.)  
**Razón:** Facilitar navegación y mantenimiento  
**Fecha:** 2025-11-23  
**Iteraciones:** 1

**Alternativas consideradas:**
- Flat structure - rechazado por difícil navegación
- Por feature - rechazado por duplicación

---

## 🎨 Design System

### Color Palette

**Decisión:** [Pendiente documentar]  
**Razón:** [Pendiente]  
**Fecha:** [Pendiente]  
**Iteraciones:** [Pendiente]

---

## 💡 Template para Nuevas Decisiones

```markdown
### [Feature Name]

**Decisión:** 
**Razón:** 
**Fecha:** YYYY-MM-DD
**Iteraciones:** N

#### Historial:
1. **v1:** 
2. **v2:** 

**Lecciones:**
- 
- 

**Alternativas consideradas:**
- 
```

---

*Actualizar este documento cada vez que se tome una decisión importante*

## PlantScreen

### UI refresh + m�dulo PRO

**Decisi�n:** Reorganizar la tarjeta principal con racha ??, tiles minimalistas y bloque �Consejos del jardinero� (PRO) con acorde�n contextual.
**Raz�n:** La tarjeta anterior ocupaba mucho espacio, repet�a m�tricas y no comunicaba valor premium. El nuevo layout reduce ruido visual y ofrece tips accionables.
**Fecha:** 2025-12-07
**Iteraciones:** 2

#### Historial:
1. **v1:** Tarjeta con avatar placeholder, borde verde y timeline est�tico.
2. **v2:** Tarjeta minimalista + chip ?? + tips PRO plegables con copy contextual.

**Lecciones:**
- Los tips deben aportar informaci�n distinta al resto de la UI.
- El badge PRO funciona mejor fuera del contenedor principal.
- El acorde�n necesita toggle expl�cito (no depender del copy).

**Alternativas consideradas:**
- Mantener timeline con alerts (descartado por bajo valor).
- Mezclar tips dentro del hero (descartado por confundir jerarqu�a).
