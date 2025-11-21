// [MB] Módulo: Utils / Archivo: Error Tracker
// Propósito: Capturar y loggear errores con stack traces completos
// Autor: Mana Bloom Team - Fecha: 2025-11-21

/**
 * Global error handler
 * Captures all unhandled errors and logs them with full stack traces
 */
export function setupGlobalErrorHandler() {
  // Capture unhandled promise rejections
  if (typeof global !== 'undefined') {
    const originalHandler = global.ErrorUtils?.getGlobalHandler();
    
    global.ErrorUtils?.setGlobalHandler((error, isFatal) => {
      console.error('═══════════════════════════════════════');
      console.error('🔴 GLOBAL ERROR CAUGHT');
      console.error('═══════════════════════════════════════');
      console.error('Error:', error);
      console.error('Message:', error?.message);
      console.error('Stack:', error?.stack);
      console.error('Is Fatal:', isFatal);
      console.error('═══════════════════════════════════════');
      
      // Call original handler
      if (originalHandler) {
        originalHandler(error, isFatal);
      }
    });
  }
  
  console.log('✅ Global error handler installed');
}

/**
 * Wrap a function with error tracking
 */
export function trackErrors(fn, context = 'Unknown') {
  return function(...args) {
    try {
      const result = fn.apply(this, args);
      
      // Handle promises
      if (result && typeof result.then === 'function') {
        return result.catch(error => {
          console.error(`═══ Error in ${context} ═══`);
          console.error('Error:', error);
          console.error('Message:', error?.message);
          console.error('Stack:', error?.stack);
          console.error('Args:', args);
          throw error;
        });
      }
      
      return result;
    } catch (error) {
      console.error(`═══ Error in ${context} ═══`);
      console.error('Error:', error);
      console.error('Message:', error?.message);
      console.error('Stack:', error?.stack);
      console.error('Args:', args);
      throw error;
    }
  };
}
