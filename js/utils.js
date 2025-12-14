/**
 * ============================================================================
 * ARCHIVO: utils.js
 * ============================================================================
 * 
 * PROPÓSITO:
 * Este archivo contiene funciones auxiliares reutilizables para crear gráficos
 * con D3.js. Incluye funciones para tooltips, creación de SVG, ejes, estadísticas
 * y otras utilidades comunes.
 * 
 * FUNCIONES PRINCIPALES:
 * - Tooltips: createTooltip, showTooltip, hideTooltip
 * - SVG: createSVG
 * - Ejes: createAxes
 * - Estadísticas: calculateStats
 * - Utilidades: formatNumber, createColorLegend, transition
 * 
 * USO:
 * Se carga después de config.js en todas las páginas HTML.
 * Las funciones están disponibles globalmente.
 * 
 * ============================================================================
 */

// ============================================================================
// SECCIÓN 1: TOOLTIPS (Información al pasar el mouse)
// ============================================================================

/**
 * Crea un elemento tooltip (información emergente) estándar
 * 
 * @param {string} container - Selector CSS del contenedor (ej: 'body', '#chart')
 * @returns {object} Selección D3 del tooltip creado
 * 
 * CARACTERÍSTICAS:
 * - Inicialmente invisible (opacity: 0)
 * - Fondo oscuro semitransparente
 * - Texto blanco
 * - No interfiere con eventos del mouse (pointer-events: none)
 * - Alto z-index para aparecer sobre otros elementos
 * 
 * EJEMPLO DE USO:
 * const tooltip = createTooltip('body');
 * // Luego usar con showTooltip() y hideTooltip()
 */
function createTooltip(container) {
    return d3.select(container)
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)                    // Invisible inicialmente
        .style('position', 'absolute')          // Posicionamiento absoluto
        .style('padding', '10px')               // Espaciado interno
        .style('background', 'rgba(0, 0, 0, 0.8)') // Fondo negro semitransparente
        .style('color', 'white')                // Texto blanco
        .style('border-radius', '5px')          // Bordes redondeados
        .style('pointer-events', 'none')        // No captura eventos del mouse
        .style('font-size', '12px')            // Tamaño de fuente
        .style('z-index', '1000');              // Aparece sobre otros elementos
}

/**
 * Muestra el tooltip con contenido y lo posiciona cerca del cursor
 * 
 * @param {object} tooltip - Selección D3 del tooltip (de createTooltip)
 * @param {string} content - Contenido HTML a mostrar
 * @param {object} event - Evento del mouse (para obtener posición)
 * 
 * EJEMPLO DE USO:
 * element.on('mouseover', function(event, d) {
 *     showTooltip(tooltip, `Valor: ${d.value}`, event);
 * });
 */
function showTooltip(tooltip, content, event) {
    tooltip
        .style('opacity', 1)                           // Hacer visible
        .html(content)                                  // Establecer contenido HTML
        .style('left', (event.pageX + 10) + 'px')      // Posición X: cursor + 10px
        .style('top', (event.pageY - 10) + 'px');       // Posición Y: cursor - 10px
}

/**
 * Oculta el tooltip
 * 
 * @param {object} tooltip - Selección D3 del tooltip
 * 
 * EJEMPLO DE USO:
 * element.on('mouseout', function() {
 *     hideTooltip(tooltip);
 * });
 */
function hideTooltip(tooltip) {
    tooltip.style('opacity', 0);  // Hacer invisible
}

// ============================================================================
// SECCIÓN 2: CREACIÓN DE SVG
// ============================================================================

/**
 * Crea un elemento SVG con dimensiones y márgenes estándar
 * 
 * Esta es la función más importante del archivo. Crea la estructura base
 * para cualquier gráfico D3.js.
 * 
 * @param {string} container - Selector CSS del contenedor (ej: '#chart1')
 * @param {number} width - Ancho total del SVG (opcional, usa default si no se especifica)
 * @param {number} height - Alto total del SVG (opcional, usa default si no se especifica)
 * @param {object} margin - Márgenes personalizados (opcional)
 * @returns {object} Objeto con { svg, g, dims }
 *   - svg: Selección D3 del elemento SVG raíz
 *   - g: Selección D3 del grupo interno (con márgenes aplicados)
 *   - dims: Objeto con todas las dimensiones (width, height, margin, innerWidth, innerHeight)
 * 
 * ESTRUCTURA CREADA:
 * <svg width="800" height="500">
 *   <g transform="translate(40, 20)">  <!-- Grupo interno con márgenes -->
 *     <!-- Aquí se dibujan los elementos del gráfico -->
 *   </g>
 * </svg>
 * 
 * EJEMPLO DE USO:
 * const { svg, g, dims } = createSVG('#chart1', 800, 500);
 * // Ahora puedes usar 'g' para agregar elementos del gráfico
 * // y 'dims.innerWidth' / 'dims.innerHeight' para las dimensiones útiles
 */
function createSVG(container, width, height, margin) {
    // Obtener dimensiones con márgenes (usa defaults si no se especifican)
    const dims = D3Config.getDimensions(width, height, margin);
    
    // Crear elemento SVG en el contenedor
    const svg = d3.select(container)
        .append('svg')
        .attr('width', dims.width)   // Ancho total
        .attr('height', dims.height); // Alto total
    
    // Crear grupo interno con transformación para aplicar márgenes
    // Este grupo es donde se dibujan todos los elementos del gráfico
    const g = svg.append('g')
        .attr('transform', `translate(${dims.margin.left},${dims.margin.top})`);
    
    // Retornar SVG, grupo y dimensiones para uso posterior
    return { svg, g, dims };
}

// ============================================================================
// SECCIÓN 3: CREACIÓN DE EJES
// ============================================================================

/**
 * Crea ejes X e Y estándar con etiquetas y formato personalizable
 * 
 * Esta función crea ambos ejes (X e Y) con todas las opciones comunes.
 * Es más simple que createCustomXAxis/createCustomYAxis pero suficiente
 * para la mayoría de los casos.
 * 
 * @param {object} g - Selección D3 del grupo SVG (de createSVG)
 * @param {object} xScale - Escala D3 para el eje X (scaleLinear, scaleBand, etc.)
 * @param {object} yScale - Escala D3 para el eje Y
 * @param {object} dims - Objeto de dimensiones (de createSVG)
 * @param {object} options - Opciones de personalización (opcional)
 *   - xLabel: Texto de etiqueta del eje X
 *   - yLabel: Texto de etiqueta del eje Y
 *   - xFormat: Función de formato para valores del eje X (ej: d3.format('.0f'))
 *   - yFormat: Función de formato para valores del eje Y
 *   - xTicks: Número de ticks en el eje X (null = automático)
 *   - yTicks: Número de ticks en el eje Y
 *   - rotateXLabels: Si es true, rota las etiquetas del eje X -45 grados
 * 
 * @returns {object} Objeto con { xAxis, yAxis } (los generadores de ejes)
 * 
 * EJEMPLO DE USO:
 * const xScale = d3.scaleLinear().domain([0, 100]).range([0, dims.innerWidth]);
 * const yScale = d3.scaleLinear().domain([0, 50]).range([dims.innerHeight, 0]);
 * createAxes(g, xScale, yScale, dims, {
 *     xLabel: 'Tiempo (años)',
 *     yLabel: 'Población (millones)',
 *     xFormat: d3.format('d'),
 *     yFormat: d3.format('.1f')
 * });
 */
function createAxes(g, xScale, yScale, dims, options = {}) {
    // Extraer opciones con valores por defecto
    const {
        xLabel = '',           // Sin etiqueta por defecto
        yLabel = '',           // Sin etiqueta por defecto
        xFormat = null,        // Sin formato por defecto
        yFormat = null,        // Sin formato por defecto
        xTicks = null,         // Ticks automáticos por defecto
        yTicks = null,         // Ticks automáticos por defecto
        rotateXLabels = false  // Sin rotación por defecto
    } = options;
    
    // ========================================================================
    // EJE X (Horizontal, en la parte inferior)
    // ========================================================================
    const xAxis = d3.axisBottom(xScale);  // Crea generador de eje inferior
    if (xFormat) xAxis.tickFormat(xFormat);  // Aplicar formato si se especifica
    if (xTicks !== null) xAxis.ticks(xTicks); // Número de ticks si se especifica
    
    // Agregar el eje al SVG
    g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${dims.innerHeight})`)  // Posicionar en la parte inferior
        .call(xAxis);  // Ejecutar el generador de ejes
    
    // Rotar etiquetas si es necesario (útil cuando hay muchas categorías)
    if (rotateXLabels) {
        g.selectAll('.x-axis text')
            .attr('transform', 'rotate(-45)')  // Rotar -45 grados
            .style('text-anchor', 'end')       // Anclar al final
            .attr('dx', '-.8em')               // Ajuste horizontal
            .attr('dy', '.15em');              // Ajuste vertical
    }
    
    // Agregar etiqueta del eje X (debajo del eje)
    if (xLabel) {
        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', `translate(${dims.innerWidth / 2}, ${dims.innerHeight + 35})`)
            .style('text-anchor', 'middle')  // Centrar texto
            .text(xLabel);
    }
    
    // ========================================================================
    // EJE Y (Vertical, en el lado izquierdo)
    // ========================================================================
    const yAxis = d3.axisLeft(yScale);  // Crea generador de eje izquierdo
    if (yFormat) yAxis.tickFormat(yFormat);  // Aplicar formato si se especifica
    if (yTicks !== null) yAxis.ticks(yTicks); // Número de ticks si se especifica
    
    // Agregar el eje al SVG
    g.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);  // Ejecutar el generador de ejes
    
    // Agregar etiqueta del eje Y (a la izquierda, rotada)
    if (yLabel) {
        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')  // Rotar -90 grados (vertical)
            .attr('y', 0 - dims.margin.left)   // Posición Y
            .attr('x', 0 - (dims.innerHeight / 2))  // Posición X (centrado)
            .attr('dy', '1em')                 // Ajuste vertical
            .style('text-anchor', 'middle')     // Centrar texto
            .text(yLabel);
    }
    
    return { xAxis, yAxis };  // Retornar generadores por si se necesitan después
}

// ============================================================================
// SECCIÓN 4: UTILIDADES DE FORMATO
// ============================================================================

/**
 * Formatea un número según el formato especificado en D3Config
 * 
 * @param {number} value - Valor numérico a formatear
 * @param {string} format - Tipo de formato ('number', 'integer', 'percentage', 'currency')
 * @returns {string} Valor formateado como string
 * 
 * EJEMPLO DE USO:
 * formatNumber(1234.56, 'number');     // "1,234.56"
 * formatNumber(1234.56, 'integer');    // "1,235"
 * formatNumber(0.123, 'percentage');   // "12.3%"
 * formatNumber(1234.56, 'currency');   // "$1,234.56"
 */
function formatNumber(value, format = 'number') {
    return D3Config.formats[format] ? D3Config.formats[format](value) : value;
}

// ============================================================================
// SECCIÓN 5: ESTADÍSTICAS DESCRIPTIVAS
// ============================================================================

/**
 * Calcula estadísticas descriptivas de un conjunto de datos numéricos
 * 
 * Esta función es útil para gráficos de caja y bigotes, histogramas,
 * y cualquier visualización que necesite estadísticas.
 * 
 * @param {array} data - Array de números
 * @returns {object} Objeto con las siguientes propiedades:
 *   - min: Valor mínimo
 *   - max: Valor máximo
 *   - mean: Media (promedio)
 *   - median: Mediana (valor del medio)
 *   - q1: Primer cuartil (25%)
 *   - q3: Tercer cuartil (75%)
 *   - iqr: Rango intercuartílico (Q3 - Q1)
 *   - std: Desviación estándar
 *   - outliers: Array de valores atípicos (fuera de Q1-1.5*IQR o Q3+1.5*IQR)
 * 
 * EJEMPLO DE USO:
 * const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
 * const stats = calculateStats(data);
 * console.log(stats.median);  // 55
 * console.log(stats.mean);     // 55
 */
function calculateStats(data) {
    // Ordenar datos para calcular cuartiles
    const sorted = [...data].sort((a, b) => a - b);
    
    // Calcular cuartiles usando d3.quantile
    const q1 = d3.quantile(sorted, 0.25);  // Primer cuartil (25%)
    const median = d3.quantile(sorted, 0.5);  // Mediana (50%)
    const q3 = d3.quantile(sorted, 0.75);  // Tercer cuartil (75%)
    const iqr = q3 - q1;  // Rango intercuartílico
    
    // Retornar todas las estadísticas
    return {
        min: d3.min(data),              // Valor mínimo
        max: d3.max(data),              // Valor máximo
        mean: d3.mean(data),            // Media aritmética
        median: median,                 // Mediana
        q1: q1,                         // Primer cuartil
        q3: q3,                         // Tercer cuartil
        iqr: iqr,                       // Rango intercuartílico
        std: d3.deviation(data),        // Desviación estándar
        // Valores atípicos: fuera de [Q1 - 1.5*IQR, Q3 + 1.5*IQR]
        outliers: data.filter(d => d < q1 - 1.5 * iqr || d > q3 + 1.5 * iqr)
    };
}

// ============================================================================
// SECCIÓN 6: LEYENDAS
// ============================================================================

/**
 * Crea una leyenda de colores básica
 * 
 * @param {string} container - Selector CSS del contenedor
 * @param {object} scale - Escala de colores D3
 * @param {string} title - Título de la leyenda (opcional)
 * @returns {object} Selección D3 de la leyenda
 * 
 * NOTA: Esta es una implementación básica. Puede extenderse según necesidad.
 */
function createColorLegend(container, scale, title = '') {
    const legend = d3.select(container)
        .append('div')
        .attr('class', 'color-legend');
    
    if (title) {
        legend.append('div')
            .attr('class', 'legend-title')
            .text(title);
    }
    
    // Implementación básica - puede extenderse según necesidad
    return legend;
}

// ============================================================================
// SECCIÓN 7: ANIMACIONES Y TRANSICIONES
// ============================================================================

/**
 * Crea una transición suave para elementos D3
 * 
 * @param {object} selection - Selección D3 a la que aplicar la transición
 * @param {number} duration - Duración en milisegundos (opcional, usa default de D3Config)
 * @returns {object} Objeto de transición D3
 * 
 * EJEMPLO DE USO:
 * transition(rects)
 *     .attr('height', d => yScale(d.value))
 *     .attr('y', d => dims.innerHeight - yScale(d.value));
 */
function transition(selection, duration = null) {
    const dur = duration || D3Config.animation.duration;
    return selection
        .transition()
        .duration(dur)
        .ease(D3Config.animation.ease);
}

// ============================================================================
// EXPORTAR FUNCIONES GLOBALMENTE
// ============================================================================
// Hace todas las funciones disponibles globalmente para uso en las páginas HTML
window.createTooltip = createTooltip;
window.showTooltip = showTooltip;
window.hideTooltip = hideTooltip;
window.createSVG = createSVG;
window.createAxes = createAxes;
window.formatNumber = formatNumber;
window.calculateStats = calculateStats;
window.createColorLegend = createColorLegend;
window.transition = transition;

