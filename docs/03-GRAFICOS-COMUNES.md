# 3. Gráficos Comunes

Los gráficos comunes son los tipos de visualización más utilizados en análisis de datos. Este documento explica cómo implementarlos con D3.js.

## Gráfico de Línea

### Propósito
Mostrar tendencias temporales o relaciones entre variables continuas.

### Implementación

```javascript
// 1. Crear escalas
const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => new Date(d.fecha)))
    .range([0, width]);

const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.valor))
    .range([height, 0]);

// 2. Crear generador de línea
const line = d3.line()
    .x(d => xScale(new Date(d.fecha)))
    .y(d => yScale(d.valor))
    .curve(d3.curveMonotoneX);  // Suavizado

// 3. Dibujar la línea
svg.append('path')
    .datum(data)
    .attr('d', line)
    .style('fill', 'none')
    .style('stroke', '#4a90e2')
    .style('stroke-width', 2);
```

### Conceptos Clave
- **`d3.scaleTime()`**: Para datos temporales
- **`d3.line()`**: Generador de líneas SVG
- **`.curve()`**: Controla la suavidad de la línea

## Gráfico de Barras

### Propósito
Comparar valores categóricos.

### Implementación

```javascript
// 1. Escalas
const xScale = d3.scaleBand()
    .domain(data.map(d => d.categoria))
    .range([0, width])
    .padding(0.2);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.valor)])
    .range([height, 0]);

// 2. Dibujar barras
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.categoria))
    .attr('y', d => yScale(d.valor))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.valor))
    .style('fill', '#4a90e2');
```

### Variantes
- **Barras horizontales**: Intercambiar `x` y `y`
- **Barras apiladas**: Usar `d3.stack()`
- **Barras agrupadas**: Múltiples escalas de bandas

## Gráfico de Área

### Propósito
Mostrar acumulación o volumen bajo una curva.

### Implementación

```javascript
// Generador de área
const area = d3.area()
    .x(d => xScale(d.fecha))
    .y0(height)              // Línea base
    .y1(d => yScale(d.valor)) // Línea superior
    .curve(d3.curveMonotoneX);

svg.append('path')
    .datum(data)
    .attr('d', area)
    .style('fill', '#4a90e2')
    .style('fill-opacity', 0.5)
    .style('stroke', '#357abd');
```

### Conceptos Clave
- **`.y0()`**: Define la línea base (puede ser variable)
- **Área apilada**: Múltiples áreas superpuestas

## Gráfico de Dispersión

### Propósito
Mostrar relación entre dos variables numéricas.

### Implementación

```javascript
// Escalas
const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.x))
    .range([0, width]);

const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.y))
    .range([height, 0]);

// Dibujar puntos
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', 5)
    .style('fill', '#4a90e2')
    .style('opacity', 0.6);
```

### Mejoras
- **Tamaño por valor**: `attr('r', d => sizeScale(d.tamano))`
- **Color por categoría**: `style('fill', d => colorScale(d.categoria))`
- **Línea de tendencia**: Regresión lineal

## Gráfico Circular (Pie/Donut)

### Propósito
Mostrar proporciones de un todo.

### Implementación

```javascript
// 1. Generador de arco
const arc = d3.arc()
    .innerRadius(0)        // 0 = pie, >0 = donut
    .outerRadius(radius);

// 2. Generador de pie
const pie = d3.pie()
    .value(d => d.valor)
    .sort(null);

// 3. Dibujar segmentos
const arcs = svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .style('fill', (d, i) => colorScale(i));

// 4. Etiquetas
arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .text(d => d.data.categoria);
```

### Conceptos Clave
- **`d3.pie()`**: Convierte datos en ángulos
- **`d3.arc()`**: Genera el path SVG del arco
- **`.centroid()`**: Centro del arco para etiquetas

## Comparación de Gráficos

| Tipo | Mejor Para | Limitaciones |
|------|-----------|--------------|
| **Línea** | Tendencias temporales | Solo variables continuas |
| **Barra** | Comparar categorías | Muchas categorías = difícil lectura |
| **Área** | Volumen/acumulación | Puede ocultar datos |
| **Dispersión** | Relaciones 2D | No muestra distribución |
| **Circular** | Proporciones | Difícil comparar segmentos similares |

## Mejores Prácticas

1. **Escalas apropiadas**: Usa `scaleTime` para fechas, `scaleBand` para categorías
2. **Padding**: Deja espacio entre elementos para legibilidad
3. **Colores**: Usa paletas accesibles (colorbrewer)
4. **Etiquetas**: Siempre incluye ejes y títulos
5. **Interactividad**: Agrega tooltips para más información

## Ejemplo Completo

Ver `examples/05-common-charts.html` para implementaciones completas con:
- Múltiples series
- Leyendas
- Tooltips
- Animaciones
- Responsive design

## Próximos Pasos

- **[04-HISTOGRAMAS.md](04-HISTOGRAMAS.md)**: Distribuciones de datos
- **[12-HEATMAP.md](12-HEATMAP.md)**: Mapas de calor
- **[14-PERSONALIZACION.md](14-PERSONALIZACION.md)**: Personalizar apariencia

