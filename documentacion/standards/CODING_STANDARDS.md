# 📐 Guía de Estándares de Código - Mana Bloom App

> **Versión:** 1.0.0  
> **Última actualización:** 2025-11-24  
> **Propósito:** Mantener consistencia y calidad en el código

---

## 📋 Índice

1. [Headers de Archivo](#headers-de-archivo)
2. [Nomenclatura](#nomenclatura)
3. [Estructura de Componentes](#estructura-de-componentes)
4. [Imports y Exports](#imports-y-exports)
5. [Estado y Props](#estado-y-props)
6. [Estilos](#estilos)
7. [Comentarios](#comentarios)
8. [Git Commits](#git-commits)

---

## 📄 Headers de Archivo

### Formato Estándar `[MB]`

**Todos los archivos** deben incluir un header al inicio con el siguiente formato:

```javascript
// [MB] Módulo: [Nombre del módulo] / Archivo: [Nombre del archivo]
// Afecta: [Qué partes de la app afecta este archivo]
// Propósito: [Para qué sirve este archivo en una línea]
// Puntos de edición futura: [Qué se puede mejorar o extender]
// Autor: [Nombre] - Fecha: [YYYY-MM-DD]
```

### Ejemplos

#### Componente
```javascript
// [MB] Módulo: Shop / Archivo: ShopItemCard
// Afecta: ShopScreen (visualización de items)
// Propósito: Renderizar tarjeta individual de item con precio y rareza
// Puntos de edición futura: agregar animaciones, soporte para bundles
// Autor: Sebastian Vega - Fecha: 2025-11-24
```

#### Hook Personalizado
```javascript
// [MB] Módulo: Shop / Archivo: useShopPurchase
// Afecta: ShopScreen, InventoryContext
// Propósito: Manejar lógica de compra con validación multi-moneda
// Puntos de edición futura: agregar sistema de descuentos, cupones
// Autor: Sebastian Vega - Fecha: 2025-11-24
```

#### Servicio
```javascript
// [MB] Módulo: Core / Archivo: catalogService
// Afecta: ShopScreen, InventoryScreen
// Propósito: Cargar y validar catálogo de items desde JSON
// Puntos de edición futura: cache en AsyncStorage, actualización remota
// Autor: Sebastian Vega - Fecha: 2025-11-24
```

#### Constantes
```javascript
// [MB] Módulo: Constants / Archivo: shopCatalog
// Afecta: ShopScreen, InventoryContext
// Propósito: Definir catálogo completo de items por categoría y rareza
// Puntos de edición futura: migrar a JSON externo, agregar validación
// Autor: Sebastian Vega - Fecha: 2025-11-24
```

---

## 🏷️ Nomenclatura

### Archivos

#### Componentes
- **PascalCase** para componentes React
- Sufijo `.js` para componentes
- Sufijo `.styles.js` para estilos separados

```
✅ ShopItemCard.js
✅ ShopItemCard.styles.js
❌ shopItemCard.js
❌ shop-item-card.js
```

#### Hooks
- Prefijo `use` + **PascalCase**
- Siempre en carpeta `hooks/`

```
✅ useShopPurchase.js
✅ useTaskManagement.js
❌ shopPurchaseHook.js
❌ UseShopPurchase.js
```

#### Servicios
- **camelCase** + sufijo `Service`
- Siempre en carpeta `services/`

```
✅ catalogService.js
✅ taskService.js
❌ CatalogService.js
❌ catalog-service.js
```

#### Utilidades
- **camelCase**
- Siempre en carpeta `utils/`

```
✅ errorTracker.js
✅ rand.js
❌ ErrorTracker.js
```

### Variables y Funciones

#### Variables
```javascript
// ✅ Correcto
const userName = "Sebastian";
const itemCount = 10;
const isLoading = false;

// ❌ Incorrecto
const UserName = "Sebastian";
const item_count = 10;
const loading = false; // Usar prefijo is/has para booleanos
```

#### Constantes
```javascript
// ✅ Correcto - UPPER_SNAKE_CASE para constantes globales
const MAX_ITEMS = 100;
const API_BASE_URL = "https://api.example.com";
const CURRENCIES = { MANA: "mana", COIN: "coin" };

// ✅ Correcto - camelCase para constantes locales/configuración
const defaultConfig = { timeout: 5000 };
const elementOptions = [...];
```

#### Funciones
```javascript
// ✅ Correcto - camelCase, verbos descriptivos
function calculateTotalPrice(items) { }
function handlePurchase(item) { }
function validateUserInput(input) { }

// ❌ Incorrecto
function CalculateTotalPrice(items) { }
function purchase(item) { } // Falta verbo
function validate(input) { } // Muy genérico
```

#### Componentes React
```javascript
// ✅ Correcto - PascalCase
function ShopItemCard({ item }) { }
const TaskList = ({ tasks }) => { };

// ❌ Incorrecto
function shopItemCard({ item }) { }
const task_list = ({ tasks }) => { };
```

---

## 🧩 Estructura de Componentes

### Orden de Elementos

```javascript
// [MB] Header aquí

// 1. Imports
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppState } from '../state/AppContext';
import CustomComponent from './CustomComponent';
import { Colors } from '../theme';
import styles from './Component.styles';

// 2. Constantes locales
const DEFAULT_TIMEOUT = 5000;
const ITEMS_PER_PAGE = 20;

// 3. Componente principal
export default function MyComponent({ prop1, prop2 }) {
  // 3.1 Hooks (siempre al inicio)
  const navigation = useNavigation();
  const { mana } = useAppState();
  const [loading, setLoading] = useState(false);
  
  // 3.2 useEffect
  useEffect(() => {
    // Lógica de efecto
  }, []);
  
  // 3.3 Funciones de manejo
  const handlePress = () => {
    // Lógica
  };
  
  // 3.4 Renderizado condicional (si es complejo)
  if (loading) {
    return <LoadingSpinner />;
  }
  
  // 3.5 Return principal
  return (
    <View style={styles.container}>
      <Text>{prop1}</Text>
    </View>
  );
}

// 4. PropTypes (si se usan)
MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

// 5. Componentes auxiliares (si son pequeños y específicos)
function AuxiliaryComponent() {
  return <View />;
}
```

### Componentes Pequeños vs Grandes

#### Componente Pequeño (< 100 líneas)
- Todo en un archivo
- Estilos al final con `StyleSheet.create`

#### Componente Grande (> 100 líneas)
- Separar estilos en `.styles.js`
- Considerar dividir en sub-componentes
- Extraer lógica a custom hooks

---

## 📦 Imports y Exports

### Orden de Imports

```javascript
// 1. React y React Native
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Librerías externas
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 3. Contextos y estado
import { useAppState, useAppDispatch } from '../state/AppContext';

// 4. Componentes propios
import CustomButton from '../components/CustomButton';
import TaskCard from '../components/TaskCard';

// 5. Hooks personalizados
import useTaskManagement from '../hooks/useTaskManagement';

// 6. Servicios y utilidades
import { calculateReward } from '../services/taskService';
import { formatDate } from '../utils/dateUtils';

// 7. Constantes
import { Colors, Spacing } from '../theme';
import { TASK_PRIORITIES } from '../constants/tasks';

// 8. Estilos (si están separados)
import styles from './Component.styles';
```

### Exports

```javascript
// ✅ Correcto - Export default para componente principal
export default function MyComponent() { }

// ✅ Correcto - Named exports para utilidades/hooks
export function useCustomHook() { }
export const CONSTANT = 'value';

// ❌ Evitar - Mezclar default y named en componentes
export default MyComponent;
export const AnotherComponent = () => { }; // Mejor en archivo separado
```

---

## 🎨 Estado y Props

### Destructuring de Props

```javascript
// ✅ Correcto - Destructuring en parámetros
function TaskCard({ title, priority, onPress }) {
  return <View />;
}

// ❌ Evitar - Props sin destructuring
function TaskCard(props) {
  return <Text>{props.title}</Text>;
}
```

### Estado con useState

```javascript
// ✅ Correcto - Nombres descriptivos
const [isLoading, setIsLoading] = useState(false);
const [tasks, setTasks] = useState([]);
const [selectedItem, setSelectedItem] = useState(null);

// ❌ Evitar - Nombres genéricos
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);
const [item, setItem] = useState(null);
```

### PropTypes (Recomendado)

```javascript
import PropTypes from 'prop-types';

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  priority: PropTypes.oneOf(['Baja', 'Media', 'Alta', 'Urgente']).isRequired,
  onPress: PropTypes.func,
  completed: PropTypes.bool,
};

TaskCard.defaultProps = {
  onPress: () => {},
  completed: false,
};
```

---

## 🎨 Estilos

### Ubicación

#### Componente Pequeño
```javascript
// Al final del archivo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
```

#### Componente Grande
```javascript
// Archivo separado: Component.styles.js
import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.base,
  },
});
```

### Nomenclatura de Estilos

```javascript
// ✅ Correcto - camelCase descriptivo
const styles = StyleSheet.create({
  container: { },
  headerTitle: { },
  primaryButton: { },
  errorText: { },
});

// ❌ Evitar - snake_case o nombres genéricos
const styles = StyleSheet.create({
  main_container: { },
  text1: { },
  btn: { },
});
```

### Usar Constantes del Theme

```javascript
// ✅ Correcto - Usar constantes
import { Colors, Spacing, Typography } from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: Spacing.base,
  },
  title: {
    fontSize: Typography.sizes.large,
    color: Colors.text,
  },
});

// ❌ Evitar - Valores hardcodeados
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
  },
});
```

---

## 💬 Comentarios

### Cuándo Comentar

```javascript
// ✅ Comentar lógica compleja
// Calculamos el precio final aplicando descuento por rareza
// y multiplicando por cantidad, con un mínimo de 1 moneda
const finalPrice = Math.max(1, basePrice * (1 - rarityDiscount) * quantity);

// ✅ Comentar decisiones de diseño
// Usamos setTimeout en lugar de useEffect para evitar
// re-renders durante la animación de cierre
setTimeout(() => setVisible(false), 300);

// ❌ Evitar comentarios obvios
// Incrementa el contador
setCount(count + 1);
```

### TODOs y FIXMEs

```javascript
// ✅ Formato correcto
// TODO: Implementar validación de email
// FIXME: El scroll no funciona en iOS 14
// NOTE: Esta función será deprecada en v2.0

// ❌ Evitar TODOs sin contexto
// TODO: arreglar esto
// FIXME: bug
```

### Comentarios de Sección

```javascript
// ========================================
// Handlers de Eventos
// ========================================

const handlePurchase = () => { };
const handleCancel = () => { };

// ========================================
// Renderizado Condicional
// ========================================

if (loading) return <Spinner />;
```

---

## 🔀 Git Commits

### Formato de Commits

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `refactor`: Refactorización sin cambio funcional
- `style`: Cambios de formato (no afectan código)
- `docs`: Documentación
- `test`: Tests
- `chore`: Tareas de mantenimiento

### Ejemplos

```bash
# ✅ Correcto
feat(shop): add multi-currency purchase validation
fix(tasks): resolve duplicate task creation bug
refactor(context): split AppContext into specialized contexts
docs(readme): update installation instructions

# ❌ Evitar
update files
fix bug
changes
WIP
```

### Commits Atómicos

```bash
# ✅ Un commit por cambio lógico
git commit -m "feat(shop): add purchase validation"
git commit -m "test(shop): add tests for purchase flow"

# ❌ Commits gigantes
git commit -m "add shop, fix bugs, update docs"
```

---

## 📊 Checklist de Revisión

Antes de hacer commit, verificar:

- [ ] ¿Tiene header `[MB]` el archivo?
- [ ] ¿Los nombres siguen las convenciones?
- [ ] ¿Los imports están ordenados?
- [ ] ¿Se usan constantes del theme?
- [ ] ¿Hay console.log olvidados?
- [ ] ¿Los comentarios son útiles?
- [ ] ¿El commit message es descriptivo?
- [ ] ¿Se probó el cambio?

---

## 🎯 Recursos

- [React Native Best Practices](https://reactnative.dev/docs/performance)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Última actualización:** 2025-11-24  
**Mantenedor:** Sebastian Vega  
**Versión:** 1.0.0
