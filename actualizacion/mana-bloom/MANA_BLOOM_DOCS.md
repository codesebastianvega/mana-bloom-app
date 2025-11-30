# 🌸 Mana Bloom - Documentación Técnica y Funcional

## 📖 Visión General
**Mana Bloom** es una aplicación de productividad gamificada ("Productivity RPG") con temática de fantasía oscura. El objetivo es convertir hábitos y tareas aburridas en una aventura épica donde el usuario cultiva un jardín místico, sube de nivel y desbloquea historias (Lore).

---

## 🗺️ Mapa de Arquitectura

La aplicación está construida sobre **React + TypeScript + Tailwind CSS**. Utiliza una estructura de componentes modular donde `App.tsx` actúa como el enrutador principal y gestor de estado global (simulado).

### Estructura de Archivos Principal
```text
/
├── index.html          # Punto de entrada HTML (Fuentes, Tailwind Config)
├── index.tsx           # Punto de entrada React
├── App.tsx             # Enrutador principal y Layout (Header/Navbar)
├── types.ts            # Definiciones de TypeScript (Interfaces de Usuario, Tareas, Plantas)
├── constants.ts        # Base de datos simulada (Mock Data)
└── components/         # Biblioteca de componentes UI
```

---

## 📱 Pantallas y Componentes (Desglose Detallado)

### 1. 🏠 Home Screen (El Nexo)
El panel de control principal. Su función es dar contexto, mostrar el estado actual y ofrecer accesos directos.

*   **`WelcomeHero.tsx`**: 
    *   **Función**: Saludo dinámico basado en la hora del día (ej. "La niebla se levanta..."). Muestra la siguiente tarea prioritaria ("Boss Battle") y los KPIs principales (Racha, Tareas pendientes).
*   **`FocusCrystalWidget.tsx`**: 
    *   **Función**: Herramienta de productividad tipo **Pomodoro**. Visualmente es un cristal que se carga. Al completar 25 min, genera Mana.
*   **`SocialTicker.tsx`** (Nuevo):
    *   **Función**: Barra de noticias en tiempo real debajo del header. Muestra actividad de amigos ("Sofia ha regado su planta") para crear sensación de comunidad viva.
*   **`PromoSlider.tsx`**: 
    *   **Función**: Carrusel de banners navegables. Sirve como atajo a Jardín, Lore o Tienda.
*   **`StatusSection.tsx`**: 
    *   **Función**: Barra de progreso de XP (Nivel) y resumen de recursos (Mana, Monedas, Gemas).
*   **`RewardsSection.tsx`**: 
    *   **Función**: Sistema de retención diaria. Permite reclamar recompensas por "Daily Login" o Rachas.
*   **`DailyChallenges.tsx`**: 
    *   **Función**: Lista de 3 micro-objetivos diarios aleatorios para ganar XP extra.
*   **`InventoryEvents.tsx`**: 
    *   **Función**: Calendario de eventos y resumen rápido de objetos en la mochila.

### 2. 📝 Tasks Screen (Libro de Misiones)
El motor de productividad. Aquí se gestionan las tareas.

*   **`TasksScreen.tsx`**: 
    *   **Función**: Contenedor principal. Gestiona el estado de la lista de tareas y la lógica de filtrado.
*   **`TaskCard.tsx`**: 
    *   **Función**: Componente interactivo complejo. Soporta **gestos (Swipe)**: Deslizar derecha para completar, izquierda para borrar. Muestra detalles, subtareas y recompensas.
*   **`TaskFilters.tsx`**: 
    *   **Función**: Filtros por tipo (Misión, Hábito, Ritual) y buscador.
*   **`CreateTaskModal.tsx`**: 
    *   **Función**: Formulario para crear tareas.
    *   **Integración IA**: Utiliza **Google Gemini** para generar "Advertencias Mágicas" o descripciones de rol basadas en el título de la tarea.
*   **`ConfettiFX.tsx`**: 
    *   **Función**: Sistema de partículas en Canvas que explota visualmente al completar una tarea (Juice/Feedback).

### 3. 🌱 Plant Screen (Santuario de Ernesto)
El corazón emocional (Tamagotchi). El usuario gasta Mana aquí.

*   **`PlantHero.tsx`**: 
    *   **Función**: Visualización principal de la planta/árbol. Muestra animaciones de respiración y partículas. Botón para "Hablar/Conectar".
*   **`PlantStatus.tsx`**: 
    *   **Función**: Panel de estadísticas vitales (Salud, Felicidad). Muestra el "Clima de Mana" (simulación de clima que afecta a la planta).
*   **`PlantCareRituals.tsx`**: 
    *   **Función**: Botonera de acciones (Regar, Meditar, Cantar). Incluye el botón de "Vínculo Vital" que requiere mantener presionado (Long Press) para simular esfuerzo real.
*   **`ElementBalance.tsx`**: 
    *   **Función**: Gráficos de barras líquidas que muestran el equilibrio de elementos (Fuego, Agua, Tierra, Aire) basado en el tipo de tareas que completas.

### 4. 🗺️ Social Screen (Bosque Etéreo)
La capa multijugador y comunitaria.

*   **`SocialScreen.tsx`**: 
    *   **Función**: Contenedor de pestañas (Amigos, Clanes, Global).
    *   **Mapa Interactivo**: Un mapa estilo "Snapchat" donde se ven los avatares de amigos geolocalizados en el bosque virtual.
    *   **Feed de Actividad**: Lista de logros de otros usuarios.
    *   **Retos Cooperativos**: Barras de progreso compartidas para metas globales (ej. "Regar 1000 plantas entre todos").

### 5. 👤 Profile Screen (Grimorio del Jugador)
Estadísticas a largo plazo y progresión.

*   **`ProfileScreen.tsx`**: 
    *   **Función**: Muestra avatar, arquetipo (clase de personaje), logros desbloqueados (Vitrina de Honor) y el inventario de objetos ("La Bóveda").
    *   **Heatmap**: Gráfico de actividad estilo GitHub ("Flujo de Mana").

### 6. 🔨 Garden Screen (Modo Constructor)
El "Sandbox" para personalizar el entorno.

*   **`GardenScreen.tsx`**: 
    *   **Función**: Vista Isométrica (2.5D). Permite colocar objetos (Decoración, Caminos) comprados en la tienda en una cuadrícula. Tiene modo "Ver" y modo "Construir".

### 7. 📖 Lore & Settings (Sistemas de Soporte)
Narrativa y configuración.

*   **`LoreScreen.tsx`** (Nuevo): 
    *   **Función**: Lector de historias. Los capítulos se desbloquean al subir de nivel. Expande el universo narrativo del juego.
*   **`SettingsScreen.tsx`**: 
    *   **Función**: Gestión de cuenta, temas (Oscuro/Claro), notificaciones e integraciones (Google Fit, Notion - simuladas).
*   **`TutorialOverlay.tsx`** (Nuevo):
    *   **Función**: Sistema de Onboarding. Muestra al personaje "Lumina" (espíritu guía) superpuesto en la pantalla para enseñar al usuario nuevo.

---

## 🧩 Componentes Globales / UI Kit

Estos componentes se usan en toda la app para mantener consistencia.

*   **`NavHavenDrawer.tsx`**: 
    *   **Función**: Menú lateral deslizante (Drawer). Ahora incluye tarjeta de jugador, barra de XP y accesos directos enriquecidos.
*   **`StickyHeader.tsx`**: 
    *   **Función**: Barra superior fija con el logo, notificaciones y botón de menú hamburguesa.
*   **`LevelUpModal.tsx`**: 
    *   **Función**: Modal espectacular a pantalla completa que aparece al subir de nivel.
*   **`RetentionModal.tsx`**: 
    *   **Función**: Modal de "Bienvenida" que otorga recursos si el usuario no ha entrado en varios días.

---

## 🤖 Integración de IA (Google Gemini)

La app utiliza la API de Gemini para generar contenido dinámico y rol:

1.  **Creador de Misiones (`CreateTaskModal`)**:
    *   Genera descripciones de fantasía o "advertencias de peligro" irónicas basadas en una tarea aburrida (ej. "Lavar platos" -> "Purificación de los artefactos de cerámica ancestral").
2.  **Conversación con la Planta (`PlantScreen`)**:
    *   Permite "hablar" con Ernesto (la planta). La IA analiza las estadísticas de salud de la planta y la racha del usuario para dar un consejo empático o una queja divertida.

---

## 🎨 Sistema de Diseño (Mana Theme)

*   **Colores**: 
    *   `bg-mana-dark` (#0e0a1e): Fondo principal (Violeta casi negro).
    *   `text-mana-primary` (#8b5cf6): Acentos principales (Violeta mágico).
    *   `text-mana-secondary` (#1cd47b): Éxito y Naturaleza (Verde/Turquesa).
    *   `text-mana-accent` (#ffca28): Oro/Recompensas.
*   **Tipografía**: Inter (Clean sans-serif) para UI, con toques Serif en el Lore.
*   **Efectos**: Uso intensivo de `backdrop-blur` (Glassmorphism), sombras de colores (`shadow-purple-500/50`) y gradientes oscuros.

---
