/**
 * ============================================================================
 * ARCHIVO: axes.js
 * ============================================================================
 * 
 * PROPÓSITO:
 * Este archivo contiene funciones avanzadas para crear y personalizar ejes
 * en gráficos D3.js. Proporciona más control que createAxes() de utils.js.
 * 
 * FUNCIONES PRINCIPALES:
 * - createCustomXAxis: Eje X con opciones avanzadas
 * - createCustomYAxis: Eje Y con opciones avanzadas
 * - createGrid: Cuadrícula de fondo para mejor lectura
 * - updateAxis: Actualizar ejes dinámicamente
 * 
 * DIFERENCIAS CON utils.js:
 * - Más opciones de personalización (tickSize, tickPadding, posición)
 * - Control individual de cada eje
 * - Soporte para ejes en la parte superior/derecha
 * 
 * USO:
 * Se carga después de utils.js. Útil para gráficos complejos como Pareto,
 * gráficos con múltiples ejes Y, etc.
 * 
 * ============================================================================
 */

// ============================================================================
// SECCIÓN 1: EJE X PERSONALIZADO
// ============================================================================

/**
 * Crea un eje X personalizado con opciones avanzadas
 * 
 * Esta función ofrece más control que createAxes() para casos especiales
 * como gráficos de Pareto (que necesitan dos ejes Y) o cuando necesitas
 * ejes en la parte superior.
 * 
 * @param {object} g - Selección D3 del grupo SVG (de createSVG)
 * @param {object} scale - Escala D3 para el eje X (scaleLinear, scaleBand, scaleTime, etc.)
 * @param {object} dims - Objeto de dimensiones (de createSVG)
 * @param {object} options - Opciones de personalización
 *   - label: Texto de etiqueta del eje (string)
 *   - format: Función de formato para valores (ej: d3.format('.0f'))
 *   - ticks: Número de ticks (number o null para automático)
 *   - tickSize: Longitud de las marcas de los ticks (default: 6)
 *   - tickPadding: Espacio entre tick y etiqueta (default: 3)
 *   - rotate: Ángulo de rotación de etiquetas en grados (default: 0)
 *   - position: 'bottom' o 'top' (default: 'bottom')
 * 
 * @returns {object} Selección D3 del grupo del eje
 * 
 * EJEMPLO DE USO:
 * const xScale = d3.scaleBand().domain(categories).range([0, width]);
 * createCustomXAxis(g, xScale, dims, {
 *     label: 'Categorías',
 *     rotate: -45,  // Rotar etiquetas -45 grados
 *     tickSize: 8,
 *     position: 'bottom'
 * });
 */
function createCustomXAxis(g, scale, dims, options = {}) {
    const {
        label = '',
        format = null,
        ticks = null,
        tickSize = 6,
        tickPadding = 3,
        rotate = 0,
        position = 'bottom'
    } = options;
    
    let axis;
    if (position === 'bottom') {
        axis = d3.axisBottom(scale);
    } else if (position === 'top') {
        axis = d3.axisTop(scale);
    }
    
    if (format) axis.tickFormat(format);
    if (ticks !== null) axis.ticks(ticks);
    axis.tickSize(tickSize);
    axis.tickPadding(tickPadding);
    
    const axisGroup = g.append('g')
        .attr('class', 'x-axis custom');
    
    if (position === 'bottom') {
        axisGroup.attr('transform', `translate(0,${dims.innerHeight})`);
    }
    
    axisGroup.call(axis);
    
    // Rotar etiquetas si es necesario
    if (rotate !== 0) {
        axisGroup.selectAll('text')
            .attr('transform', `rotate(${rotate})`)
            .style('text-anchor', rotate < 0 ? 'end' : 'start')
            .attr('dx', rotate < 0 ? '-.8em' : '.8em')
            .attr('dy', rotate < 0 ? '.15em' : '-.15em');
    }
    
    // Agregar etiqueta
    if (label) {
        const labelY = position === 'bottom' ? dims.innerHeight + 35 : -15;
        g.append('text')
            .attr('class', 'axis-label x-label')
            .attr('transform', `translate(${dims.innerWidth / 2}, ${labelY})`)
            .style('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('font-weight', 'bold')
            .text(label);
    }
    
    return axisGroup;
}

// ============================================================================
// SECCIÓN 2: EJE Y PERSONALIZADO
// ============================================================================

/**
 * Crea un eje Y personalizado con opciones avanzadas
 * 
 * Útil para gráficos con múltiples ejes Y (como Pareto) o cuando necesitas
 * el eje Y en el lado derecho.
 * 
 * @param {object} g - Selección D3 del grupo SVG
 * @param {object} scale - Escala D3 para el eje Y
 * @param {object} dims - Objeto de dimensiones
 * @param {object} options - Opciones de personalización
 *   - label: Texto de etiqueta del eje
 *   - format: Función de formato para valores
 *   - ticks: Número de ticks
 *   - tickSize: Longitud de las marcas (default: 6)
 *   - tickPadding: Espacio entre tick y etiqueta (default: 3)
 *   - position: 'left' o 'right' (default: 'left')
 * 
 * @returns {object} Selección D3 del grupo del eje
 * 
 * EJEMPLO DE USO (Pareto con dos ejes Y):
 * // Eje Y izquierdo (valores)
 * createCustomYAxis(g, yScale, dims, {
 *     label: 'Frecuencia',
 *     position: 'left'
 * });
 * 
 * // Eje Y derecho (porcentaje)
 * const yAxisRight = d3.axisRight(yScalePercent);
 * g.append('g')
 *     .attr('transform', `translate(${dims.innerWidth}, 0)`)
 *     .call(yAxisRight);
 */
function createCustomYAxis(g, scale, dims, options = {}) {
    const {
        label = '',
        format = null,
        ticks = null,
        tickSize = 6,
        tickPadding = 3,
        position = 'left'
    } = options;
    
    let axis;
    if (position === 'left') {
        axis = d3.axisLeft(scale);
    } else if (position === 'right') {
        axis = d3.axisRight(scale);
    }
    
    if (format) axis.tickFormat(format);
    if (ticks !== null) axis.ticks(ticks);
    axis.tickSize(tickSize);
    axis.tickPadding(tickPadding);
    
    const axisGroup = g.append('g')
        .attr('class', 'y-axis custom');
    
    if (position === 'right') {
        axisGroup.attr('transform', `translate(${dims.innerWidth}, 0)`);
    }
    
    axisGroup.call(axis);
    
    // Agregar etiqueta
    if (label) {
        const labelX = position === 'left' ? -dims.margin.left : dims.innerWidth + dims.margin.right;
        g.append('text')
            .attr('class', 'axis-label y-label')
            .attr('transform', 'rotate(-90)')
            .attr('y', position === 'left' ? 0 - dims.margin.left : dims.innerWidth + dims.margin.right)
            .attr('x', 0 - (dims.innerHeight / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('font-weight', 'bold')
            .text(label);
    }
    
    return axisGroup;
}

// ============================================================================
// SECCIÓN 3: CUADRÍCULA (GRID)
// ============================================================================

/**
 * Crea una cuadrícula de fondo para facilitar la lectura de valores
 * 
 * La cuadrícula son líneas de referencia que ayudan a leer valores
 * aproximados en el gráfico. Se dibujan en las posiciones de los ticks
 * pero sin etiquetas.
 * 
 * @param {object} g - Selección D3 del grupo SVG
 * @param {object} xScale - Escala D3 para el eje X
 * @param {object} yScale - Escala D3 para el eje Y
 * @param {object} dims - Objeto de dimensiones
 * @param {object} options - Opciones de personalización
 *   - xLines: Si es true, dibuja líneas verticales (default: true)
 *   - yLines: Si es true, dibuja líneas horizontales (default: true)
 *   - stroke: Color de las líneas (default: '#e0e0e0' - gris claro)
 *   - strokeWidth: Grosor de las líneas (default: 1)
 *   - strokeDasharray: Patrón de línea punteada (default: '3,3')
 * 
 * CÓMO FUNCIONA:
 * 1. Usa los mismos ticks que los ejes
 * 2. tickSize negativo hace que las líneas se extiendan a través del gráfico
 * 3. tickFormat('') elimina las etiquetas (solo queremos las líneas)
 * 
 * EJEMPLO DE USO:
 * createGrid(g, xScale, yScale, dims);
 * // Crea cuadrícula con valores por defecto
 * 
 * createGrid(g, xScale, yScale, dims, {
 *     xLines: false,  // Solo líneas horizontales
 *     stroke: '#cccccc',
 *     strokeDasharray: '5,5'  // Líneas más espaciadas
 * });
 */
function createGrid(g, xScale, yScale, dims, options = {}) {
    // Extraer opciones con valores por defecto
    const {
        xLines = true,              // Dibujar líneas verticales
        yLines = true,              // Dibujar líneas horizontales
        stroke = '#e0e0e0',        // Color gris claro
        strokeWidth = 1,            // Grosor de línea
        strokeDasharray = '3,3'     // Patrón punteado (3px línea, 3px espacio)
    } = options;
    
    // ========================================================================
    // LÍNEAS VERTICALES (Grid X)
    // ========================================================================
    // Estas líneas van de arriba a abajo, alineadas con los ticks del eje X
    if (xLines) {
        g.append('g')
            .attr('class', 'grid x-grid')
            .attr('transform', `translate(0,${dims.innerHeight})`)  // Posicionar en la parte inferior
            .call(d3.axisBottom(xScale)
                .tickSize(-dims.innerHeight)  // Tamaño negativo = línea hacia arriba
                .tickFormat('')               // Sin etiquetas, solo líneas
            )
            .selectAll('line')
            .style('stroke', stroke)
            .style('stroke-width', strokeWidth)
            .style('stroke-dasharray', strokeDasharray)
            .style('opacity', 0.5);  // Semi-transparente para no distraer
    }
    
    // ========================================================================
    // LÍNEAS HORIZONTALES (Grid Y)
    // ========================================================================
    // Estas líneas van de izquierda a derecha, alineadas con los ticks del eje Y
    if (yLines) {
        g.append('g')
            .attr('class', 'grid y-grid')
            .call(d3.axisLeft(yScale)
                .tickSize(-dims.innerWidth)  // Tamaño negativo = línea hacia la derecha
                .tickFormat('')               // Sin etiquetas, solo líneas
            )
            .selectAll('line')
            .style('stroke', stroke)
            .style('stroke-width', strokeWidth)
            .style('stroke-dasharray', strokeDasharray)
            .style('opacity', 0.5);  // Semi-transparente
    }
}

// ============================================================================
// SECCIÓN 4: ACTUALIZACIÓN DINÁMICA DE EJES
// ============================================================================

/**
 * Actualiza un eje existente con una nueva escala (útil para animaciones)
 * 
 * Esta función es útil cuando los datos cambian y necesitas actualizar
 * el eje con una transición suave.
 * 
 * @param {object} axisGroup - Selección D3 del grupo del eje a actualizar
 * @param {object} scale - Nueva escala D3
 * @param {object} options - Opciones de formato
 *   - format: Función de formato
 *   - ticks: Número de ticks
 * 
 * EJEMPLO DE USO:
 * // Cuando los datos cambian
 * const newScale = d3.scaleLinear().domain([0, newMax]).range([0, width]);
 * updateAxis(xAxisGroup, newScale, { format: d3.format('.0f') });
 */
function updateAxis(axisGroup, scale, options = {}) {
    const {
        format = null,
        ticks = null
    } = options;
    
    // Crear nuevo generador de ejes
    let axis = d3.axisBottom(scale);
    if (format) axis.tickFormat(format);
    if (ticks !== null) axis.ticks(ticks);
    
    // Aplicar transición suave
    axisGroup.transition()
        .duration(D3Config.animation.duration)
        .call(axis);
}

// ============================================================================
// EXPORTAR FUNCIONES GLOBALMENTE
// ============================================================================
// Hace todas las funciones disponibles globalmente para uso en las páginas HTML
window.createCustomXAxis = createCustomXAxis;
window.createCustomYAxis = createCustomYAxis;
window.createGrid = createGrid;
window.updateAxis = updateAxis;

