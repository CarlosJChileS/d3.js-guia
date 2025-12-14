# 1. Introducción a D3.js

## ¿Qué es D3.js?

**D3.js** (Data-Driven Documents) es una biblioteca de JavaScript para crear visualizaciones de datos interactivas en navegadores web. D3 permite:

- **Manipular el DOM** basándose en datos
- **Crear gráficos interactivos** y animados
- **Personalizar completamente** la apariencia
- **Integrar con otras tecnologías** (SVG, Canvas, HTML)

## Conceptos Fundamentales

### 1. Selecciones (Selections)

D3 usa un patrón similar a jQuery para seleccionar elementos del DOM:

```javascript
// Seleccionar un elemento
d3.select('#miGrafico')

// Seleccionar múltiples elementos
d3.selectAll('.barra')
```

### 2. Data-Join Pattern

El patrón fundamental de D3 para vincular datos con elementos DOM:

```javascript
// 1. Seleccionar elementos (pueden no existir aún)
const bars = svg.selectAll('rect')
    .data(datos)  // 2. Vincular datos
    
// 3. Enter: crear elementos nuevos para datos sin elemento
bars.enter()
    .append('rect')
    .attr('x', d => xScale(d.categoria))
    .attr('y', d => yScale(d.valor))
    
// 4. Update: actualizar elementos existentes
bars.attr('width', xScale.bandwidth())

// 5. Exit: eliminar elementos sin datos
bars.exit().remove()
```

### 3. Escalas (Scales)

Las escalas mapean datos (dominio) a valores visuales (rango):

```javascript
// Escala lineal: números a números
const yScale = d3.scaleLinear()
    .domain([0, 100])      // Valores de los datos
    .range([400, 0]);      // Píxeles en el SVG

// Escala de bandas: categorías a posiciones
const xScale = d3.scaleBand()
    .domain(['A', 'B', 'C'])
    .range([0, 600])
    .padding(0.2);
```

### 4. Ejes (Axes)

Los ejes ayudan a interpretar las escalas:

```javascript
const xAxis = d3.axisBottom(xScale)
    .ticks(10)
    .tickFormat(d3.format('.0f'));

svg.append('g')
    .attr('transform', 'translate(0, 400)')
    .call(xAxis);
```

## Estructura del Proyecto

Este proyecto está organizado para facilitar el aprendizaje:

### Archivos Principales

- **`index.html`**: Página principal con navegación a todos los ejemplos
- **`css/styles.css`**: Estilos globales y tema
- **`js/config.js`**: Configuración (colores, dimensiones)
- **`js/utils.js`**: Funciones auxiliares reutilizables
- **`js/axes.js`**: Funciones avanzadas para ejes

### Carpetas

- **`examples/`**: 14 archivos HTML con ejemplos de diferentes tipos de gráficos
- **`data/`**: Datos de ejemplo en formato JSON
- **`docs/`**: Documentación detallada (esta carpeta)

## Flujo de Trabajo Típico

1. **Preparar el contenedor SVG**
   ```javascript
   const { svg, g, dims } = createSVG('#chart', 800, 500);
   ```

2. **Cargar datos**
   ```javascript
   d3.json('data/datos.json').then(data => {
       // Procesar datos
   });
   ```

3. **Crear escalas**
   ```javascript
   const xScale = d3.scaleBand()...
   const yScale = d3.scaleLinear()...
   ```

4. **Crear ejes y grid**
   ```javascript
   createAxes(g, xScale, yScale, dims);
   createGrid(g, xScale, yScale, dims);
   ```

5. **Dibujar elementos**
   ```javascript
   g.selectAll('rect')
       .data(datos)
       .enter()
       .append('rect')
       .attr('x', d => xScale(d.categoria))
       .attr('y', d => yScale(d.valor))
   ```

## Ventajas de D3.js

✅ **Flexibilidad total**: Control sobre cada aspecto visual
✅ **Interactividad**: Fácil agregar tooltips, zoom, pan
✅ **Animaciones**: Transiciones suaves entre estados
✅ **Comunidad**: Gran ecosistema y ejemplos
✅ **Estándares web**: Usa SVG, HTML, CSS nativos

## Desventajas y Consideraciones

⚠️ **Curva de aprendizaje**: Requiere entender conceptos fundamentales
⚠️ **Código verboso**: Más código que bibliotecas de alto nivel
⚠️ **Tiempo de desarrollo**: Puede ser más lento que soluciones pre-hechas

## Próximos Pasos

- **[02-CONCEPTOS-BASICOS.md](02-CONCEPTOS-BASICOS.md)**: Profundizar en escalas, ejes y selecciones
- **[03-GRAFICOS-COMUNES.md](03-GRAFICOS-COMUNES.md)**: Ver ejemplos prácticos de gráficos comunes
- **[19-GUIA-RAPIDA.md](19-GUIA-RAPIDA.md)**: Inicio rápido con el proyecto

