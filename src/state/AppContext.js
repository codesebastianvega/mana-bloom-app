// [MB] Módulo: Estado / Archivo: AppContext
// Afecta: toda la app
// Propósito: Proveer estado global para maná y estado de la planta
// Puntos de edición futura: persistencia con AsyncStorage
// Autor: Codex - Fecha: 2025-08-12

import React, { createContext, useContext, useReducer } from "react";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = { mana: 50, plantState: "Floreciendo" };

function appReducer(state, action) {
  switch (action.type) {
    case "SET_MANA":
      return { ...state, mana: action.payload };
    case "SET_PLANT_STATE":
      return { ...state, plantState: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
}

export function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within an AppProvider");
  }
  return context;
}
