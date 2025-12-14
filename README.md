# Proyecto Completo de D3.js

Proyecto educativo completo sobre visualización de datos con D3.js, que incluye desde conceptos básicos hasta gráficos avanzados e interactivos.

## 📋 Contenido

Este proyecto contiene 14 ejemplos completos organizados en páginas HTML independientes:

### 1. Introducción a D3.js (`01-introduction.html`)
- Conceptos fundamentales: selecciones, datos, escalas y ejes
- Primer gráfico interactivo paso a paso
- Ejemplos básicos de SVG y manipulación del DOM

### 2. Personalización Avanzada (`02-advanced-customization.html`)
- Control detallado de ejes (rotación, formato, ticks personalizados)
- Etiquetas dinámicas y posicionamiento inteligente
- Paletas de colores (categóricas, secuenciales, divergentes)
- Temas y estilos personalizados

### 3. Gráficos 3D (`03-3d-charts.html`)
- **13 tipos de gráficos 3D**:
  1. Barras 3D con rotación interactiva
  2. Superficie 3D con datos matemáticos
  3. Líneas 3D (múltiples series)
  4. Dispersión 3D (puntos en espacio 3D)
  5. Barras apiladas 3D
  6. Superficie desde datos reales
  7. **Mapa de calor 3D** (nuevo)
  8. **Histograma 3D** (nuevo)
  9. **Boxplot 3D** (nuevo)
  10. **Pareto 3D** (nuevo)
  11. **Cascada 3D** (nuevo)
  12. **KDE 3D** - Superficie de densidad (nuevo)
  13. **Radar 3D** (nuevo)
- Integración de D3.js con Three.js
- Rotación automática y controles interactivos
- Código comentado paso a paso

### 4. Gráficos Interactivos (`04-interactive-charts.html`)
- Tooltips dinámicos con información contextual
- Zoom y pan para navegación
- Brush para selección de rangos
- Animaciones y transiciones suaves
- Eventos de mouse y touch

### 5. Gráficos Comunes (`05-common-charts.html`)
- Gráfico de línea (tendencias temporales)
- Gráfico de barras (vertical y horizontal)
- Gráfico de área (acumulación)
- Gráfico de dispersión (relación entre variables)
- Gráfico circular (pie y donut)

### 6. Mapas de Calor (`06-heatmap.html`)
- Heatmap básico con escala de colores
- Heatmap de correlación (matriz)
- Heatmap temporal (evolución en el tiempo)
- Leyendas de colores interactivas

### 7. Histogramas (`07-histogram.html`)
- Histograma básico con `d3.histogram()`
- Histograma normalizado (probabilidades)
- Histograma acumulativo
- Comparación de múltiples distribuciones

### 8. Diagramas de Caja y Bigotes (`08-boxplot.html`)
- Boxplot vertical y horizontal
- Boxplot agrupado para comparación
- Visualización de outliers
- Estadísticas descriptivas (cuartiles, mediana)

### 9. Gráficos de Pareto (`09-pareto.html`)
- Gráfico de barras ordenadas + línea acumulativa
- Regla 80/20 visualizada
- Identificación de elementos críticos
- Tooltips interactivos

### 10. Gráficos de Radar (`10-radar.html`)
- Gráfico de radar/polígono básico
- Múltiples series comparadas
- Ejes radiales personalizados
- Área sombreada y puntos de datos

### 11. Gráficos de Cascada (`11-waterfall.html`)
- Gráfico de cascada básico
- Valores positivos y negativos diferenciados
- Etiquetas de cambio y totales acumulativos
- Colores diferenciados por tipo

### 12. Gráficos de Enjambre (`12-swarm.html`)
- Swarm plot con `d3.forceSimulation`
- Agrupación por categorías
- Evasión de colisiones automática
- Interactividad con tooltips

### 13. Gráficos de Densidad KDE (`13-kde.html`)
- Kernel Density Estimation (KDE)
- Curva de densidad suave
- Comparación de distribuciones
- Área sombreada bajo la curva
- Estadísticas descriptivas

### 14. Gráfico de Sankey (`14-sankey.html`)
- Diagrama de flujo Sankey
- Nodos y enlaces interactivos
- Layout automático
- Etiquetas y valores en enlaces
- Tooltips informativos

## 🚀 Inicio Rápido

1. **Abrir el proyecto**: Abre `index.html` en tu navegador
2. **Navegar**: Usa el menú de navegación para acceder a cada ejemplo
3. **Explorar**: Cada página contiene código comentado y explicaciones

## 📁 Estructura del Proyecto

```
D32/
├── index.html                 # Página principal con navegación
├── css/
│   └── styles.css            # Estilos globales y responsive
├── js/
│   ├── config.js             # Configuración global (colores, dimensiones)
│   ├── axes.js               # Control avanzado de ejes
│   └── utils.js              # Funciones auxiliares
├── examples/
│   ├── 01-introduction.html
│   ├── 02-advanced-customization.html
│   ├── 03-3d-charts.html
│   ├── 04-interactive-charts.html
│   ├── 05-common-charts.html
│   ├── 06-heatmap.html
│   ├── 07-histogram.html
│   ├── 08-boxplot.html
│   ├── 09-pareto.html
│   ├── 10-radar.html
│   ├── 11-waterfall.html
│   ├── 12-swarm.html
│   ├── 13-kde.html
│   └── 14-sankey.html
├── data/
│   └── sample-data.json      # Datos de ejemplo para todos los gráficos
├── docs/                      # Documentación completa del proyecto
│   ├── 00-INDICE.md          # Índice de toda la documentación
│   ├── 01-INTRODUCCION.md    # Introducción a D3.js
│   ├── 03-GRAFICOS-COMUNES.md # Gráficos comunes explicados
│   ├── 13-GRAFICOS-3D.md     # Guía de gráficos 3D
│   ├── 19-GUIA-RAPIDA.md     # Inicio rápido
│   └── ...                    # Más documentación
└── README.md                  # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **D3.js v7**: Biblioteca principal para visualización de datos (via CDN)
- **Three.js**: Para gráficos 3D (via CDN)
- **HTML5 + CSS3 + JavaScript ES6+**: Tecnologías web estándar
- **SVG**: Formato de gráficos vectoriales

## 📚 Conceptos Clave de D3.js

### Selecciones
```javascript
d3.select('#elemento')  // Selecciona un elemento
d3.selectAll('.clase')  // Selecciona múltiples elementos
```

### Data Binding
```javascript
selection.data(datos)
  .enter()
  .append('elemento')
```

### Escalas
```javascript
const scale = d3.scaleLinear()
  .domain([0, 100])    // Dominio: valores de datos
  .range([0, 500]);    // Rango: píxeles en pantalla
```

### Ejes
```javascript
const axis = d3.axisBottom(scale);
svg.append('g').call(axis);
```

## 🎨 Características

- ✅ **Código comentado**: Cada ejemplo incluye explicaciones detalladas
- ✅ **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- ✅ **Interactividad**: Tooltips, zoom, pan, brush y animaciones
- ✅ **Datos de ejemplo**: Datasets realistas para todos los gráficos
- ✅ **Navegación fluida**: Enlaces entre ejemplos y página principal
- ✅ **Estilos modernos**: CSS con tema claro/oscuro

## 📖 Guía de Uso

### Para Aprendices
1. Comienza con `01-introduction.html` para entender los conceptos básicos
2. Avanza secuencialmente por cada ejemplo
3. Lee los comentarios en el código
4. Experimenta modificando los valores y estilos

### Para Desarrolladores
1. Revisa `js/config.js` para configuración global
2. Usa `js/utils.js` para funciones auxiliares reutilizables
3. Consulta `js/axes.js` para personalización avanzada de ejes
4. Adapta los ejemplos a tus necesidades

## 🔧 Personalización

### Cambiar Colores
Edita `js/config.js` para modificar las paletas de colores:
```javascript
colors: {
    categorical: ['#color1', '#color2', ...],
    sequential: d3.interpolateBlues,
    ...
}
```

### Modificar Dimensiones
Ajusta las dimensiones por defecto en `js/config.js`:
```javascript
defaultWidth: 800,
defaultHeight: 500,
margin: { top: 20, right: 20, bottom: 40, left: 40 }
```

## 📝 Notas

- Todos los ejemplos usan D3.js v7 desde CDN
- Los gráficos 3D requieren Three.js (incluido via CDN)
- Los datos de ejemplo están en `data/sample-data.json`
- Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)

## 📚 Documentación Completa

El proyecto incluye documentación detallada en la carpeta `docs/`:

- **[00-INDICE.md](docs/00-INDICE.md)**: Índice completo de toda la documentación
- **[01-INTRODUCCION.md](docs/01-INTRODUCCION.md)**: Conceptos fundamentales de D3.js
- **[03-GRAFICOS-COMUNES.md](docs/03-GRAFICOS-COMUNES.md)**: Explicación de gráficos comunes
- **[13-GRAFICOS-3D.md](docs/13-GRAFICOS-3D.md)**: Guía completa de gráficos 3D
- **[19-GUIA-RAPIDA.md](docs/19-GUIA-RAPIDA.md)**: Inicio rápido paso a paso

La documentación está organizada por temas para facilitar el aprendizaje y la explicación del proyecto.

## 🎯 Próximos Pasos

- **Lee la documentación**: Empieza con `docs/00-INDICE.md`
- **Explora los ejemplos**: Navega por los 14 ejemplos interactivos
- **Experimenta**: Modifica los gráficos con tus propios datos
- **Aprende**: Consulta la documentación oficial de D3.js: https://d3js.org

## 📄 Licencia

Este proyecto es educativo y está disponible para uso libre.

## 👨‍💻 Autor

Proyecto educativo sobre D3.js - Visualización de Datos Avanzada

---

**¡Disfruta explorando el mundo de la visualización de datos con D3.js!** 📊✨

