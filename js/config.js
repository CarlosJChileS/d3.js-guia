/**
 * ============================================================================
 * ARCHIVO: config.js
 * ============================================================================
 * 
 * PROPÓSITO:
 * Este archivo contiene la configuración global del proyecto D3.js.
 * Define valores por defecto para dimensiones, colores, formatos y animaciones
 * que se utilizan en todos los gráficos del proyecto.
 * 
 * ESTRUCTURA:
 * - D3Config: Objeto principal con toda la configuración
 * - Funciones auxiliares para obtener dimensiones y colores
 * 
 * USO:
 * Se carga en todas las páginas HTML antes de crear los gráficos.
 * Acceso: D3Config.colors, D3Config.formats, etc.
 * 
 * ============================================================================
 */

// ============================================================================
// OBJETO PRINCIPAL DE CONFIGURACIÓN
// ============================================================================
const D3Config = {
    
    // ========================================================================
    // DIMENSIONES POR DEFECTO
    // ========================================================================
    // Estas dimensiones se usan cuando no se especifican dimensiones personalizadas
    // en las funciones createSVG() o getDimensions()
    defaultWidth: 800,   // Ancho por defecto en píxeles
    defaultHeight: 500,  // Alto por defecto en píxeles
    
    // Márgenes: espacio reservado para ejes, etiquetas y leyendas
    margin: {
        top: 20,     // Espacio superior (para títulos)
        right: 20,   // Espacio derecho (para leyendas)
        bottom: 40,  // Espacio inferior (para eje X y etiquetas)
        left: 40     // Espacio izquierdo (para eje Y y etiquetas)
    },

    // ========================================================================
    // PALETAS DE COLORES
    // ========================================================================
    colors: {
        // Paleta categórica: Para datos discretos (categorías, grupos)
        // Se usa cuando necesitas colores diferentes para cada categoría
        // Ejemplo: Gráfico de barras con múltiples categorías
        categorical: [
            '#4a90e2', // Azul
            '#50c878', // Verde
            '#f39c12', // Naranja
            '#e74c3c', // Rojo
            '#9b59b6', // Morado
            '#1abc9c', // Turquesa
            '#f1c40f', // Amarillo
            '#e67e22', // Naranja oscuro
            '#3498db', // Azul claro
            '#95a5a6'  // Gris
        ],
        
        // Paleta secuencial: Para datos continuos (valores numéricos)
        // Se usa en mapas de calor, gráficos de densidad
        // d3.interpolateBlues: De blanco (valores bajos) a azul (valores altos)
        sequential: d3.interpolateBlues,
        
        // Versión reversa: De amarillo/naranja (valores bajos) a rojo (valores altos)
        sequentialReverse: d3.interpolateYlOrRd,
        
        // Paleta divergente: Para datos con punto medio (positivos/negativos)
        // Se usa en mapas de correlación, diferencias
        // d3.interpolateRdBu: De rojo (negativo) a blanco (cero) a azul (positivo)
        divergent: d3.interpolateRdBu,
        
        // Colores específicos para casos comunes
        positive: '#4caf50',  // Verde para valores positivos
        negative: '#f44336',  // Rojo para valores negativos
        neutral: '#9e9e9e',   // Gris para valores neutros
        highlight: '#ff9800'  // Naranja para destacar
    },

    // ========================================================================
    // FORMATOS DE DATOS
    // ========================================================================
    // Funciones de formato de D3.js para mostrar datos de forma legible
    formats: {
        number: d3.format(',.2f'),        // Números: 1,234.56
        integer: d3.format(',d'),         // Enteros: 1,234
        percentage: d3.format('.1%'),      // Porcentajes: 12.3%
        currency: d3.format('$,.2f'),      // Moneda: $1,234.56
        date: d3.timeFormat('%Y-%m-%d'),  // Fecha: 2024-01-15
        dateShort: d3.timeFormat('%b %d'), // Fecha corta: Jan 15
        dateLong: d3.timeFormat('%B %d, %Y') // Fecha larga: January 15, 2024
    },

    // ========================================================================
    // CONFIGURACIÓN DE ANIMACIONES
    // ========================================================================
    animation: {
        duration: 750,              // Duración en milisegundos (0.75 segundos)
        delay: 0,                   // Retraso antes de iniciar
        ease: d3.easeCubicInOut     // Función de suavizado (acelera y desacelera)
    },

    // ========================================================================
    // TEMA ACTUAL
    // ========================================================================
    theme: 'light'  // 'light' o 'dark' (para futuras implementaciones)
};

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

/**
 * Obtiene las dimensiones del gráfico incluyendo márgenes
 * 
 * @param {number} customWidth - Ancho personalizado (opcional)
 * @param {number} customHeight - Alto personalizado (opcional)
 * @param {object} customMargin - Márgenes personalizados (opcional)
 * @returns {object} Objeto con width, height, margin, innerWidth, innerHeight
 * 
 * EJEMPLO DE USO:
 * const dims = D3Config.getDimensions(800, 500);
 * console.log(dims.innerWidth); // 740 (800 - 40 - 20)
 * console.log(dims.innerHeight); // 440 (500 - 40 - 20)
 */
D3Config.getDimensions = function(customWidth, customHeight, customMargin) {
    const width = customWidth || this.defaultWidth;
    const height = customHeight || this.defaultHeight;
    const margin = customMargin || this.margin;
    
    return {
        width: width,                                    // Ancho total
        height: height,                                  // Alto total
        margin: margin,                                  // Márgenes
        innerWidth: width - margin.left - margin.right,  // Ancho útil (sin márgenes)
        innerHeight: height - margin.top - margin.bottom // Alto útil (sin márgenes)
    };
};

/**
 * Obtiene un color de la paleta categórica por índice
 * 
 * @param {number} index - Índice del color (0-9, se repite si es mayor)
 * @returns {string} Color en formato hexadecimal
 * 
 * EJEMPLO DE USO:
 * const color1 = D3Config.getColor(0); // '#4a90e2' (azul)
 * const color2 = D3Config.getColor(1); // '#50c878' (verde)
 * const color3 = D3Config.getColor(10); // '#4a90e2' (azul, se repite)
 */
D3Config.getColor = function(index) {
    return this.colors.categorical[index % this.colors.categorical.length];
};

/**
 * Crea una escala de colores secuencial para mapas de calor
 * 
 * @param {array} domain - Rango de valores [min, max]
 * @param {boolean} reverse - Si es true, usa la paleta reversa (opcional)
 * @returns {function} Función que mapea un valor a un color
 * 
 * EJEMPLO DE USO:
 * const colorScale = D3Config.createSequentialScale([0, 100]);
 * const color = colorScale(50); // Color intermedio entre blanco y azul
 * 
 * const colorScaleRev = D3Config.createSequentialScale([0, 100], true);
 * const color2 = colorScaleRev(50); // Color intermedio entre amarillo y rojo
 */
D3Config.createSequentialScale = function(domain, reverse = false) {
    // Selecciona el interpolador según si es reverso o no
    const interpolator = reverse ? this.colors.sequentialReverse : this.colors.sequential;
    
    // Crea y retorna la escala secuencial de D3
    return d3.scaleSequential(interpolator).domain(domain);
};

// ============================================================================
// EXPORTAR PARA USO GLOBAL
// ============================================================================
// Hace el objeto D3Config disponible globalmente en todas las páginas
window.D3Config = D3Config;

